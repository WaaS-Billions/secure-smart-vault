
import { useState, useEffect } from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balanceData } = useBalance({
    address,
    enabled: Boolean(address),
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isConnected && balanceData) {
      setIsLoading(false);
    }
  }, [isConnected, balanceData]);

  return {
    address,
    isConnected,
    chainId: chain?.id,
    networkName: chain?.name,
    balance: balanceData?.formatted,
    symbol: balanceData?.symbol,
    isLoading,
  };
}
