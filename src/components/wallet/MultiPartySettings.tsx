
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface MultiPartySettingsProps {
  control: Control<any>;
  setValue: any;
  watch: any;
}

const MultiPartySettings = ({ control, setValue, watch }: MultiPartySettingsProps) => {
  // Modify the component to work with react-hook-form
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="signers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Signers (One Ethereum address per line)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="0x123...&#10;0x456...&#10;0x789..."
                rows={5}
                onChange={(e) => {
                  const addresses = e.target.value
                    .split('\n')
                    .map(addr => addr.trim())
                    .filter(Boolean)
                    .map(addr => ({ address: addr, name: "" }));
                  setValue("signers", addresses);
                }}
              />
            </FormControl>
            <p className="text-sm text-muted-foreground">
              Your address will be added automatically.
            </p>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="threshold"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Signature Threshold (How many signers are required)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                {...field}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    field.onChange(value);
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default MultiPartySettings;
