
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeftRight, 
  Settings, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { useWallet } from '@/lib/web3/hooks/useWallet';

interface Transaction {
  hash: string;
  to: string;
  value: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  confirmations: number;
}

const WalletDetails = () => {
  const { address } = useParams();
  const navigate = useNavigate();
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
  
  const transactions: Transaction[] = [
    {
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      value: '0.1',
      status: 'confirmed',
      timestamp: '2023-06-10T14:30:00Z',
      confirmations: 2
    },
    {
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      to: '0x9876543210fedcba9876543210fedcba98765432',
      value: '0.05',
      status: 'pending',
      timestamp: '2023-06-09T11:15:00Z',
      confirmations: 1
    }
  ];
  
  const [activeTab, setActiveTab] = useState('overview');
  
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8 space-x-2">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="p-0 w-10 h-10"
        >
          <span className="sr-only">Back</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Button>
        <h1 className="text-3xl font-bold">{wallet.name}</h1>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
              <p className="font-mono text-sm break-all">{wallet.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Balance</p>
              <p className="text-2xl font-bold">{wallet.balance} ETH</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Signers</p>
              <p className="font-medium">{wallet.signers.length} signers ({wallet.threshold} required)</p>
            </div>
          </div>
          <div className="flex mt-6 space-x-2">
            <Button onClick={() => navigate(`/wallet/${wallet.address}/send`)}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Send
            </Button>
            <Button variant="outline" onClick={() => navigate(`/wallet/${wallet.address}/settings`)}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="signers">Signers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowLeftRight className="mr-2 h-5 w-5" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No transactions yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {transactions.slice(0, 3).map((tx) => (
                      <div key={tx.hash} className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(tx.status)}
                            <p className="font-medium">
                              {tx.value} ETH
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground font-mono">
                            To: {tx.to.substring(0, 6)}...{tx.to.substring(38)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {tx.confirmations}/{wallet.threshold} signatures
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveTab('transactions')}
                >
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Signers
                </CardTitle>
                <CardDescription>
                  {wallet.threshold} out of {wallet.signers.length} signatures required
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wallet.signers.map((signer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{signer.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {signer.address.substring(0, 6)}...{signer.address.substring(38)}
                        </p>
                      </div>
                      {index < wallet.threshold && (
                        <Shield className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setActiveTab('signers')}
                >
                  Manage Signers
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ArrowLeftRight className="mr-2 h-5 w-5" />
                Transaction History
              </CardTitle>
              <CardDescription>
                All transactions for this wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No transactions yet
                </p>
              ) : (
                <div className="space-y-6">
                  {transactions.map((tx) => (
                    <div key={tx.hash} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(tx.status)}
                          <p className="font-medium">
                            {tx.value} ETH
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">To:</p>
                          <p className="font-mono break-all">{tx.to}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Transaction Hash:</p>
                          <p className="font-mono break-all">{tx.hash}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          Confirmations: {tx.confirmations}/{wallet.threshold}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="signers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Wallet Signers
              </CardTitle>
              <CardDescription>
                {wallet.threshold} out of {wallet.signers.length} signatures required for transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {wallet.signers.map((signer, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{signer.name}</p>
                      <p className="text-sm text-muted-foreground font-mono break-all">
                        {signer.address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {index < wallet.threshold && (
                        <div className="flex items-center text-sm text-blue-500">
                          <Shield className="h-4 w-4 mr-1" />
                          Required
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/wallet/${wallet.address}/settings`)}
              >
                Wallet Settings
              </Button>
              <Button onClick={() => navigate(`/wallet/${wallet.address}/add-signer`)}>
                Add Signer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletDetails;
