{
  "category": "Finance",
  "issuer": "ZKCreditScore",
  "desc": "Verifies creditworthiness without revealing full financial details.",
  "website": "https://ideal-tribble-vw56rpqj6ggfvwx-5173.app.github.dev",
  "APIs": [
    {
      "host": "https://ideal-tribble-vw56rpqj6ggfvwx-5000.app.github.dev/",
      "intercept": {
        "url": "user/creditcheck",
        "method": "GET"
      },
      "assert": [
        {
          "key": "data|balance",
          "value": "5000",
          "operation": ">"
        },
        {
          "key": "data|transaction_count",
          "value": "50",
          "operation": ">"
        },
        {
          "key": "data|debt_status",
          "value": "0",
          "operation": "="
        }
      ],
      "nullifier": "data|user_id"
    }
  ],
  "tips": {
    "message": "Upon verification, click 'Start' to initiate the process."
  }
}
