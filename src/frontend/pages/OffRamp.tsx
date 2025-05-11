
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { QuoteDisplay } from '@/components/ramp/QuoteDisplay';
import TransactionReceipt from '@/frontend/components/ramp/TransactionReceipt';
import { useToast } from '@/components/ui/use-toast';

import {
  Card,
  CardContent,
  CardDescription,
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, ArrowRight } from 'lucide-react';

// Define form schema
const offRampSchema = z.object({
  amount: z.string().min(1).transform((val) => parseFloat(val)),
  cryptoAsset: z.string().min(1),
  fiatCurrency: z.enum(['USD', 'EUR', 'GBP']),
  paymentDetails: z.string().min(10, "Please enter complete payment details"),
});

type OffRampFormValues = z.infer<typeof offRampSchema>;

const OffRamp = () => {
  const { toast } = useToast();
  const { address } = useWallet();
  const [quote, setQuote] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transaction, setTransaction] = useState<any>(null);

  const form = useForm<OffRampFormValues>({
    resolver: zodResolver(offRampSchema),
    defaultValues: {
      amount: '',
      cryptoAsset: 'ETH',
      fiatCurrency: 'USD',
      paymentDetails: '',
    },
  });

  const { watch, handleSubmit } = form;
  const amount = parseFloat(watch('amount') || '0');
  const fiatCurrency = watch('fiatCurrency');
  const cryptoAsset = watch('cryptoAsset');

  // Fetch quote when inputs change (with debounce in real app)
  const { isLoading: isLoadingQuote } = useQuery({
    queryKey: ['rampQuote', amount, fiatCurrency, cryptoAsset, 'off_ramp'],
    queryFn: async () => {
      if (!amount || amount <= 0) return null;
      
      try {
        const response = await axios.post('/api/ramp/quote', {
          type: 'off_ramp',
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
  
  const onSubmit = async (data: OffRampFormValues) => {
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
      // Submit the off-ramp request
      const response = await axios.post('/api/ramp/offramp', {
        ...data,
        walletAddress: address,
      });
      
      toast({
        title: "Off-ramp initiated",
        description: "Your transaction has been created successfully. You will receive funds in 2-3 business days.",
      });
      
      // Set transaction data for receipt
      setTransaction({
        id: response.data.id || `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        date: new Date().toISOString(),
        amount: data.amount,
        cryptoAsset: data.cryptoAsset,
        fiatAmount: quote?.fiatAmount || data.amount * (data.cryptoAsset === 'ETH' ? 2500 : 50000),
        fiatCurrency: data.fiatCurrency,
        status: 'completed',
        paymentDetails: data.paymentDetails,
        txHash: response.data.txHash || `0x${Math.random().toString(36).substring(2, 66)}`,
      });
      
      // Reset form
      form.reset();
      setQuote(null);
    } catch (error) {
      console.error('Error creating off-ramp:', error);
      toast({
        title: "Error",
        description: "Failed to create off-ramp transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Sell Crypto</h1>
      
      {transaction ? (
        <div className="space-y-6">
          <TransactionReceipt transaction={transaction} />
          <div className="flex justify-center">
            <Button 
              onClick={() => setTransaction(null)}
              variant="outline"
            >
              Create New Transaction
            </Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Off-Ramp</CardTitle>
            <CardDescription>Convert crypto to fiat</CardDescription>
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
                          <Input type="number" placeholder="0.00" min="0.0001" step="0.0001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                </div>
                
                <FormField
                  control={form.control}
                  name="fiatCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receive Currency</FormLabel>
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
                
                <FormField
                  control={form.control}
                  name="paymentDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your bank account details or payment information"
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include account number, routing number, and any other required information
                      </FormDescription>
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
                    type="offramp" 
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
                        Sell Crypto <ArrowRight className="ml-2 h-4 w-4" />
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
      )}
    </div>
  );
};

export default OffRamp;
