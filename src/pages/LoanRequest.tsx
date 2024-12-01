import React, { useState } from "react";
import axios from "axios";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import { ethers } from "ethers";
import { useWriteGetSecretAssignSecret } from "../generated";
import { BASE_URL } from "../constants";

const contractAddress = "0xf8B2Ec2c9bA0E473E3aE4682561229e0bCf274F5";
const appId= "b7627e76-b9f2-41b0-b954-2bc5f63ecec3"
const schemaId = "7b7b31ecbc654213ba7fc189b01d21f3"

const LoanRequest = () => {
  
  const [loanAmount, setLoanAmount] = useState<number>(1000);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [result, setResult] = useState<any | undefined>(undefined);
  const [loanStatus, setLoanStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const { writeContractAsync } = useWriteGetSecretAssignSecret();

  const calculateMonthlyPayment = (amount: number, term: number) => {
    const interestRate = 0.05;
    const monthlyRate = interestRate / 12;
    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return monthlyPayment;
  };

  const requestVerifyMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const connector = new TransgateConnect(appId);
      const isAvailable = await connector.isTransgateAvailable();

      if (isAvailable) {
        const provider = window.ethereum ? new ethers.BrowserProvider(window.ethereum) : null;
        const signer = await provider?.getSigner();
        const recipient = await signer?.getAddress();

        const res = (await connector.launch(schemaId, recipient)) as any;

        const validatedResult = connector.verifyProofMessageSignature("evm", schemaId, res);
        if (validatedResult) {
          alert("Verified Successfully");
          setResult(res);

          // Send loan details to the smart contract before backend creation
          const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm);

          const taskId = ethers.hexlify(ethers.toUtf8Bytes(res.taskId)) as `0x${string}`;
          const schemaIdHex = ethers.hexlify(ethers.toUtf8Bytes(schemaId)) as `0x${string}`;

          if (recipient) {
            const chainParams = {
              taskId,
              schemaId: schemaIdHex,
              uHash: res.uHash as `0x${string}`,
              recipient: recipient as `0x${string}`,
              publicFieldsHash: res.publicFieldsHash as `0x${string}`,
              validator: res.validatorAddress as `0x${string}`,
              allocatorSignature: res.allocatorSignature as `0x${string}`,
              validatorSignature: res.validatorSignature as `0x${string}`,
             
            };

            // Send data to smart contract
            await writeContractAsync({
              address: contractAddress,
              args: [chainParams],
            });

            // Now call the backend to create the loan
            const loanData = {
              loanAmount,
              loanTerm,
            };

            const response = await axios.post(`${BASE_URL}loan/request`, loanData, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // if you use JWT
              },
            });

            if (response.status === 201) {
              setLoanStatus("Loan successfully created!");
            } else {
              setLoanStatus("Error creating loan on the backend.");
            }
          }
        } else {
          setLoanStatus("Verification failed.");
        }
      } else {
        console.log("Please install zkPass Transgate from https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma");
      }
    } catch (error) {
      console.error("Error verifying loan:", error);
      setLoanStatus("An error occurred during verification.");
    } finally {
      setLoading(false); // Set loading state to false once done
    }
  };

  return (
    <div>
    <form className="form" onSubmit={requestVerifyMessage}>
      <label htmlFor="loan-amount">
        Loan Amount (USDT):
        <input
          id="loan-amount"
          type="number"
          value={loanAmount}
          onChange={(e) => 
            setLoanAmount(Number(e.target.value))
          }
        />
      </label>
      <label htmlFor="loan-term">
        Loan Term (Months):
        <input
          id="loan-term"
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(Number(e.target.value))}
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Start Loan Verification"}
      </button>

      {loanStatus && <h3>{loanStatus}</h3>}

      <div>
        <h3>Repayment Details:</h3>
        <p><strong>Loan Amount:</strong> {loanAmount} USDT</p>
        <p><strong>Loan Term:</strong> {loanTerm} months</p>
        <p>
          <strong>Monthly Payment:</strong>
          {calculateMonthlyPayment(loanAmount, loanTerm).toFixed(2)} USDT
        </p>
      </div>

      {result && (
        <>
          <h1>Loan Approved: {loanAmount} USDT</h1>
          <h2>Term: {loanTerm} Months</h2>
          <h3>Monthly Payment: {calculateMonthlyPayment(loanAmount, loanTerm).toFixed(2)} USDT</h3>
        </>
      )}
    </form>
  </div>
  )
};

export default LoanRequest;
