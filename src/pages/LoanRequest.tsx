import React, { useState } from "react";
import axios from "axios";
import TransgateConnect from "@zkpass/transgate-js-sdk";
import { ethers } from "ethers";
import { useWriteGetSecretAssignSecret } from "../generated";
import { BASE_URL } from "../constants";
import '../styles/LoanRequest.css';
import { toast } from "react-toastify";

const contractAddress = "0xf8B2Ec2c9bA0E473E3aE4682561229e0bCf274F5";
const appId = "b7627e76-b9f2-41b0-b954-2bc5f63ecec3";
const schemaId = "7b7b31ecbc654213ba7fc189b01d21f3";

const LoanRequest = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000);
  const [loanTerm, setLoanTerm] = useState<number>(12);
  const [result, setResult] = useState<any | undefined>(undefined);
  const [loanStatus, setLoanStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { writeContractAsync } = useWriteGetSecretAssignSecret();

  const calculateMonthlyPayment = (amount: number, term: number) => {
    const interestRate = 0.05;
    const monthlyRate = interestRate / 12;
    const monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
    return monthlyPayment;
  };

  const requestVerifyMessage = async (e: React.FormEvent) => {
    if(loanAmount < 1){
      toast.error("Loan amount shuld be greater than $1")
    }
    e.preventDefault();
    setLoading(true);

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
          alert("ZKProof Verified Successfully")
          toast.success("ZKProof Verified Successfully");
          setResult(res);

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
           
            await writeContractAsync({
              address: contractAddress,
              args: [chainParams],
            });
            toast.success("Confirming contract verification successfully!")
            toast.success("Please wait to confirm the transaction in your browser wallet popup!")

            const loanData = {
              loanAmount,
              loanTerm,
            };
            try {
              const response = await axios.post(`${BASE_URL}/loans/request`, loanData, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              if (response.status === 201) {
                setLoanStatus("Loan successfully Approved!");
                toast.success("Your loan request has been approved!")
              } else {
                setLoanStatus("Error creating loan on the backend.");
              }
            } catch (error) {
              console.log("error creating loan on backend server::", error);
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
      setLoading(false);
    }
  };

  return (
    <div className="loan-form-container">
      <form className="form" onSubmit={requestVerifyMessage}>
        <h3>LOAN REQUEST CREDIBILITY WITH (BINANCE )</h3>
      

        <label htmlFor="loan-amount">
          Loan Amount (USDT):
          <input
            id="loan-amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
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
          {loading ? "Verifying..." : "Start Credibility Verification"}
        </button>

        {loanStatus && <h3>{loanStatus}</h3>}

        <div className="repayment-details">
          <h3>Repayment Details: </h3>
          <p><strong>Loan Amount: </strong> {loanAmount} USDT</p>
          <p><strong>Loan Term: </strong> {loanTerm} months</p>
          <p><strong>Monthly Payment: </strong> {calculateMonthlyPayment(loanAmount, loanTerm).toFixed(2)} USDT</p>
          <p><strong>Total Repayment: </strong> {(calculateMonthlyPayment(loanAmount, loanTerm) * loanTerm).toFixed(2)} USDT</p>
          <p><strong>Interest Rate: </strong> 5%</p>
        </div>

        {result && (
          <div className="loan-result">
            <h1>Loan Approved: {loanAmount} USDT</h1>
            <h2>Term: {loanTerm} Months</h2>
            <h3>Monthly Payment: {calculateMonthlyPayment(loanAmount, loanTerm).toFixed(2)} USDT</h3>
            <h3>Total Repayment: {(calculateMonthlyPayment(loanAmount, loanTerm) * loanTerm).toFixed(2)} USDT</h3>
            <h3>Interest Rate: 5%</h3>
          </div>
        )}
      </form>
      <div>
        <br></br>
        <h3>Eligibility Criteria</h3>
          <p className="eligibility-title">To be eligible for the loan, the following conditions must be met:</p>
          <div className="eligibility-container">
            <div className="eligibility-condition">
              <div className="condition-icon">💰</div>
              <div className="condition-text">
                <strong>Binance Earn Balance:</strong> Your Binance Earn Balance should be more than 1 USDT.
              </div>
            </div>
            <div className="eligibility-condition">
              <div className="condition-icon">⏳</div>
              <div className="condition-text">
                <strong>Binance Active Balance:</strong> Your Active Binance Balance from the past 24 hours should be more than 1 USDT.
              </div>
            </div>
          </div>

          <p className="eligibility-note">
            Please note that we use <strong>zkProofs</strong> for all verifications, ensuring that none of your private Binance data is exposed. Your financial data will remain confidential, and only the proof of eligibility will be shared for verification.
          </p>
        </div>
    </div>
  );
};

export default LoanRequest;
