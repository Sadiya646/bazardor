
interface TickerItem {
  emoji: string;
  name: string;
  price: string | number;
  change: string;
  changeType: 'up' | 'down' | 'flat';
}

interface PriceTickerProps {
  items: TickerItem[];
}

function formatPrice(price: string | number) {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return String(price);
  }

  return `${value.toLocaleString('bn-BD')} টাকা`;
}

export default function PriceTicker({ items }: PriceTickerProps) {
  if (!items.length) return null;

  return (
    <div className="w-full overflow-hidden border-y border-emerald-700 bg-emerald-800 text-sm leading-normal text-white">
      <div className="ticker-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center py-2"
            aria-hidden={copy === 1}
          >
            {items.map((item, index) => (
              <div
                key={`${copy}-${index}`}
                className="mx-5 flex shrink-0 items-center gap-2 whitespace-nowrap"
              >
                <span className="text-lg leading-none">
                  {item.emoji}
                </span>

                <span className="font-medium">
                  {item.name}
                </span>

                <span className="text-emerald-200">
                  {formatPrice(item.price)}
                </span>

                <span
                  className={
                    item.changeType === 'up'
                      ? 'text-green-300'
                      : item.changeType === 'down'
                        ? 'text-red-300'
                        : 'text-gray-300'
                  }
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
