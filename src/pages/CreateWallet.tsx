
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from 'axios';

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
            <div className="space-y-2">
              <Label htmlFor="walletName">Wallet Name</Label>
              <Input
                id="walletName"
                placeholder="My Smart Wallet"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-4">
              <Label>Wallet Type</Label>
              <RadioGroup
                defaultValue="personal"
                value={walletType}
                onValueChange={setWalletType}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal" className="cursor-pointer flex-1">
                    <div className="font-medium">Personal Wallet</div>
                    <p className="text-sm text-muted-foreground">
                      Simple wallet controlled by a single address. Recommended for personal use.
                    </p>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="multiparty" id="multiparty" />
                  <Label htmlFor="multiparty" className="cursor-pointer flex-1">
                    <div className="font-medium">Multi-Party Wallet</div>
                    <p className="text-sm text-muted-foreground">
                      Advanced security with multiple signers. Ideal for teams and organizations.
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {walletType === 'multiparty' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="signers">
                    Additional Signers (One Ethereum address per line)
                  </Label>
                  <Textarea
                    id="signers"
                    placeholder="0x123...&#10;0x456...&#10;0x789..."
                    value={signers}
                    onChange={(e) => setSigners(e.target.value)}
                    rows={5}
                  />
                  <p className="text-sm text-muted-foreground">
                    Your address ({address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}) will be added automatically.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="threshold">
                    Signature Threshold (How many signers are required)
                  </Label>
                  <Input
                    id="threshold"
                    type="number"
                    min="1"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isCreating || !isConnected}
            >
              {isCreating ? 'Creating...' : 'Create Wallet'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateWallet;
