'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ArrowDownToLine, ArrowUpToLine, ChevronLeft, DollarSign } from 'lucide-react';

import { useState } from 'react';

export function InequalityVersion({ currPrice, onRangeChange }) {
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  return (
    <>
      <div className="flex justify-between">
        <Label htmlFor="lowerBound" className="inline-block">
          Lower Bound
        </Label>
        <Label>Price</Label>
        <Label htmlFor="upperbound" className="inline-block">
          Upper Bound
        </Label>
      </div>
      <div className="my-1 flex items-center gap-2">
        <div className="relative flex">
          <Input
            id="lowerBound"
            type="number"
            max={priceRange[1]}
            step={0.001}
            value={priceRange[0]}
            className="[appearance:textfield] invalid:border-red-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={(e) => {
              setPriceRange([e.target.value, priceRange[1]]);
              onRangeChange([e.target.value, priceRange[1]]);
            }}
          />
          <Button
            onClick={() => {
              onRangeChange([0, priceRange[1]]);
              setPriceRange([0, priceRange[1]]);
            }}
            variant="ghost"
            className="absolute right-0 w-8"
          >
            <ArrowDownToLine className="inline-block" />
          </Button>
        </div>
        <ChevronLeft className="inline-block" size={36} />
        <div className="basis-1/4 font-mono font-bold" suppressHydrationWarning>
          {parseFloat(currPrice).toFixed(3)}
        </div>
        <ChevronLeft className="inline-block" size={36} />
        <div className="relative flex">
          <Input
            id="upper"
            type={priceRange[1] === Infinity ? 'text' : 'number'}
            min={priceRange[0]}
            step={0.001}
            value={priceRange[1]}
            className="[appearance:textfield] invalid:border-red-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={(e) => {
              setPriceRange([priceRange[0], e.target.value]);
              onRangeChange([priceRange[0], e.target.value]);
            }}
          />
          <Button
            onClick={() => {
              onRangeChange([priceRange[0], Infinity]);
              setPriceRange([priceRange[0], Infinity]);
            }}
            variant="ghost"
            className="absolute right-0 w-8"
          >
            <ArrowUpToLine className="inline-block" />
          </Button>
        </div>
      </div>
    </>
  );
}
