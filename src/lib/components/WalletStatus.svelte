<script>
    import { wallet } from '$lib/stores/wallet.js';

    let account, contract;

    wallet.subscribe(data => {
        account = data.address;
        contract = data.contract;
    });

    async function getContractData() {
        if (contract) {
            try {
                console.log("Calling contract method...");
                const result = await contract.myMethod(); // ✅ Replace with actual method name
                console.log("Contract Data:", result);
            } catch (error) {
                console.error("❌ Error calling contract:", error);
                alert("Failed to fetch contract data. Check console.");
            }
        } else {
            console.error("❌ Contract not initialized.");
            alert("Contract not loaded. Connect wallet first.");
        }
    }
</script>

<div>
    {#if account}
        <p>Connected Wallet: {account}</p>
        <button on:click={getContractData}>Fetch Contract Data</button>
    {:else}
        <p>No wallet connected.</p>
    {/if}
</div>
