
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet } from "lucide-react";
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance, symbol } = useWallet();
  const { toast } = useToast();
  
  // Mock data - in a real app, this would come from your API
  const wallets = [
    {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      name: 'Personal Wallet',
      balance: '1.25',
      signers: 3,
      threshold: 2
    },
    {
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      name: 'Team Treasury',
      balance: '5.72',
      signers: 5,
      threshold: 3
    }
  ];
  
  const handleConnectWallet = () => {
    // Open web3modal
    toast({
      title: "Connect Wallet",
      description: "Please connect your wallet to continue",
    });
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Smart Wallet Dashboard</h1>
        <Button onClick={() => navigate('/wallet/create')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Wallet
        </Button>
      </div>
      
      {!isConnected ? (
        <Card className="mb-8">
          <CardContent className="pt-6 text-center">
            <p className="mb-4">Connect your wallet to view your smart wallets</p>
            <Button onClick={handleConnectWallet}>
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
              <CardDescription>Your connected wallet details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Address</p>
                  <p className="text-sm text-muted-foreground font-mono break-all">
                    {address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Balance</p>
                  <p className="text-sm text-muted-foreground">
                    {balance} {symbol}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-4">Your Smart Wallets</h2>
          
          {wallets.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="mb-4">You don't have any smart wallets yet</p>
                <Button onClick={() => navigate('/wallet/create')}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Wallet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <Card 
                  key={wallet.address}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/wallet/${wallet.address}`)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5" />
                      {wallet.name}
                    </CardTitle>
                    <CardDescription className="font-mono text-xs">
                      {wallet.address.substring(0, 6)}...{wallet.address.substring(38)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Balance:</span>
                        <span className="font-medium">{wallet.balance} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Signers:</span>
                        <span>{wallet.signers} ({wallet.threshold} required)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card 
                className="flex flex-col items-center justify-center h-full border-dashed cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => navigate('/wallet/create')}
              >
                <div className="py-8 flex flex-col items-center text-center px-4">
                  <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="font-medium">Create New Wallet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add another smart wallet to your account
                  </p>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
