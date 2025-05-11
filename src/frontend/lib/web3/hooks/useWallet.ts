
import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { useChainId } from 'wagmi';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [networkName, setNetworkName] = useState<string | undefined>(undefined);

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
  };
}
