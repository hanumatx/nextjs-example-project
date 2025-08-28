"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BusSearchFormProps {
  onSearch: (busNumber: string) => void;
  error?: string;
  isLoading?: boolean;
}

const BusSearchForm: React.FC<BusSearchFormProps> = ({ onSearch, error, isLoading }) => {
  const [busNumber, setBusNumber] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous input error
    setInputError('');
    
    // Validate input
    if (!busNumber.trim()) {
      setInputError('Please enter a bus number');
      return;
    }
    
    // Call the search function
    onSearch(busNumber.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusNumber(e.target.value);
    // Clear input error when user starts typing
    if (inputError) {
      setInputError('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="busNumber" className="text-sm font-medium text-foreground">
            Enter Bus Number
          </Label>
          <Input
            id="busNumber"
            type="text"
            value={busNumber}
            onChange={handleInputChange}
            placeholder="e.g., 101, 102, 103..."
            className="w-full"
            disabled={isLoading}
          />
          {inputError && (
            <p className="text-sm text-red-600">{inputError}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Tracking...' : 'Track Bus'}
        </Button>
        
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </form>
      
      <div className="mt-6 p-4 bg-muted rounded-md">
        <h3 className="text-sm font-medium text-foreground mb-2">Available Bus Numbers:</h3>
        <p className="text-xs text-muted-foreground">
          101, 102, 103, 104, 105, 106, 107, 108, 109, 110
        </p>
      </div>
    </div>
  );
};

export default BusSearchForm;
