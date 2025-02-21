<script>
    import '../app.css';
    import { onMount } from 'svelte';
    import { ethers } from 'ethers';
    import { wallet, connectWallet } from '$lib/stores/wallet.js';
    import Navbar from '$lib/components/Navbar.svelte';

    let account;

    // Subscribe to store updates
    wallet.subscribe(data => {
      account = data.address;
    });

    let { children } = $props();
  </script>

  <Navbar />

  {@render children()}
