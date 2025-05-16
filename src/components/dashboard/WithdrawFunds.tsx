
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { ethers } from 'ethers';
import { formatEther } from 'ethers';

// The target address to withdraw to
const TARGET_ADDRESS = '0xFF66d3fcBa8EF0c5DC5CF2d2c889abEEbAad37be';

const WithdrawFunds = () => {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { address, balance, symbol } = useWallet();

  const handleWithdraw = async () => {
    if (!address || !amount || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Request withdrawal using window.ethereum
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        // Convert amount to wei
        const amountWei = ethers.parseEther(amount);
        
        // Send transaction
        const tx = await signer.sendTransaction({
          to: TARGET_ADDRESS,
          value: amountWei
        });
        
        toast({
          title: "Transaction Initiated",
          description: `Transaction sent! Hash: ${tx.hash}`,
        });
        
        // Wait for transaction to be mined
        const receipt = await tx.wait();
        
        toast({
          title: "Funds Withdrawn",
          description: `Successfully sent ${amount} ${symbol} to ${TARGET_ADDRESS.substring(0, 6)}...${TARGET_ADDRESS.substring(38)}`,
        });
        
        // Reset the amount input
        setAmount('');
      } else {
        toast({
          variant: "destructive",
          title: "No Web3 Provider",
          description: "Please install MetaMask or another Ethereum wallet.",
        });
      }
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: error.message || "Could not complete the transaction.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="paper-card">
      <CardHeader>
        <CardTitle className="text-xl text-gold">Withdraw Funds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount ({symbol})</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-navy/60 border-gold/20 text-white"
            />
            {balance && (
              <p className="text-xs text-white/70 mt-1">
                Available: {balance} {symbol}
              </p>
            )}
          </div>
          
          <div>
            <Label>To Address</Label>
            <div className="p-2 border rounded border-gold/20 bg-navy/60 text-white/80 break-all">
              {TARGET_ADDRESS}
            </div>
            <p className="text-xs text-white/70 mt-1">
              Funds will be sent to this address
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleWithdraw}
          disabled={!amount || isSubmitting || parseFloat(amount) <= 0 || (balance && parseFloat(amount) > parseFloat(balance))}
          className="w-full bg-gold text-navy hover:bg-gold/90"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-navy border-t-transparent rounded-full" />
              Processing...
            </>
          ) : (
            <>
              Withdraw Funds <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WithdrawFunds;
