// src/components/VerificationForm.tsx
import { useState } from "react";
import { ethers } from "ethers";
import Attestation from "../contracts/Attestation.json";
import GetSecret from "../contracts/GetSecret.json";

interface VerificationFormProps {
  signer: ethers.JsonRpcSigner | null;
  address: string;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ signer, address }) => {
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [secret, setSecret] = useState<string>("");

  const attest = async () => {
    if (!signer) {
      setVerificationStatus("Please connect your wallet.");
      return;
    }

    const attestationContract = new ethers.Contract(
      process.env.REACT_APP_ATTESTATION_CONTRACT_ADDRESS as string,
      Attestation.abi,
      signer
    );

    try {
      const tx = await attestationContract.attest(address);
      await tx.wait();
      setVerificationStatus("Address successfully verified!");
    } catch (error: any) {
      setVerificationStatus("Verification failed: " + error.message);
    }
  };

  const getSecret = async () => {
    if (!signer) {
      setSecret("Please connect your wallet.");
      return;
    }

    const secretContract = new ethers.Contract(
      process.env.REACT_APP_GETSECRET_CONTRACT_ADDRESS as string,
      GetSecret.abi,
      signer
    );

    try {
      const fetchedSecret = await secretContract.getSecret(address);
      setSecret(fetchedSecret);
    } catch (error: any) {
      setSecret("Failed to fetch secret: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={attest}>Start Verification</button>
      <p>{verificationStatus}</p>
      <button onClick={getSecret}>Get Secret</button>
      <p>{secret && "Secret: " + secret}</p>
    </div>
  );
};

export default VerificationForm;
