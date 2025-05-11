
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpDown, Users, CreditCard, Activity } from 'lucide-react';
import UserManagement from '@/components/admin/UserManagement';
import WalletManagement from '@/components/admin/WalletManagement';
import GoBackButton from '@/components/common/GoBackButton';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <GoBackButton />
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gold">Admin Dashboard</h1>
          <p className="text-white/80">Manage Daily Wallet platform</p>
        </div>
        <Button variant="outline">Export Data</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-form">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-navy">Total Users</CardTitle>
            <Users className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">1,284</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass-form">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-navy">Total Wallets</CardTitle>
            <CreditCard className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">1,896</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass-form">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-navy">Ramp Transactions</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">438</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 glass-form">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-6">
          <Card className="glass-form">
            <CardHeader>
              <CardTitle className="text-navy">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p className="font-medium text-navy">Transaction #{i}</p>
                      <p className="text-sm text-muted-foreground">
                        {i % 2 === 0 ? "On-Ramp" : "Off-Ramp"} • {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${i % 3 === 0 ? "text-amber-500" : "text-green-500"}`}>
                        {i % 2 === 0 ? "+" : "-"}0.{i*5} ETH
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${(i * 50).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="mt-6">
          <UserManagement />
        </TabsContent>
        <TabsContent value="wallets" className="mt-6">
          <WalletManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
