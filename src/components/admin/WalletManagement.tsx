
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Wallet, Eye, Trash2, CheckCircle, XCircle, ArrowUpDown } from "lucide-react";

// Mock wallets data - in a real app, would come from API
const mockWallets = [
  { id: 1, name: 'Company Treasury', address: '0x1234...5678', owner: 'John Doe', type: 'multisig', signers: 3, threshold: 2, balance: '12.5 ETH', status: 'active', createdAt: '2023-03-15' },
  { id: 2, name: 'Marketing Budget', address: '0xabcd...ef12', owner: 'Jane Smith', type: 'personal', signers: 1, threshold: 1, balance: '3.2 ETH', status: 'active', createdAt: '2023-04-10' },
  { id: 3, name: 'Development Fund', address: '0x9876...5432', owner: 'Robert Johnson', type: 'multisig', signers: 5, threshold: 3, balance: '8.7 ETH', status: 'inactive', createdAt: '2023-02-25' },
  { id: 4, name: 'Operations Wallet', address: '0xfedc...ba98', owner: 'Lisa Brown', type: 'personal', signers: 1, threshold: 1, balance: '1.5 ETH', status: 'active', createdAt: '2023-05-05' },
  { id: 5, name: 'Emergency Fund', address: '0x4567...8901', owner: 'Michael Wilson', type: 'multisig', signers: 4, threshold: 3, balance: '25.0 ETH', status: 'active', createdAt: '2023-01-20' },
];

const WalletManagement = () => {
  const [wallets, setWallets] = useState(mockWallets);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredWallets = wallets
    .filter(wallet => {
      const matchesSearch = wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         wallet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wallet.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === 'all') return matchesSearch;
      if (filter === 'multisig') return matchesSearch && wallet.type === 'multisig';
      if (filter === 'personal') return matchesSearch && wallet.type === 'personal';
      return matchesSearch && wallet.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'balance') {
        const aValue = parseFloat(a.balance.split(' ')[0]);
        const bValue = parseFloat(b.balance.split(' ')[0]);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (sortBy === 'createdAt') {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

  const handleDeleteWallet = (walletId: number) => {
    if (confirm('Are you sure you want to delete this wallet?')) {
      setWallets(wallets.filter(wallet => wallet.id !== walletId));
    }
  };

  const handleStatusChange = (walletId: number) => {
    setWallets(wallets.map(wallet => {
      if (wallet.id === walletId) {
        const newStatus = wallet.status === 'active' ? 'inactive' : 'active';
        return { ...wallet, status: newStatus };
      }
      return wallet;
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Wallet Management</CardTitle>
            <CardDescription>Manage all smart wallets on the platform</CardDescription>
          </div>
          <Button className="bg-navy text-gold hover:bg-navy/90">
            <Wallet className="mr-2 h-4 w-4" /> Create Wallet
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search wallets..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'multisig' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('multisig')}
            >
              Multi-Sig
            </Button>
            <Button
              variant={filter === 'personal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('personal')}
            >
              Personal
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'inactive' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('inactive')}
            >
              Inactive
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center">
                    Wallet Name
                    {sortBy === 'name' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('balance')}>
                  <div className="flex items-center">
                    Balance
                    {sortBy === 'balance' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('createdAt')}>
                  <div className="flex items-center">
                    Created
                    {sortBy === 'createdAt' && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWallets.length > 0 ? (
                filteredWallets.map((wallet) => (
                  <TableRow key={wallet.id}>
                    <TableCell>
                      <div className="font-medium">{wallet.name}</div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs">{wallet.address}</span>
                    </TableCell>
                    <TableCell>{wallet.owner}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        wallet.type === 'multisig' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {wallet.type === 'multisig' ? `${wallet.threshold} of ${wallet.signers}` : 'Personal'}
                      </span>
                    </TableCell>
                    <TableCell>{wallet.balance}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        wallet.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {wallet.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(wallet.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleStatusChange(wallet.id)}>
                          {wallet.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteWallet(wallet.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No wallets found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletManagement;
