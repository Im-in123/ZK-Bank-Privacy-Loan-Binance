const express = require('express');
const session = require('express-session');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware for JSON parsing
app.use(express.json());

// Enable CORS with credentials
app.use(cors({
    origin: 'https://ideal-tribble-vw56rpqj6ggfvwx-3000.app.github.dev', // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies) in requests
   
}));

// Set up session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true, // Prevent client-side access to cookies
        sameSite: 'lax', // Adjust for your use case
    },
}));

// Route to simulate login and set session
app.post('/login', (req, res) => {
    console.log("logging in!")
    const { address } = req.body;

    if (address) {
        req.session.account = address;
        res.cookie('session_id', req.session.id, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        res.status(200).json({ message: 'Session established' });
    } else {
        res.status(400).json({ error: 'No address provided' });
    }
});

// Route to fetch Ethereum data
app.post('/fetch-financial-data', async (req, res) => {
    console.log("Fetching Data!");
    if (!req.session.account) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const address = req.session.account;

    try {
        const provider = new ethers.JsonRpcProvider(process.env.SEPOOLIA_RPC_URL);
        const balanceInWei = await provider.getBalance(address);
        const balanceInEth = ethers.formatEther(balanceInWei);
        const txCount = await provider.getTransactionCount(address);

        res.status(200).json({
            address: address,  // Returning the address for debugging
            balance: balanceInEth,
            transactionCount: txCount,
        });
    } catch (error) {
        console.error('Error fetching financial data:', error);
        res.status(500).json({ error: 'Failed to fetch financial data' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



///////////////////////////////////////////////////////////////








import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BASE_URL } from './constants';

function App() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [txCount, setTxCount] = useState(null);

    useEffect(() => {
        const storedAccount = sessionStorage.getItem('account');
        if (storedAccount) {
            console.log("account1::", storedAccount)
            setAccount(storedAccount);
            // Trigger the login process even if the account is stored
            loginUser(storedAccount);
        }
    }, []);

    // Function to send account to the backend for session setup
    const loginUser = async (account) => {
        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Include cookies
                body: JSON.stringify({ address: account }),
            });
            if (res.ok) {
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    // Request Ethereum account
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userAccount = accounts[0];
                console.log("account2::", userAccount)
                setAccount(userAccount);
                sessionStorage.setItem('account', userAccount); // Store the account in sessionStorage
                loginUser(userAccount); // Send account to backend for session setup
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    // Fetch financial data
    const fetchFinancialData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/fetch-financial-data`, {
                method: 'POST',
                credentials: 'include', // Include cookies automatically
            });
            const data = await response.json();
            if (response.ok) {
                setBalance(data.balance);
                setTxCount(data.transactionCount);
            } else {
                console.error('Error fetching data:', data.error);
            }
        } catch (error) {
            console.error('Fetch failed:', error);
        }
    };

    return (
        <div>
            <h1>Finance Dashboard</h1>
            {account ? (
                <div>
                    <p>Connected Account: {account}</p>
                    <button onClick={fetchFinancialData}>Get Financial Data</button>
                    {balance && <p>Balance: {balance} ETH</p>}
                    {txCount !== null && <p>Transaction Count: {txCount}</p>}
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
}

export default App;











###################################################


{
  "issuer": "Creditworthiness",
  "desc": "A creditworthiness evaluation application",
  "website": "https://ideal-tribble-vw56rpqj6ggfvwx-3000.app.github.dev",
  "APIs": [
    {
      "host": "ideal-tribble-vw56rpqj6ggfvwx-5000.app.github.dev",
      "intercept": {
        "url": "/fetch-financial-data",
        "method": "POST"
      },
      "nullifier": "address"
    }
  ],
  "assert": [
    {
      "key": "balance",
      "value": "0.22",
      "operation": ">",
      "verify": true
    },
    {
      "key": "transactionCount",
      "value": "10",
      "operation": ">",
      "verify": true
    }
  ],
  "HRCondition": [
        "Credit Score check. Wallet  balance > 0.22 and total wallet transactions made > 10"
  ],
  "tips": {
   "message": "Please connect your wallet.When you successfully log in, please click the 'Start' button to initiate the verification process."

  }
}
