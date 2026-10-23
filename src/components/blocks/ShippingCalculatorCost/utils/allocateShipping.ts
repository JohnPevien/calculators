export interface Item {
  name: string;
  cost: number | string;
  qty: number | string;
}

export interface AllocatedItem {
  name: string;
  cost: number;
  qty: number;
  share: number;
  totalWithShipping: number;
  ratioPct: number;
}

export function allocateShipping(items: Item[], shippingFee: number): AllocatedItem[] {
  const numericItems = items.map(i => {
    const cost = Number(i.cost) || 0;
    const qty = Number(i.qty) || 1;
    return { name: i.name, cost, qty };
  });
  const totalCost = numericItems.reduce((sum, item) => sum + item.cost * item.qty, 0);
  // Largest remainder: floor each share to cents, then give leftover cents to
  // the largest fractional parts so shares always sum to exactly shippingFee.
  const feeCents = Math.round(shippingFee * 100);
  const rawCents = numericItems.map(item =>
    totalCost > 0 ? ((item.cost * item.qty) / totalCost) * feeCents : 0
  );
  const shareCents = rawCents.map(c => Math.floor(c));
  // No proportional basis when nothing was bought: leave shares at zero.
  if (totalCost > 0) {
    let leftover = feeCents - shareCents.reduce((sum, c) => sum + c, 0);
    const byFractionDesc = rawCents
      .map((_, i) => i)
      .sort((a, b) => rawCents[b] - shareCents[b] - (rawCents[a] - shareCents[a]));
    for (const i of byFractionDesc) {
      if (leftover <= 0) break;
      shareCents[i] += 1;
      leftover -= 1;
    }
  }
  return numericItems.map((item, i) => {
    const baseCost = item.cost * item.qty;
    const share = shareCents[i] / 100;
    return {
      name: item.name,
      cost: item.cost,
      qty: item.qty,
      share,
      totalWithShipping: Number((baseCost + share).toFixed(2)),
      ratioPct: totalCost > 0 ? Number(((baseCost / totalCost) * 100).toFixed(2)) : 0,
    };
  });
}
