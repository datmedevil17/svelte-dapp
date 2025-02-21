<script>
    import { wallet, connectWallet } from '$lib/stores/wallet.js';

    let account = '';

    // Subscribe to store updates correctly
    $: wallet.subscribe(data => {
      account = data.address;
    });
  </script>

  <nav class="bg-gray-900 text-white p-4 flex justify-between">
    <h1 class="text-xl font-bold">SvelteKit dApp</h1>
    <button class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded" on:click={connectWallet}>
      {account ? `Connected: ${account.substring(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
    </button>
  </nav>
