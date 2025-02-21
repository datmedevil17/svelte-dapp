import { writable } from 'svelte/store';
import { ethers } from 'ethers';
import contractABI from '$lib/contracts/MyContractABI.json'; // Import ABI JSON

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x5AFe8cEfD2D3Ff1367eA1E7c328C46FbC3E5e4B8";

// Wallet store with provider, signer, contract, and address
export const wallet = writable({
    provider: null,
    signer: null,
    contract: null,
    address: null,
    isConnected: false,
});

// Function to connect wallet
export async function connectWallet() {
    if (!window.ethereum) {
        alert('MetaMask is not installed!');
        return;
    }

    try {
        // console.log("Requesting wallet connection...");
        const {ethereum} = window
        // console.log(ethereum)

        const account = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account)

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log("Wallet connected:", address);


        // Initialize contract
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

        // Update store
        wallet.set({
            provider,
            signer,
            contract,
            address,
            isConnected: true
        });
        console.log("Wallet Connected:", address)

        return address;
    } catch (error) {
        console.error("❌ Wallet connection failed:", error);
        alert("Failed to connect wallet. Check console for details.");
    }
}
