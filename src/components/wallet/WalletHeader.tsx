
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface WalletHeaderProps {
  name: string;
}

const WalletHeader = ({ name }: WalletHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center mb-8 space-x-2">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/dashboard')}
        className="p-0 w-10 h-10"
      >
        <span className="sr-only">Back</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Button>
      <h1 className="text-3xl font-bold">{name}</h1>
    </div>
  );
};

export default WalletHeader;
