
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/lib/web3/hooks/useWallet';

const ConnectWalletButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { address, isConnected, connectWallet } = useWallet();

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await connectWallet();
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected to Base chain.",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCreateWallet = () => {
    navigate('/wallet/create');
  };

  if (isConnected && address) {
    return (
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Button 
          onClick={() => navigate('/dashboard')} 
          className="bg-gold text-navy hover:bg-gold/90 px-10 py-6 text-lg"
        >
          <Wallet className="mr-2 h-5 w-5" />
          Go to Dashboard
        </Button>
        <Button 
          onClick={handleCreateWallet}
          variant="outline"
          className="border-gold text-gold hover:bg-gold/10 px-10 py-6 text-lg"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <Button 
        onClick={handleConnectWallet} 
        className="bg-gold text-navy hover:bg-gold/90 px-10 py-6 text-lg"
        disabled={isConnecting}
      >
        {isConnecting ? (
          <>
            <div className="animate-spin mr-2 h-5 w-5 border-2 border-navy border-t-transparent rounded-full" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </>
        )}
      </Button>
      <Button 
        onClick={handleCreateWallet}
        variant="outline"
        className="border-gold text-gold hover:bg-gold/10 px-10 py-6 text-lg"
      >
        <Plus className="mr-2 h-5 w-5" />
        Create New Wallet
      </Button>
    </div>
  );
};

export default ConnectWalletButton;
