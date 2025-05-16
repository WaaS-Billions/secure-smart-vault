
import { useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect } from 'wagmi';
import { useChainId } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
  });
  
  const { connect } = useConnect();
  const [isLoading, setIsLoading] = useState(true);
  const [networkName, setNetworkName] = useState<string | undefined>(undefined);

  const connectWallet = async () => {
    try {
      await connect({ connector: injected() });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (chainId) {
      // Map chain IDs to network names
      const networks: Record<number, string> = {
        1: 'Ethereum Mainnet',
        11155111: 'Sepolia',
        31337: 'Localhost',
      };
      
      setNetworkName(networks[chainId] || `Chain ID: ${chainId}`);
    }
  }, [chainId]);

  useEffect(() => {
    if (isConnected && balanceData) {
      setIsLoading(false);
    }
  }, [isConnected, balanceData]);

  return {
    address,
    isConnected,
    chainId,
    networkName,
    balance: balanceData?.formatted,
    symbol: balanceData?.symbol,
    isLoading,
    connectWallet,
  };
}
