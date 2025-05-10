
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Wallet, 
  Activity, 
  Settings, 
  Shield, 
  CheckCircle2, 
  AlertCircle,
  Layers
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data - in a real app, this would come from your API
  const stats = {
    totalWallets: 128,
    activeWallets: 98,
    totalUsers: 76,
    transactionsToday: 42,
    avgSignatureTime: '3.5 minutes',
    pendingDeployments: 3
  };
  
  const recentWallets = [
    { address: '0x1234...5678', name: 'Company Treasury', user: 'john@example.com', date: '2023-06-10' },
    { address: '0xabcd...ef12', name: 'Marketing Budget', user: 'sarah@example.com', date: '2023-06-09' },
    { address: '0x9876...5432', name: 'Team Wallet', user: 'mike@example.com', date: '2023-06-08' }
  ];
  
  const recentTransactions = [
    { hash: '0x1234...5678', wallet: 'Company Treasury', value: '1.25 ETH', status: 'confirmed', date: '2023-06-10' },
    { hash: '0xabcd...ef12', wallet: 'Marketing Budget', value: '0.5 ETH', status: 'pending', date: '2023-06-09' },
    { hash: '0x9876...5432', wallet: 'Team Wallet', value: '0.1 ETH', status: 'failed', date: '2023-06-08' }
  ];
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your wallet-as-a-service platform</p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Platform Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Wallets
            </CardTitle>
            <div className="flex items-center">
              <Wallet className="h-4 w-4 mr-2 text-muted-foreground" />
              <CardDescription className="text-2xl font-bold text-foreground">
                {stats.totalWallets}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {stats.activeWallets} wallets active ({Math.round(stats.activeWallets / stats.totalWallets * 100)}%)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <CardDescription className="text-2xl font-bold text-foreground">
                {stats.totalUsers}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Avg. {(stats.totalWallets / stats.totalUsers).toFixed(1)} wallets per user
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transactions Today
            </CardTitle>
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
              <CardDescription className="text-2xl font-bold text-foreground">
                {stats.transactionsToday}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Avg. signature time: {stats.avgSignatureTime}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">
            <Layers className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="wallets">
            <Wallet className="h-4 w-4 mr-2" />
            Wallets
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <Activity className="h-4 w-4 mr-2" />
            Transactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Wallets</CardTitle>
                <CardDescription>
                  Recently created smart wallets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWallets.map((wallet, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{wallet.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {wallet.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{wallet.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {wallet.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <CardDescription>
                  Latest transaction activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{tx.wallet}</p>
                        <p className="text-sm text-muted-foreground">
                          {tx.hash}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 justify-end">
                          {tx.status === 'confirmed' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : tx.status === 'pending' ? (
                            <Shield className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <p className="text-sm">{tx.value}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {tx.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
              <CardDescription>
                Current status of your wallet infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">MPC Service</p>
                    <p className="text-sm text-muted-foreground">Operational</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Account Abstraction</p>
                    <p className="text-sm text-muted-foreground">Operational</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Deployment Queue</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.pendingDeployments} pending deployments
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wallets" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Wallets</CardTitle>
              <CardDescription>
                Manage all smart wallets on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-muted-foreground">
                Wallet management interface would be shown here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users of the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-muted-foreground">
                User management interface would be shown here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View and manage all transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-10 text-muted-foreground">
                Transaction history and details would be shown here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
