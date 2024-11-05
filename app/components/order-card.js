'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { DollarSign } from 'lucide-react';

import { useState, useEffect, cloneElement } from 'react';
import { OrderDescription } from './order-description';

export function OrderCard({ children, displayOrderDescription = false }) {
  const [currPrice, setCurrPrice] = useState(Math.random() * 300 + 11);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [orderType, setOrderType] = useState('buy');
  const [orderDuration, setOrderDuration] = useState('day');
  const [quantity, setQuantity] = useState(1);

  const { toast } = useToast();

  const handleRangeValue = (value) => {
    setPriceRange(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let newPrice = Math.random() * 0.004 * currPrice - 0.002 * currPrice + currPrice;
      setCurrPrice(newPrice);
    }, 1000);
  }, [currPrice]);

  const getEstimate = () => {
    if (currPrice >= priceRange[0] && currPrice <= priceRange[1]) {
      return (currPrice * quantity).toFixed(2);
    }

    if (currPrice < priceRange[0]) {
      return (priceRange[0] * quantity).toFixed(2);
    }

    if (currPrice > priceRange[1]) {
      return (priceRange[1] * quantity).toFixed(2);
    }
  };

  return (
    <Card className="w-1/3 2xl:w-1/4">
      <CardHeader>
        <CardTitle>Place Order</CardTitle>
        <CardDescription className="text-foreground">
          ADR on Taiwan Semiconductor Manufacturing Co
        </CardDescription>
        <CardDescription>TSM | US8740391003 | New York Stock Exchange</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="buy" onValueChange={setOrderType}>
          <div className="flex gap-4">
            <TabsList className="">
              <TabsTrigger value="buy" className="data-[state=active]:bg-green-500">
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-red-500">
                Sell
              </TabsTrigger>
            </TabsList>
            <Select defaultValue="day" onValueChange={setOrderDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <HoverCard>
                  <HoverCardTrigger>
                    <SelectItem value="day">Day Order</SelectItem>
                  </HoverCardTrigger>
                  <HoverCardContent side="left" sideOffset={8}>
                    <p className="font-bold">Day Order</p>
                    <p>Order expires at the end of the trading day</p>
                  </HoverCardContent>
                </HoverCard>
                <HoverCard>
                  <HoverCardTrigger>
                    <SelectItem value="GTC">Until Canceled</SelectItem>
                  </HoverCardTrigger>
                  <HoverCardContent side="left" sideOffset={8}>
                    <p className="font-bold">Until Canceled</p>
                    <p>Order remains active until canceled</p>
                  </HoverCardContent>
                </HoverCard>
              </SelectContent>
            </Select>
          </div>
          <Separator className="my-4" />
          {children &&
            cloneElement(children, { currPrice, onRangeChange: handleRangeValue, orderType })}
          <Separator className="my-4" />
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            defaultValue={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          {/* <Separator className="my-4" /> */}
          {displayOrderDescription && (
            <OrderDescription
              className="pt-4"
              orderInfo={{ orderType, orderDuration, quantity, priceRange }}
            ></OrderDescription>
          )}
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="flex items-end justify-between gap-4">
          <div>
            <Label htmlFor="total">Estimated Total</Label>
            <div className="flex items-center">
              <DollarSign className="absolute translate-x-1/2" size={16} />
              <Input
                id="total"
                type="price"
                className="pl-7 disabled:opacity-100"
                value={getEstimate()}
                disabled
              />
            </div>
          </div>
          <Button
            onClick={() => {
              toast({
                title: 'Order Placed',
                description: `${orderType === 'buy' ? 'Buying' : 'Selling'} ${quantity} shares of TSM When the price is between ${priceRange[0]} and ${priceRange[1]}`,
                action: <ToastAction altText="Cancel Order">Cancel</ToastAction>,
                duration: 5000,
              });
            }}
          >
            Place Order
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
