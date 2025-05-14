
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface SmartWallet {
  address: string;
  name: string;
  balance: string;
  signers: number;
  threshold: number;
  type: 'personal' | 'multiparty';
}

interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing' | 'swap';
  amount: string;
  asset: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  address: string;
}

export const useDashboardData = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [wallets, setWallets] = useState<SmartWallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to fetch user wallets
        setTimeout(() => {
          setWallets([
            {
              address: '0x1234567890abcdef1234567890abcdef12345678',
              name: 'Personal Wallet',
              balance: '1.25',
              signers: 1,
              threshold: 1,
              type: 'personal'
            },
            {
              address: '0xabcdef1234567890abcdef1234567890abcdef12',
              name: 'Team Treasury',
              balance: '5.72',
              signers: 5,
              threshold: 3,
              type: 'multiparty'
            }
          ]);
          
          // Mock transaction data
          setTransactions([
            {
              id: 'tx1',
              type: 'incoming',
              amount: '0.42',
              asset: 'ETH',
              timestamp: '2023-05-15T14:20:00Z',
              status: 'completed',
              address: '0x71c7656ec7ab88b098defb751b7401b5f6d8976f'
            },
            {
              id: 'tx2',
              type: 'outgoing',
              amount: '0.15',
              asset: 'ETH',
              timestamp: '2023-05-10T10:30:00Z',
              status: 'completed',
              address: '0x7a16ff8270133f063aab6c9977183d9e72835428'
            },
            {
              id: 'tx3',
              type: 'swap',
              amount: '1.00',
              asset: 'ETH → USDC',
              timestamp: '2023-05-09T08:45:00Z',
              status: 'pending',
              address: '-'
            }
          ]);
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load wallet data'
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, toast]);

  const getTotalBalance = () => {
    return wallets.reduce((acc, wallet) => acc + parseFloat(wallet.balance), 0).toFixed(2);
  };

  return {
    wallets,
    transactions,
    isLoading,
    getTotalBalance
  };
};
