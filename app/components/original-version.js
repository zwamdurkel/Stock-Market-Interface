'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';

import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useEffect } from 'react';

export function OriginalVersion({ currPrice, onRangeChange, orderType }) {
  const [orderSubType, setOrderSubType] = useState('limit');
  const [stopLimit, setStopLimit] = useState([0, 0]);
  const [single, setSingle] = useState(0);

  useEffect(() => {
    if (orderSubType !== 'limit') {
      return;
    }
    if (orderType === 'buy') {
      onRangeChange([0, single]);
    }
    if (orderType === 'sell') {
      onRangeChange([single, Infinity]);
    }
  }, [single, orderSubType, orderType]);

  useEffect(() => {
    if (orderSubType !== 'stoploss') {
      return;
    }
    if (orderType === 'buy') {
      onRangeChange([single, Infinity]);
    }
    if (orderType === 'sell') {
      onRangeChange([0, single]);
    }
  }, [single, orderSubType, orderType]);

  const doStopLimit = (input) => {
    if (stopLimit[0] > stopLimit[1]) {
      onRangeChange([stopLimit[1], stopLimit[0]]);
    }

    if (stopLimit[0] < stopLimit[1]) {
      onRangeChange([stopLimit[0], stopLimit[1]]);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex basis-full items-center gap-2 font-bold" suppressHydrationWarning>
        <DollarSign className="inline-block" /> {parseFloat(currPrice).toFixed(3)}
      </div>
      <div className="flex grow basis-2/5 flex-col">
        <Label htmlFor="quantity" className="inline-block w-full">
          Order Type
        </Label>
        <Select
          defaultValue="limit"
          onValueChange={(e) => {
            if (e === 'market') onRangeChange([0, Infinity]);
            // else onRangeChange([0, 0]);
            setOrderSubType(e);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="limit">Limit</SelectItem>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="stoploss">Stop Loss</SelectItem>
            <SelectItem value="stoplimit">Stop Limit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex grow basis-2/5 flex-col">
        {
          {
            limit: (
              <>
                <Label htmlFor="limit" className="inline-block w-full">
                  Limit ($)
                </Label>
                <Input
                  id="limit"
                  type="number"
                  onChange={(e) => {
                    setSingle(e.target.value);
                  }}
                />
              </>
            ),
            market: <></>,
            stoploss: (
              <>
                <Label htmlFor="stopprice" className="inline-block w-full">
                  Stop Price ($)
                </Label>
                <Input
                  id="stopprice"
                  type="number"
                  onChange={(e) => {
                    setSingle(e.target.value);
                  }}
                />
              </>
            ),
            stoplimit: (
              <>
                <Label htmlFor="limit" className="inline-block w-full">
                  Limit ($)
                </Label>
                <Input
                  id="limit"
                  type="number"
                  step={0.001}
                  className="[appearance:textfield] invalid:border-red-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  min={orderType === 'buy' ? stopLimit[1] : 0}
                  max={orderType === 'buy' ? Infinity : stopLimit[1]}
                  onChange={(e) => {
                    setStopLimit([e.target.value, stopLimit[1]]);
                    doStopLimit();
                  }}
                />
                <Label htmlFor="stopprice" className="inline-block w-full pt-4">
                  Stop Price ($)
                </Label>
                <Input
                  id="stopprice"
                  type="number"
                  step={0.001}
                  className="[appearance:textfield] invalid:border-red-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  min={orderType === 'buy' ? 0 : stopLimit[0]}
                  max={orderType === 'buy' ? stopLimit[0] : Infinity}
                  onChange={(e) => {
                    setStopLimit([stopLimit[0], e.target.value]);
                    if (stopLimit[0] > e.target.value) {
                      onRangeChange([e.target.value, stopLimit[0]]);
                    }

                    if (stopLimit[0] < e.target.value) {
                      onRangeChange([stopLimit[0], e.target.value]);
                    }
                  }}
                />
              </>
            ),
          }[orderSubType]
        }
      </div>
    </div>
  );
}
