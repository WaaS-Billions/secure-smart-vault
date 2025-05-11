
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface WalletNameInputProps {
  control: Control<any>;
}

const WalletNameInput = ({ control }: WalletNameInputProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Wallet Name</FormLabel>
          <FormControl>
            <Input placeholder="My Smart Wallet" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default WalletNameInput;
