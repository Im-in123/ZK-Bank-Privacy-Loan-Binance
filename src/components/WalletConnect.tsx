// src/components/WalletConnect.tsx
import { useState } from "react";
import { ethers } from "ethers";

interface WalletConnectProps {
  setSigner: React.Dispatch<React.SetStateAction<ethers.JsonRpcSigner | null>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ setSigner, setAddress }) => {
  const [connected, setConnected] = useState<boolean>(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
      setConnected(true);
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div>
      {!connected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Wallet Connected: {connected}</p>
      )}
    </div>
  );
};

export default WalletConnect;
