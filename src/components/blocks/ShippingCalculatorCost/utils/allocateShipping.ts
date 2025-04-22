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
  return numericItems.map(item => {
    const baseCost = item.cost * item.qty;
    const rawShare = totalCost > 0 ? (baseCost / totalCost) * shippingFee : 0;
    const share = Math.round(rawShare * 100) / 100;
    return {
      name: item.name,
      cost: item.cost,
      qty: item.qty,
      share,
      totalWithShipping: Number((baseCost + share).toFixed(2)),
      ratioPct: Number(((baseCost / totalCost) * 100).toFixed(2)),
    };
  });
}
