# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```



curl -L https://foundry.paradigm.xyz | bash


Now head to the root directory of your project. Head to the secret directory. Then create a .env file. Open the file and add the following contents.

SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_SEPOLIA_API_KEY
PRIVATE_KEY=YOUR_PRIVATE_KEY

source .env
forge script --chain sepolia script/Deployer.s.sol:DeployZKBank --rpc-url ${SEPOLIA_RPC_URL} --broadcast -vvvv
forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY
forge script --chain sepolia script/DeployCreditworthinessVerifier.s.sol --rpc-url ${SEPOLIA_RPC_URL} --broadcast --private-key ${PRIVATE_KEY} -vvvv

forge script script/DeployCreditworthinessAttestor.s.sol --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast


python3 -m http.server 5173
npx @wagmi/cli generate

frontend

npm run dev 

enable corepack for backend
corepack enable







zkbank/
├── script/
│   └── Deploy.s.sol      # Deploy script for the smart contract
├── src/
│   └── ZKBank.sol        # The smart contract code
├── test/
│   └── ZKBank.t.sol      # Test file for the smart contract
├── foundry.toml          # Foundry configuration file
├── .env                  # Environment variables (private key and RPC URL)
└── README.md             # Project description (optional)


0xD32D3eb93488d33D9C5c640CA4571A7b2D945769