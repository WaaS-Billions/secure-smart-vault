
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import SignerItem from './SignerItem';

interface SignersTabProps {
  walletAddress: string;
  signers: Array<{
    address: string;
    name: string;
  }>;
  threshold: number;
}

const SignersTab = ({ walletAddress, signers, threshold }: SignersTabProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Wallet Signers
        </CardTitle>
        <CardDescription>
          {threshold} out of {signers.length} signatures required for transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {signers.map((signer, index) => (
            <SignerItem 
              key={index} 
              signer={signer} 
              isRequired={index < threshold} 
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate(`/wallet/${walletAddress}/settings`)}
        >
          Wallet Settings
        </Button>
        <Button onClick={() => navigate(`/wallet/${walletAddress}/add-signer`)}>
          Add Signer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignersTab;
