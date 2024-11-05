'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

let dragging = false;

const Slider = React.forwardRef(({ className, onPointerMove, ...props }, forwardedRef) => {
  const ref = React.useRef(null);

  React.useImperativeHandle(forwardedRef, () => ref.current);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-6 w-full grow overflow-hidden rounded-md bg-primary/20">
        <SliderPrimitive.Range
          className="absolute h-full bg-primary"
          onPointerDown={(e) => {
            e.preventDefault();
            dragging = true;
            e.target.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            e.preventDefault();
            if (dragging) onPointerMove(e);
          }}
          onPointerUp={(e) => {
            dragging = false;
            e.target.releasePointerCapture(e.pointerId);
          }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-8 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      <SliderPrimitive.Thumb className="block h-8 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
