
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { injected } from 'wagmi/connectors';
import { useConnect } from 'wagmi';

const ConnectWalletButton = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { address, isConnected } = useWallet();
  const { connect } = useConnect();

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      await connect({ connector: injected() });
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
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

  if (isConnected && address) {
    return (
      <Button 
        onClick={() => navigate('/dashboard')} 
        className="bg-gold text-navy hover:bg-gold/90 px-10 py-6 text-lg"
      >
        <Wallet className="mr-2 h-5 w-5" />
        Go to Dashboard
      </Button>
    );
  }

  return (
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
  );
};

export default ConnectWalletButton;
