
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useDashboardData } from '@/hooks/useDashboardData';
import SummaryCards from '@/components/dashboard/SummaryCards';
import WalletGrid from '@/components/dashboard/WalletGrid';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionList from '@/components/dashboard/TransactionList';
import WithdrawFunds from '@/components/dashboard/WithdrawFunds';

const Dashboard = () => {
  const { wallets, transactions, isLoading, getTotalBalance } = useDashboardData();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Summary Cards */}
        <SummaryCards totalBalance={getTotalBalance()} wallets={wallets} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gold">Your Smart Wallets</h2>
              </div>
              
              <WalletGrid wallets={wallets} isLoading={isLoading} />
            </div>
          
            <QuickActions />
          </div>
          
          <div className="space-y-6">
            <WithdrawFunds />
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
