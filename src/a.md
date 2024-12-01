  {
  "issuer": "Creditworthiness",
  "desc": "A creditworthiness evaluation application",
  "website": "https://ideal-tribble-vw56rpqj6ggfvwx-5173.app.github.dev",
  "APIs": [
    {
      "host": "sepolia.infura.io",
      "intercept": {
        "url": "/v3/dd762a54186542ef9d8da2eb366fa4ae",
        "method": "POST",
        "params": {
          "jsonrpc": "2.0",
          "method": "eth_getBalance",
          "params": ["{address}", "latest"],
          "id": 1
        }
      },
      "nullifier": "address",
      "params": {
        "address": "{address}"
      },
      "result": {
        "balance": "{result}"
      }
    },
    {
      "host": "sepolia.infura.io",
      "intercept": {
        "url": "/v3/dd762a54186542ef9d8da2eb366fa4ae",
        "method": "POST",
        "params": {
          "jsonrpc": "2.0",
          "method": "eth_getTransactionCount",
          "params": ["{address}", "latest"],
          "id": 1
        }
      },
      "assert": [
        {
          "key": "balance",
          "value": ">= 0.22",
          "operation": ">=",
          "verify": true
        },
        {
          "key": "transactionCount",
          "value": "> 10",
          "operation": ">",
          "verify": true
        }
      ],
      "params": {
        "address": "{address}"
      },
      "result": {
        "transactionCount": "{result}"
      }
    }
  ],
  "HRCondition": [
    "Creditworthy"
  ],
  "tips": {
    "message": "Please connect your wallet to evaluate your creditworthiness."
  }
};

