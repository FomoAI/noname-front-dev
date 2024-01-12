export function calculateDiscount(currentPrice, offeredPrice) {
    if(currentPrice === 0) return 0

    const difference = currentPrice - offeredPrice;
    const discountPercentage = (difference / currentPrice) * 100;

    return Number(discountPercentage.toFixed(0));
}
