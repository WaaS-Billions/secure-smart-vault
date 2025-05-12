
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const ApplicationSubmitted = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="glass-form text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-500 h-16 w-16" />
            </div>
            <CardTitle className="text-2xl text-navy">Application Submitted!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Thank you for your interest in becoming a Daily Wallet merchant. We've received your application and our team will review it shortly.
            </p>
            <p className="mb-2">
              You should receive a confirmation email with the next steps. We typically respond within 2-3 business days.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-gold text-navy hover:bg-gold/90">
              <Link to="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationSubmitted;
