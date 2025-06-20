
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send, QrCode } from 'lucide-react';

const WalletDetails = () => {
  const { address } = useParams<{ address: string }>();
  
  // Mock wallet data
  const wallet = {
    name: "My Smart Wallet",
    address: address ? `0x${address}` : "0x0",
    balance: "1.24 ETH",
    network: "Base Mainnet",
  };

  const transactions = [
    { 
      id: "tx1", 
      type: "Received",
      amount: "+0.5 ETH",
      from: "0xd8da...6045",
      date: "2024-01-15",
      status: "Completed"
    },
    { 
      id: "tx2", 
      type: "Sent",
      amount: "-0.1 ETH",
      to: "0x71c7...976f",
      date: "2024-01-14",
      status: "Completed"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">{wallet.name}</h1>
          <p className="text-white/70 font-mono">{wallet.address}</p>
          <p className="text-white/70">Network: {wallet.network}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-4">{wallet.balance}</div>
              <div className="flex gap-2">
                <Button className="bg-gold text-navy hover:bg-gold/90 flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </Button>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 flex-1">
                  <QrCode className="mr-2 h-4 w-4" />
                  Receive
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-sm border border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold">Wallet Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Type:</span>
                  <span className="text-white">Smart Wallet</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Network:</span>
                  <span className="text-white">{wallet.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Status:</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-white/5 backdrop-blur-sm border border-gold/20">
          <CardHeader>
            <CardTitle className="text-gold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{tx.type}</div>
                    <div className="text-sm text-white/70">
                      {tx.type === 'Received' ? `From: ${tx.from}` : `To: ${tx.to}`}
                    </div>
                    <div className="text-sm text-white/70">{tx.date}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${tx.type === 'Received' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.amount}
                    </div>
                    <div className="text-sm text-white/70">{tx.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletDetails;
