
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { ethers } from 'ethers';

// The target address to withdraw to
const TARGET_ADDRESS = '0xFF66d3fcBa8EF0c5DC5CF2d2c889abEEbAad37be';

const WithdrawFunds = () => {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [txHash, setTxHash] = useState('');
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const { address, balance, symbol, networkName } = useWallet();

  // Reset the form
  const resetForm = () => {
    setAmount('');
    setProgress(0);
    setTxHash('');
    setTxStatus('idle');
  };

  // Function to simulate progress updates during transaction
  const updateProgressBar = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        // When transaction is still pending, progress should not reach 100%
        const newProgress = oldProgress + 5;
        if (newProgress >= 95 && txStatus === 'pending') {
          return 95;
        }
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    return interval;
  };

  const handleWithdraw = async () => {
    if (!address || !amount || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      setTxStatus('pending');
      
      // Start progress bar animation
      const progressInterval = updateProgressBar();
      
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
        
        setTxHash(tx.hash);
        
        toast({
          title: "Transaction Initiated",
          description: `Transaction sent with hash: ${tx.hash.substring(0, 10)}...`,
        });
        
        // Wait for transaction to be mined
        const receipt = await tx.wait();
        
        // Set progress to 100% after transaction confirms
        setProgress(100);
        setTxStatus('success');
        
        toast({
          title: "Funds Withdrawn Successfully",
          description: `Successfully sent ${amount} ${symbol} to the target address`,
        });
        
        // Clear the interval
        clearInterval(progressInterval);
      } else {
        setTxStatus('error');
        clearInterval(progressInterval);
        
        toast({
          variant: "destructive",
          title: "No Web3 Provider",
          description: "Please install MetaMask or another Ethereum wallet.",
        });
      }
    } catch (error: any) {
      console.error('Withdrawal error:', error);
      setTxStatus('error');
      setProgress(0);
      
      toast({
        variant: "destructive",
        title: "Withdrawal Failed",
        description: error.message || "Could not complete the transaction.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get the explorer URL for the transaction
  const getExplorerUrl = (hash: string) => {
    // Default to Etherscan
    let baseUrl = 'https://etherscan.io/tx/';
    
    // Adjust for different networks
    if (networkName?.toLowerCase().includes('sepolia')) {
      baseUrl = 'https://sepolia.etherscan.io/tx/';
    } else if (networkName?.toLowerCase().includes('localhost')) {
      return ''; // Local network has no explorer
    }
    
    return `${baseUrl}${hash}`;
  };
  
  return (
    <Card className="paper-card">
      <CardHeader>
        <CardTitle className="text-xl text-gold">Withdraw Funds</CardTitle>
      </CardHeader>
      <CardContent>
        {txStatus === 'success' ? (
          <div className="space-y-4 text-center">
            <div className="h-16 w-16 rounded-full bg-green-900/20 mx-auto flex items-center justify-center">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Transaction Successful!</h3>
            <p className="text-white/70">
              You have successfully withdrawn {amount} {symbol} to the target address.
            </p>
            {txHash && (
              <div className="pt-2">
                <p className="text-sm text-white/70 mb-2">Transaction ID:</p>
                <p className="font-mono text-xs bg-navy/60 p-2 rounded break-all">{txHash}</p>
                {getExplorerUrl(txHash) && (
                  <a 
                    href={getExplorerUrl(txHash)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold flex items-center justify-center gap-1 mt-2 hover:text-gold/80"
                  >
                    View on Explorer <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
            <Button onClick={resetForm} className="w-full mt-4 bg-gold text-navy hover:bg-gold/90">
              Make Another Withdrawal
            </Button>
          </div>
        ) : (
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
                disabled={isSubmitting}
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
            
            {txStatus === 'pending' && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Transaction in progress...</span>
                  <span className="text-white">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                {txHash && (
                  <p className="text-xs text-white/70 mt-1">
                    Transaction ID: <span className="font-mono">{txHash.substring(0, 10)}...</span>
                  </p>
                )}
              </div>
            )}
            
            {txStatus === 'error' && (
              <div className="text-red-400 text-sm pt-2">
                Transaction failed. Please try again.
              </div>
            )}
          </div>
        )}
      </CardContent>
      {txStatus !== 'success' && (
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
      )}
    </Card>
  );
};

export default WithdrawFunds;
