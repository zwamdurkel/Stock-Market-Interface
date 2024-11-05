export function OrderDescription({
  orderInfo: { orderType, orderDuration, quantity, priceRange },
  className,
}) {
  return (
    <div className={className}>
      <p className="text-muted-foreground">
        {orderType === 'buy' ? 'Buy' : 'Sell'} <span className="font-bold">{quantity}</span> shares
        of <span className="font-bold">TSM</span> when the price is
      </p>
      <p className="text-muted-foreground">
        between <span className="font-bold">{priceRange[0]}</span> and{' '}
        <span className="font-bold">{priceRange[1]}</span>
      </p>
      <p className="font-bold text-muted-foreground">
        <span className="font-normal">until </span>{' '}
        {orderDuration === 'day' ? 'the end of the trading day' : 'canceled'}
      </p>
    </div>
  );
}
