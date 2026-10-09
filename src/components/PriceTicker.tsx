import React from 'react';

interface TickerItem {
  emoji: string;
  name: string;
  price: string;
  change: string;
  changeType: 'up' | 'down' | 'flat';
}

interface PriceTickerProps {
  items: TickerItem[];
}

export default function PriceTicker({ items }: PriceTickerProps) {
  return (
    <div className="bg-emerald-800 text-white overflow-hidden py-2 text-sm border-y border-emerald-700">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.concat(items).map((item, index) => (
          <div key={index} className="flex items-center mx-6 space-x-2">
            <span>{item.emoji}</span>
            <span className="font-medium">{item.name}</span>
            <span className="text-emerald-200">{item.price}</span>
            <span className={`text-xs px-1 rounded ${
              item.changeType === 'up' ? 'text-green-300' : item.changeType === 'down' ? 'text-red-300' : 'text-gray-300'
            }`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}