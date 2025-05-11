
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GoBackButton from '@/components/common/GoBackButton';

const NotFound = () => {
  return (
    <div className="container max-w-lg mx-auto flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 text-center">
      <div className="glass-form p-10 w-full">
        <h1 className="text-4xl font-bold mb-2 text-gold">404</h1>
        <h2 className="text-2xl font-semibold mb-6 text-navy">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <GoBackButton className="w-full justify-center" />
          <Button asChild className="gold-gradient text-navy w-full">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
