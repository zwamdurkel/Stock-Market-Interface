import { ThemeToggle } from './components/theme-toggle';
import { OrderCard } from './components/order-card';
import { SliderVersion } from './components/slider-version';
import { OriginalVersion } from './components/original-version';
import { InequalityVersion } from './components/inequality-version';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <ThemeToggle />
      <main className="row-start-2 flex items-center justify-center gap-8 sm:items-start">
        <OrderCard displayOrderDescription>
          <OriginalVersion />
        </OrderCard>
        <OrderCard displayOrderDescription>
          <SliderVersion />
        </OrderCard>
        <OrderCard displayOrderDescription>
          <InequalityVersion />
        </OrderCard>
      </main>
    </div>
  );
}
