
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface WalletTypeSelectorProps {
  control: Control<any>;
}

const WalletTypeSelector = ({ control }: WalletTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormItem className="space-y-1.5">
            <Label>Wallet Type</Label>
          </FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
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
                <RadioGroupItem value="multisig" id="multisig" />
                <Label htmlFor="multisig" className="cursor-pointer flex-1">
                  <div className="font-medium">Multi-Party Wallet</div>
                  <p className="text-sm text-muted-foreground">
                    Advanced security with multiple signers. Ideal for teams and organizations.
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default WalletTypeSelector;
