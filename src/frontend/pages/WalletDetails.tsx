
import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletHeader from '@/components/wallet/WalletHeader';
import WalletOverviewTab from '@/components/wallet/WalletOverviewTab';
import TransactionsTab from '@/components/wallet/TransactionsTab';
import SignersTab from '@/components/wallet/SignersTab';

const WalletDetails = () => {
  const { address } = useParams<{ address: string }>();
  
  // In a real app, you would fetch wallet details from an API
  // This is mock data for demonstration
  const wallet = {
    name: "My Smart Wallet",
    address: address ? `0x${address}` : "0x0",
    balance: "1.24 ETH",
    type: "multisig",
    threshold: 2,
    signers: [
      { name: "Main Account", address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" },
      { name: "Hardware Wallet", address: "0x71c7656ec7ab88b098defb751b7401b5f6d8976f" },
      { name: "Team Member", address: "0x7a16ff8270133f063aab6c9977183d9e72835428" },
    ],
    transactions: [
      { 
        id: "tx1", 
        type: "transfer",
        status: "completed",
        hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
        to: "0x71c7656ec7ab88b098defb751b7401b5f6d8976f",
        amount: "0.5 ETH",
        date: "2023-05-10T10:30:00Z",
        confirmations: 3,
        requiredConfirmations: 2
      },
      { 
        id: "tx2", 
        type: "transfer",
        status: "pending",
        hash: "",
        from: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
        to: "0x7a16ff8270133f063aab6c9977183d9e72835428",
        amount: "0.1 ETH",
        date: "2023-05-15T14:20:00Z",
        confirmations: 1,
        requiredConfirmations: 2
      },
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <WalletHeader 
        name={wallet.name} 
        address={wallet.address} 
        balance={wallet.balance} 
      />
      
      <div className="mt-8">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="signers">Signers</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <WalletOverviewTab wallet={wallet} />
          </TabsContent>
          <TabsContent value="transactions" className="mt-6">
            <TransactionsTab transactions={wallet.transactions} />
          </TabsContent>
          <TabsContent value="signers" className="mt-6">
            <SignersTab 
              signers={wallet.signers} 
              threshold={wallet.threshold} 
              isMultisig={wallet.type === 'multisig'}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WalletDetails;
