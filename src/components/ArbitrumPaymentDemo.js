import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './ArbitrumPaymentDemo.css';

// Comprehensive ERC20 ABI with additional functions for better interaction
const ERC20_ABI = [
  // Read-only functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  
  // Write functions
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// Arbitrum Sepolia Network parameters
const ARBITRUM_SEPOLIA = {
  chainId: '0x66eee', // 421614 in decimal
  chainName: 'Arbitrum Sepolia',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [
    'https://sepolia-rollup.arbitrum.io/rpc',
    'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
    'https://arb-sepolia.g.alchemy.com/v2/demo'
  ],
  blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
};

function ArbitrumPaymentDemo() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState('');

  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMask = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined' && window.ethereum) {
          try {
            // Check if already connected
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              setIsConnected(true);
              checkNetwork();
              
              // Listen for account changes
              window.ethereum.on('accountsChanged', handleAccountsChanged);
              window.ethereum.on('chainChanged', handleChainChanged);
            }
          } catch (error) {
            console.error("Error checking MetaMask connection:", error);
          }
        } else {
          // Handle non-browser or headless environment
          console.log("MetaMask not available or running in headless environment");
        }
      } catch (error) {
        // Catch any unexpected errors to prevent build failures
        console.error("Unexpected error in MetaMask check:", error);
      }
    };

    // Wrap in try/catch to ensure CI builds don't fail
    try {
      checkMetaMask();
    } catch (error) {
      console.error("Failed to check MetaMask:", error);
    }

    // Cleanup listeners
    return () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      } catch (error) {
        console.error("Error cleaning up listeners:", error);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setIsConnected(false);
      setAccount('');
      setBalance('');
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const checkNetwork = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        // Arbitrum Sepolia chainId is 0x66eee (421614 in decimal)
        if (chainId === ARBITRUM_SEPOLIA.chainId) {
          setNetwork('Arbitrum Sepolia');
        } else {
          setNetwork('Not on Arbitrum Sepolia');
        }
      }
    } catch (error) {
      console.error("Error checking network:", error);
    }
  };

  const connectWallet = async () => {
    setStatus('');
    
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || !window.ethereum) {
        setStatus('MetaMask not installed or running in a headless environment.');
        return;
      }

      setIsLoading(true);
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setIsConnected(true);
      
      // Check if on Arbitrum Sepolia
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== ARBITRUM_SEPOLIA.chainId) {
        setStatus('Please switch to Arbitrum Sepolia testnet');
        
        try {
          // Try to switch to Arbitrum Sepolia
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ARBITRUM_SEPOLIA.chainId }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [ARBITRUM_SEPOLIA],
              });
            } catch (addError) {
              setStatus('Failed to add Arbitrum Sepolia network');
              console.error("Error adding network:", addError);
            }
          } else {
            console.error("Error switching network:", switchError);
          }
        }
      }
      
      checkNetwork();
      setIsLoading(false);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setStatus(`Failed to connect wallet: ${error.message || 'Unknown error'}. This demo will work properly when deployed to production.`);
      setIsLoading(false);
    }
  };

  const checkTokenBalance = async () => {
    try {
      if (typeof window === 'undefined') {
        console.log("Running in headless environment, skipping token balance check");
        return;
      }
      
      if (!isConnected) {
        setStatus('Please connect your wallet first');
        return;
      }
      
      if (!ethers.utils.isAddress(tokenAddress)) {
        setStatus('Please enter a valid token address');
        return;
      }
      
      setIsLoading(true);
      setStatus('Checking token balance...');
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      
      // Get token info
      try {
        const symbol = await tokenContract.symbol();
        const name = await tokenContract.name();
        const decimals = await tokenContract.decimals();
        
        setTokenSymbol(symbol);
        setTokenName(name);
        
        // Get balance
        const balanceWei = await tokenContract.balanceOf(account);
        const balanceFormatted = ethers.utils.formatUnits(balanceWei, decimals);
        
        setBalance(`${balanceFormatted} ${symbol}`);
        setStatus(`Successfully retrieved ${name} (${symbol}) balance`);
      } catch (err) {
        setStatus('Error: This does not appear to be a valid ERC20 token');
        console.error("Token contract error:", err);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking token balance:", error);
      setStatus('Error checking token balance. Make sure the address is correct.');
      setIsLoading(false);
    }
  };

  const sendToken = async () => {
    try {
      if (typeof window === 'undefined') {
        console.log("Running in headless environment, skipping token transfer");
        return;
      }
      
      if (!isConnected) {
        setStatus('Please connect your wallet first');
        return;
      }
      
      if (!ethers.utils.isAddress(tokenAddress) || !ethers.utils.isAddress(recipient)) {
        setStatus('Please enter valid addresses');
        return;
      }
      
      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        setStatus('Please enter a valid amount');
        return;
      }
      
      setIsLoading(true);
      setStatus('Initiating transfer...');
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      
      // Get token decimals
      const decimals = await tokenContract.decimals();
      
      // Convert amount to token units
      const amountInWei = ethers.utils.parseUnits(amount, decimals);
      
      // Send transaction
      const tx = await tokenContract.transfer(recipient, amountInWei);
      setStatus('Transaction sent! Waiting for confirmation...');
      
      // Wait for transaction to be mined
      await tx.wait();
      
      setStatus(`Successfully sent ${amount} ${tokenSymbol} to ${recipient.substring(0, 6)}...${recipient.substring(38)}`);
      
      // Update balance
      const balanceWei = await tokenContract.balanceOf(account);
      const balanceFormatted = ethers.utils.formatUnits(balanceWei, decimals);
      setBalance(`${balanceFormatted} ${tokenSymbol}`);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending tokens:", error);
      setStatus('Error sending tokens. Please check your inputs and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="arbitrum-demo-container">
      <div className="arbitrum-card">
        <div className="arbitrum-header">
          <div className="network-indicator">
            <div className={`network-dot ${network === 'Arbitrum Sepolia' ? 'connected' : 'disconnected'}`}></div>
            <span>{network || 'Not Connected'}</span>
          </div>
        </div>
        
        <div className="arbitrum-content">
          {!isConnected ? (
            <button 
              className="connect-button" 
              onClick={connectWallet} 
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <>
              <div className="account-info">
                <p>Connected: {account.substring(0, 6)}...{account.substring(38)}</p>
                {balance && <p>Balance: {balance}</p>}
                {tokenName && <p>Token: {tokenName}</p>}
              </div>
              
              <div className="form-group">
                <label>Token Address (ERC20)</label>
                <input 
                  type="text" 
                  placeholder="0x..." 
                  value={tokenAddress} 
                  onChange={(e) => setTokenAddress(e.target.value)} 
                />
                <button 
                  className="secondary-button" 
                  onClick={checkTokenBalance} 
                  disabled={isLoading || !tokenAddress}
                >
                  Check Balance
                </button>
              </div>
              
              <div className="form-group">
                <label>Recipient Address</label>
                <input 
                  type="text" 
                  placeholder="0x..." 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)} 
                />
              </div>
              
              <div className="form-group">
                <label>Amount</label>
                <input 
                  type="text" 
                  placeholder="0.0" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                />
              </div>
              
              <button 
                className="send-button" 
                onClick={sendToken} 
                disabled={isLoading || !tokenAddress || !recipient || !amount}
              >
                {isLoading ? 'Processing...' : 'Send Tokens'}
              </button>
            </>
          )}
          
          {status && <div className="status-message">{status}</div>}
        </div>
        
        <div className="arbitrum-footer">
          <p>This demo works on Arbitrum Sepolia testnet. You'll need test tokens to try it.</p>
          <p>
            <a 
              href="https://sepolia-faucet.arbitrum.io/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get Arbitrum Sepolia ETH
            </a>
          </p>
          <p>
            <a 
              href={`https://sepolia.arbiscan.io/address/${account}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: account ? 'inline-block' : 'none' }}
            >
              View account on Arbiscan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArbitrumPaymentDemo;
