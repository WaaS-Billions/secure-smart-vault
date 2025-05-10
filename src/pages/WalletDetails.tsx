
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from '@/lib/web3/hooks/useWallet';

// Import our new components
import WalletHeader from '@/components/wallet/WalletHeader';
import WalletSummary from '@/components/wallet/WalletSummary';
import WalletOverviewTab from '@/components/wallet/WalletOverviewTab';
import TransactionsTab from '@/components/wallet/TransactionsTab';
import SignersTab from '@/components/wallet/SignersTab';

const WalletDetails = () => {
  const { address } = useParams();
  const { isConnected } = useWallet();
  
  // Mock data - this would come from your API in a real application
  const wallet = {
    address: address || '0x1234567890abcdef1234567890abcdef12345678',
    name: 'Personal Wallet',
    balance: '1.25',
    signers: [
      {
        address: '0x1234567890abcdef1234567890abcdef12345678',
        name: 'Main Account (You)'
      },
      {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        name: 'Hardware Wallet'
      },
      {
        address: '0x9876543210fedcba9876543210fedcba98765432',
        name: 'Recovery Account'
      }
    ],
    threshold: 2
  };
  
  const transactions = [
    {
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      value: '0.1',
      status: 'confirmed' as const,
      timestamp: '2023-06-10T14:30:00Z',
      confirmations: 2
    },
    {
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      to: '0x9876543210fedcba9876543210fedcba98765432',
      value: '0.05',
      status: 'pending' as const,
      timestamp: '2023-06-09T11:15:00Z',
      confirmations: 1
    }
  ];
  
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="container mx-auto py-8">
      <WalletHeader name={wallet.name} />
      
      <WalletSummary 
        address={wallet.address}
        balance={wallet.balance}
        signers={wallet.signers}
        threshold={wallet.threshold}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="signers">Signers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <WalletOverviewTab 
            transactions={transactions}
            signers={wallet.signers}
            threshold={wallet.threshold}
            setActiveTab={setActiveTab}
          />
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <TransactionsTab 
            transactions={transactions}
            threshold={wallet.threshold}
          />
        </TabsContent>
        
        <TabsContent value="signers" className="mt-6">
          <SignersTab 
            walletAddress={wallet.address}
            signers={wallet.signers}
            threshold={wallet.threshold}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletDetails;
