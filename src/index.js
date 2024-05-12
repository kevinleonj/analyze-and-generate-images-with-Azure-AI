import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
    const credential = new DefaultAzureCredential();

    const keyVaultName = process.env["KEY_VAULT_NAME"];
    const url = "https://" + keyVaultName + ".vault.azure.net";

    const kvClient = new SecretClient(url, credential);

    // Set these variables to the names you created for your secrets
    const keySecretName = "ComputerVisionChallengeSecret";
    const endpointSecretName = "ComputerVisionChallengeLink";

    console.log("Retrieving secrets from ", keyVaultName);
    const retrievedKey = await (await kvClient.getSecret(keySecretName)).value;
    const retrievedEndpoint = await (await kvClient.getSecret(endpointSecretName)).value;
    console.log("Your secret key value is: ", retrievedKey);
    console.log("Your secret endpoint value is: ", retrievedEndpoint);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});