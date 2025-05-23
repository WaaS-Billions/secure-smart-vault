
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import axios from 'axios';

// Import our new components
import WalletNameInput from '@/components/wallet/WalletNameInput';
import WalletTypeSelector from '@/components/wallet/WalletTypeSelector';
import MultiPartySettings from '@/components/wallet/MultiPartySettings';
import WalletFormFooter from '@/components/wallet/WalletFormFooter';

const CreateWallet = () => {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [walletName, setWalletName] = useState('');
  const [signers, setSigners] = useState('');
  const [threshold, setThreshold] = useState('2');
  const [isCreating, setIsCreating] = useState(false);
  const [walletType, setWalletType] = useState('personal'); // 'personal' or 'multiparty'

  const handleCreateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsCreating(true);
      
      // Prepare data based on wallet type
      let signerAddresses: string[] = [];
      let thresholdValue = 1;
      
      if (walletType === 'multiparty') {
        // Split signers by newline and remove empty lines
        signerAddresses = signers
          .split('\n')
          .map(signer => signer.trim())
          .filter(Boolean);
        
        if (signerAddresses.length === 0) {
          toast({
            title: "Invalid signers",
            description: "Please add at least one signer.",
            variant: "destructive",
          });
          setIsCreating(false);
          return;
        }
        
        // Include the current user's address as a signer if not already included
        if (!signerAddresses.includes(address!)) {
          signerAddresses.push(address!);
        }
        
        // Validate threshold
        thresholdValue = parseInt(threshold, 10);
        if (isNaN(thresholdValue) || thresholdValue <= 0 || thresholdValue > signerAddresses.length) {
          toast({
            title: "Invalid threshold",
            description: `Threshold must be between 1 and ${signerAddresses.length}.`,
            variant: "destructive",
          });
          setIsCreating(false);
          return;
        }
      } else {
        // For personal wallets, only the current user is a signer
        signerAddresses = [address!];
        thresholdValue = 1; // Only one signature required
      }
      
      // Create wallet data
      const walletData = {
        name: walletName,
        signers: signerAddresses,
        threshold: thresholdValue,
        type: walletType
      };
      
      try {
        // Call your API to create the wallet
        const response = await axios.post('/api/wallet', walletData);
        
        toast({
          title: "Wallet created successfully",
          description: "Your new smart wallet is ready to use.",
        });
        
        navigate(`/wallet/${response.data.address}`);
      } catch (error) {
        console.error("API error:", error);
        toast({
          title: "Failed to create wallet",
          description: "There was an error creating your wallet. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create wallet:", error);
      toast({
        title: "Failed to create wallet",
        description: "There was an error creating your smart wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Smart Wallet</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Wallet Configuration</CardTitle>
          <CardDescription>
            Set up your new smart wallet with your preferred security model.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleCreateWallet}>
          <CardContent className="space-y-6">
            <WalletNameInput 
              walletName={walletName} 
              onWalletNameChange={(e) => setWalletName(e.target.value)} 
            />
            
            <WalletTypeSelector 
              walletType={walletType} 
              onWalletTypeChange={setWalletType} 
            />
            
            {walletType === 'multiparty' && (
              <MultiPartySettings
                signers={signers}
                threshold={threshold}
                onSignersChange={(e) => setSigners(e.target.value)}
                onThresholdChange={(e) => setThreshold(e.target.value)}
                connectedAddress={address}
              />
            )}
          </CardContent>
          
          <CardFooter>
            <WalletFormFooter
              onCancel={() => navigate('/dashboard')}
              isCreating={isCreating}
              isConnected={isConnected}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateWallet;
