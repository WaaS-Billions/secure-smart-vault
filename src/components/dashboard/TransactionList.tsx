
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ChevronRight, ArrowRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing' | 'swap';
  amount: string;
  asset: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  address: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold">Recent Activity</h2>
        <Button 
          variant="link" 
          className="text-gold p-0 h-auto flex items-center gap-1" 
          onClick={() => navigate('/transactions')}
        >
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Card className="paper-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-gold text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2" /> Transaction History
          </CardTitle>
          <CardDescription className="text-white/70">
            Recent transfers and swaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-2 border-b border-gold/10">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === 'incoming' 
                      ? 'bg-green-900/20 text-green-400'
                      : tx.type === 'outgoing' 
                        ? 'bg-amber-900/20 text-amber-400' 
                        : 'bg-purple-900/20 text-purple-400'
                  }`}>
                    {tx.type === 'incoming' ? (
                      <ArrowRight className="h-4 w-4 transform -rotate-45" />
                    ) : tx.type === 'outgoing' ? (
                      <ArrowRight className="h-4 w-4 transform rotate-45" />
                    ) : (
                      <ArrowRight className="h-4 w-4 transform rotate-90" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium text-white">
                      {tx.type === 'incoming' ? 'Received' : tx.type === 'outgoing' ? 'Sent' : 'Swapped'}
                    </p>
                    <p className="text-xs text-white/70">
                      {formatDate(tx.timestamp)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-medium ${
                    tx.type === 'incoming' 
                      ? 'text-green-400' 
                      : tx.type === 'outgoing' 
                        ? 'text-amber-400' 
                        : 'text-purple-400'
                  }`}>
                    {tx.type === 'incoming' ? '+' : tx.type === 'outgoing' ? '-' : ''}
                    {tx.amount} {tx.asset}
                  </p>
                  <p className="text-xs text-white/70 font-mono">
                    {tx.address === '-' ? 'Swap' : `${tx.address.substring(0, 6)}...${tx.address.substring(tx.address.length - 4)}`}
                  </p>
                </div>
              </div>
            ))}
            
            {transactions.length === 0 && (
              <div className="text-center py-4 text-white/70">
                No recent transactions
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionList;
