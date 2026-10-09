'use client';

import { useEffect, useState } from 'react';
import PriceTicker from '@/components/PriceTicker';
import { fetchProducts } from '@/lib/api';
import type { Product, ChangeType } from '@/types';

interface TickerItem {
  emoji: string;
  name: string;
  price: string | number;
  change: string;
  changeType: ChangeType;
}

function getChangeInfo(change: Product['change']) {
  if (typeof change === 'object' && change !== null) {
    const type: ChangeType =
      change.dir === 'up'
        ? 'up'
        : change.dir === 'down'
          ? 'down'
          : 'flat';

    const symbol =
      type === 'up' ? '▲' : type === 'down' ? '▼' : '—';

    return { text: `${symbol} ${change.pct}%`, type };
  }

  const text = String(change ?? '—');

  const type: ChangeType = text.includes('▲')
    ? 'up'
    : text.includes('▼')
      ? 'down'
      : 'flat';

  return { text, type };
}

export default function GlobalPriceTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadTicker() {
      try {
        const products = await fetchProducts();

        if (!active) return;

        const tickerItems = products.map((product) => {
          const info = getChangeInfo(product.change);

          return {
            emoji: product.emoji || product.icon || '🛒',
            name: product.nameBn ?? product.name,
            price:
              product.currentPrice ??
              product.current_price ??
              product.price ??
              product.rate ??
              '—',
            change: info.text,
            changeType: info.type,
          };
        });

        setItems(tickerItems);
      } catch (error: unknown) {
        console.error('Price ticker load failed:', error);
      }
    }

    void loadTicker();

    return () => {
      active = false;
    };
  }, []);

  if (items.length === 0) return null;

  return <PriceTicker items={items} />;
}