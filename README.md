# ZK-Bank Privacy Loan (Binance)

## Description
**ZK-Bank Privacy Loan (Binance)** is a decentralized application designed to enable privacy-preserving credit verification and loan applications using **zkPass**. By leveraging zero-knowledge proofs, users can prove their creditworthiness without revealing sensitive financial details. 

The app integrates with the **Binance predefined schemas**, specifically the **Earn Balance** and **Balance in the Last 24 Hours**, to verify users' financial standing. These schemas are combined to generate a composite creditworthiness score, which is then used to approve or reject loan applications.

With **zkPass** and these **Binance schemas**, users can maintain their financial privacy while accessing decentralized loan services.



 
## Table of Contents
1. [Creating a Custom Schema on zkPass](#1-creating-a-custom-schema-on-zkpass)
2. [Frontend Setup](#2-frontend-setup)
3. [Backend Setup](#3-backend-setup)
4. [Smart Contract Setup](#4-smart-contract-setup)

---

## 1. Creating a Custom Schema on zkPass

### Steps to Create a Custom Schema:

1. **Visit zkPass Developer Portal:**
   - Go to the [zkPass Developer Portal](https://dev.zkpass.org/).
   - Sign up or log in if you haven’t already.

2. **Create a New App:**
   - Click on **Create New App** and make sure to copy the **appId**, as you will need it for the frontend integration.

3. **Add a Custom Schema:**
   - After creating the app, click on **Add Schema** and select **Custom Schema**.

4. **Set the Schema Details:**
   - Set the schema's **name** to `Binance Financial Data`.
   - Set the **category** to `Finance`.

5. **Define the Schema JSON:**
   - Use the following JSON for the schema definition:
   
   ```json
   {
     "issuer": "Binance",
     "desc": "This schema verifies a user's eligibility for a crypto-backed loan on the ZK-Crypto Wealth & Loan Platform by combining three key factors from their Binance account: Binance Earn Balance, and 24-Hour Active Balance.",
     "website": "https://www.binance.com/my/dashboard",
     "breakWall": true,
     "APIs": [
       {
         "host": "www.binance.com",
         "intercept": {
           "url": "bapi/accounts/v1/private/account/user/base-detail",
           "method": "POST"
         },
         "nullifier": "data|userId"
       },
       {
         "host": "www.binance.com",
         "intercept": {
           "url": "bapi/asset/v2/private/asset-service/wallet/balance",
           "method": "GET"
         },
         "override": {
           "query": [
             {
               "quoteAsset": "USDT",
               "verify": true
             },
             {
               "needBalanceDetail": "false"
             }
           ]
         },
         "assert": [
           {
             "key": "data|?=0|accountType",
             "value": "SAVING",
             "operation": "="
           },
           {
             "key": "data|?=0|balance",
             "value": "1.00000000",
             "operation": ">"
           }
         ]
       },
       {
         "host": "www.binance.com",
         "intercept": {
           "url": "bapi/apex/v2/private/apex/marketing/wallet/userHistoryAssets",
           "method": "POST"
         },
         "override": {
           "body": [
             {
               "recentDays": "1",
               "verify": true
             }
           ]
         },
         "assert": [
           {
             "key": "data|6|total",
             "value": "1.00000000",
             "operation": ">"
           }
         ]
       }
     ],
     "HRCondition": [
       "Verifies the user's eligibility for a crypto-backed loan based on two key factors from their Binance account: Earn Balance and Active Balance in the last 24 hours. All verifications are performed using zkProofs to ensure privacy."
     ],
     "tips": {
       "message": "When you successfully log in, please click the 'Start' button to initiate the verification process."
     }
   }
   ```
5. **Submit Schema JSON:**
   - Submit the schema for validation.
   - Once approved, zkPass will provide you with a schemaId which is required for integration 
     with your app. Make sure to copy the schemaId.
 
## 2. Frontend Setup

Prerequisites:
Ensure you are using Chromium or Chrome as the zkPass Schema Validator and Transgate extensions are required.
Install the necessary extensions from the Chrome Web Store:
zkPass Schema Validator
zkPass Transgate
Steps to Set Up the Frontend:
Clone the Repository:

Navigate to the root directory of the project:
bash
Copy code
cd /path/to/your/project
Install Dependencies:

Run the following command to install required dependencies:
bash
Copy code
npm install
Configure constants.js:

Navigate to src/ and open constants.js. Ensure the following fields are populated:
javascript
Copy code
export const BASE_URL = "https://your-backend-url.com";
export const CONTRACT_ADDRESS = "0xf8B2Ec2c9bA0E473E3aE4682561229e0bCf274F5";
export const APP_ID = "b7627e76-b9f2-41b0-b954-2bc5f63ecec3";
export const SCHEMA_ID = "7b7b31ecbc654213ba7fc189b01d21f3";
Replace BASE_URL with the URL of your backend server.
Start the Frontend Server:

Run the following command to start the frontend server:
bash
Copy code
npm run dev
The frontend should now be accessible at http://localhost:3000.

3. Backend Setup
Steps to Set Up the Backend:
Navigate to the Backend Directory:

From the root folder, navigate to the backend directory:
bash
Copy code
cd backend
Create .env File:

Create a .env file and populate it with the following information:
plaintext
Copy code
PORT=your_port_number
JWT_SECRET=your_jwt_secret
Install Dependencies:

Run the following command to install the necessary backend dependencies:
bash
Copy code
npm install
Start the Backend Server:

Start the backend server:
bash
Copy code
npm start
Update constants.js:

Copy the URL of the running backend server and replace BASE_URL in src/constants.js with the copied URL.
4. Smart Contract Setup
Steps to Test and Deploy the Smart Contract:
Install Foundry:

In the root folder, run the following command to install Foundry:
bash
Copy code
curl -L https://foundry.paradigm.xyz | bash
Create .env File for Smart Contract:

In the secret directory, create a .env file and add the following contents:
plaintext
Copy code
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_SEPOLIA_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY
Test the Smart Contract:

Run the following command to test the smart contract:
bash
Copy code
forge test -vvv --summary
Deploy the Smart Contract:

To deploy the contract to Sepolia, run:
bash
Copy code
source .env
forge script --chain sepolia script/Deployer.s.sol:Deployer --rpc-url ${SEPOLIA_RPC_URL} --broadcast -vvvv
Replace YOUR_INFURA_SEPOLIA_API_KEY and YOUR_PRIVATE_KEY with your actual values.


   