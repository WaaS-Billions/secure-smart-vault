
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { QuoteDisplay } from '@/components/ramp/QuoteDisplay';
import { useToast } from '@/components/ui/use-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, ArrowRight } from 'lucide-react';

// Define form schema
const onRampSchema = z.object({
  amount: z.string().min(1).transform((val) => parseFloat(val)),
  fiatCurrency: z.enum(['USD', 'EUR', 'GBP']),
  cryptoAsset: z.string().min(1),
  paymentMethod: z.enum(['bank_transfer', 'credit_card', 'debit_card']),
});

type OnRampFormValues = z.infer<typeof onRampSchema>;

const OnRamp = () => {
  const { toast } = useToast();
  const { address } = useWallet();
  const [quote, setQuote] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OnRampFormValues>({
    resolver: zodResolver(onRampSchema),
    defaultValues: {
      amount: '',
      fiatCurrency: 'USD',
      cryptoAsset: 'ETH',
      paymentMethod: 'credit_card',
    },
  });

  const { watch, handleSubmit } = form;
  const amount = parseFloat(watch('amount') || '0');
  const fiatCurrency = watch('fiatCurrency');
  const cryptoAsset = watch('cryptoAsset');

  // Fetch quote when inputs change (with debounce in real app)
  const { isLoading: isLoadingQuote } = useQuery({
    queryKey: ['rampQuote', amount, fiatCurrency, cryptoAsset],
    queryFn: async () => {
      if (!amount || amount <= 0) return null;
      
      try {
        const response = await axios.post('/api/ramp/quote', {
          type: 'on_ramp',
          amount,
          fiatCurrency,
          cryptoAsset,
        });
        
        setQuote(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
      }
    },
    enabled: amount > 0,
  });
  
  const onSubmit = async (data: OnRampFormValues) => {
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit the on-ramp request
      const response = await axios.post('/api/ramp/onramp', {
        ...data,
        walletAddress: address,
      });
      
      // Handle redirect to payment provider or show success
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        toast({
          title: "On-ramp initiated",
          description: "Your transaction has been created successfully",
        });
      }
    } catch (error) {
      console.error('Error creating on-ramp:', error);
      toast({
        title: "Error",
        description: "Failed to create on-ramp transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Buy Crypto</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>On-Ramp</CardTitle>
          <CardDescription>Convert fiat to crypto</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" min="1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fiatCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="cryptoAsset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crypto Asset</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select asset" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isLoadingQuote && amount > 0 && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2">Getting quote...</span>
                </div>
              )}
              
              {quote && (
                <QuoteDisplay 
                  quote={quote} 
                  type="onramp" 
                  fiatCurrency={fiatCurrency}
                  cryptoAsset={cryptoAsset}
                />
              )}
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || !quote || !address}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Processing
                    </>
                  ) : (
                    <>
                      Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              
              {!address && (
                <FormDescription className="text-center text-amber-500">
                  Please connect your wallet to complete this transaction
                </FormDescription>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnRamp;
