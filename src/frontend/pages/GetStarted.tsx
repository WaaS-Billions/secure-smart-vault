
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GoBackButton from '@/components/common/GoBackButton';

const GetStarted = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <GoBackButton />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gold">Welcome to Daily Wallet</h1>
        <p className="text-xl mb-8 text-white/90">
          Choose how you want to use our services
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-form flex flex-col">
            <CardHeader>
              <CardTitle className="text-navy text-2xl">For Merchants</CardTitle>
              <CardDescription>
                Accept borderless payments and integrate our services with your business
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Accept crypto payments from customers worldwide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>API integration for seamless commerce experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Automatic fiat conversion and settlement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Advanced reporting and analytics</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-gold text-navy hover:bg-gold/90">
                <Link to="/merchant/apply">Apply for Merchant Account</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-form flex flex-col">
            <CardHeader>
              <CardTitle className="text-navy text-2xl">For Personal Use</CardTitle>
              <CardDescription>
                Create a wallet to send, receive, and manage your funds
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Create a non-custodial smart wallet</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Send money to friends and family globally</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Buy and sell cryptocurrency easily</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span>Control your financial future</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-gold text-navy hover:bg-gold/90">
                <Link to="/wallet/create">Create Personal Wallet</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
