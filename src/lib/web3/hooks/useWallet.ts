
import { useState, useEffect } from 'react';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { useChainId } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
  });
  
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [isLoading, setIsLoading] = useState(true);
  const [networkName, setNetworkName] = useState<string | undefined>(undefined);

  const connectWallet = async () => {
    try {
      await connect({ connector: injected() });
      return true;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  useEffect(() => {
    if (chainId) {
      const networks: Record<number, string> = {
        8453: 'Base Mainnet',
        84532: 'Base Sepolia',
        31337: 'Localhost',
      };
      
      setNetworkName(networks[chainId] || `Chain ID: ${chainId}`);
    }
  }, [chainId]);

  useEffect(() => {
    setIsLoading(!isConnected);
  }, [isConnected]);

  return {
    address,
    isConnected,
    chainId,
    networkName,
    balance: balanceData?.formatted,
    symbol: balanceData?.symbol,
    isLoading,
    connectWallet,
    disconnectWallet,
  };
}
