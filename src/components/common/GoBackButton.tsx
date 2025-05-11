
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoBackButtonProps {
  className?: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Button 
      variant="ghost" 
      className={`go-back-button ${className || ''}`} 
      onClick={handleGoBack}
    >
      <ChevronLeft className="h-5 w-5 mr-1" /> 
      Back
    </Button>
  );
};

export default GoBackButton;
