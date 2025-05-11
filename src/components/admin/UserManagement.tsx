
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, UserPlus, Edit, Trash2, CheckCircle, XCircle, Filter } from "lucide-react";

// Mock users data - in a real app, would come from API
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', wallets: 3, status: 'active', role: 'user', joined: '2023-02-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', wallets: 2, status: 'active', role: 'admin', joined: '2023-03-10' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', wallets: 1, status: 'inactive', role: 'user', joined: '2023-04-05' },
  { id: 4, name: 'Lisa Brown', email: 'lisa@example.com', wallets: 5, status: 'active', role: 'user', joined: '2023-01-20' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', wallets: 0, status: 'pending', role: 'user', joined: '2023-05-12' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && user.status === filter;
  });

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleStatusChange = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage platform users and their permissions</CardDescription>
          </div>
          <Button className="bg-navy text-gold hover:bg-navy/90">
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
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
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Wallets</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.wallets}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : user.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleStatusChange(user.id)}>
                          {user.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No users found
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

export default UserManagement;
