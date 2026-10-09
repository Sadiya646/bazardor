
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
  if (items.length === 0) return null;

  return (
    <div className="overflow-hidden border-y border-emerald-700 bg-emerald-800 py-2 text-sm text-white">
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item, index) => (
              <div
                key={`${copy}-${index}`}
                className="mx-6 flex shrink-0 items-center gap-2 whitespace-nowrap"
              >
                <span>{item.emoji}</span>

                <span className="font-medium">
                  {item.name}
                </span>

                <span className="text-emerald-200">
                  {item.price}
                </span>

                <span
                  className={`rounded px-1 text-xs ${
                    item.changeType === 'up'
                      ? 'text-green-300'
                      : item.changeType === 'down'
                        ? 'text-red-300'
                        : 'text-gray-300'
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
