'use client';

import { useState, useEffect, useRef } from 'react';

import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Triangle, ArrowUpToLine, ArrowDownToLine, DollarSign } from 'lucide-react';

export function SliderVersion({ currPrice, onRangeChange }) {
  const [sliderValue, setSliderValue] = useState([0, Infinity]);
  const [sliderMinMax, setSliderMinMax] = useState([0, Infinity]);

  const currPriceRef = useRef(currPrice);

  const updateSlider = (ref) => {
    setSliderMinMax([parseInt(ref.current * 0.8), parseInt(ref.current * 1.2)]);
  };

  useEffect(() => {
    currPriceRef.current = currPrice;
  }, [currPrice]);

  useEffect(() => {
    updateSlider(currPriceRef);
    const timer = setInterval(() => {
      updateSlider(currPriceRef);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const handleRangeChange = (value) => {
    setSliderValue(value);
    onRangeChange(value);
  };

  const ref = useRef(null);

  return (
    <>
      <div className="my-4 flex justify-between gap-4">
        <div className="">
          <Label htmlFor="lower" className="inline-block w-full">
            Lower Bound
          </Label>
          <div className="flex gap-1">
            <Button onClick={() => handleRangeChange([0, sliderValue[1]])} variant="outline">
              <ArrowDownToLine className="inline-block" />
            </Button>
            <Input
              id="lower"
              type="price"
              value={sliderValue[0]}
              className="inline-block w-2/3"
              onChange={(e) => handleRangeChange([e.target.value, sliderValue[1]])}
            />
          </div>
        </div>
        <div className="text-right">
          <Label htmlFor="upper" className="inline-block w-full">
            Upper Bound
          </Label>
          <div className="flex justify-end gap-1">
            <Input
              id="upper"
              type="price"
              value={sliderValue[1]}
              className="inline-block w-2/3"
              onInput={(e) => handleRangeChange([sliderValue[0], e.target.value])}
            />
            <Button onClick={() => handleRangeChange([sliderValue[0], Infinity])} variant="outline">
              <ArrowUpToLine className="inline-block" />
            </Button>
          </div>
        </div>
      </div>
      <div className="my-2 flex justify-between">
        <span>{sliderMinMax[0]}</span>
        <p>
          <DollarSign className="inline-block" size={16} />{' '}
          <span className="font-mono font-bold" suppressHydrationWarning>
            {parseFloat(currPrice).toFixed(3)}
          </span>
        </p>
        <span>{sliderMinMax[1]}</span>
      </div>
      <Slider
        ref={ref}
        value={sliderValue}
        min={sliderMinMax[0]}
        max={sliderMinMax[1]}
        step={0.01}
        onPointerMove={(e) => {
          let change =
            (e.movementX / ref.current.getBoundingClientRect().width) *
            (sliderMinMax[1] - sliderMinMax[0]);
          handleRangeChange([
            parseFloat(sliderValue[0] - -change).toFixed(2),
            parseFloat(sliderValue[1] - -change).toFixed(2),
          ]);
        }}
        onValueChange={handleRangeChange}
      />
      <div
        className="mt-2 flex justify-center text-zinc-300 transition-transform duration-1000"
        style={{
          transform: `translateX(${((currPrice - sliderMinMax[0]) / (sliderMinMax[1] - sliderMinMax[0])) * 100 - 50}%)`,
        }}
      >
        <Triangle size={16} />
      </div>
    </>
  );
}
