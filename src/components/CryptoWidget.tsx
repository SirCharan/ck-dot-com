import React, { useState, useEffect, useRef } from 'react';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';

interface CryptoPrice {
  symbol: string;
  id: string;
  price: number;
  change24h: number;
  sparkline: number[];
}

const COINGECKO_PRICE_API =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true';
const COINGECKO_CHART_API = (id: string) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`;

const MiniSparkline = ({ data, positive }: { data: number[]; positive: boolean }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 48;
  const height = 24;
  const points = data
    .filter((_, i) => i % Math.ceil(data.length / 12) === 0 || i === data.length - 1)
    .map((v, i, arr) => {
      const x = (i / (arr.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 2) - 1;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="flex-shrink-0" aria-hidden>
      <polyline
        points={points}
        fill="none"
        stroke={positive ? '#10B981' : '#EF4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
    </svg>
  );
};

const PriceWithFlair = ({
  price,
  prevPrice,
  change24h,
}: {
  price: number;
  prevPrice: number;
  change24h: number;
}) => {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPriceRef = useRef(0);

  useEffect(() => {
    if (prevPriceRef.current > 0 && price > 0 && price !== prevPriceRef.current) {
      setFlash(price > prevPriceRef.current ? 'up' : 'down');
      const t = setTimeout(() => setFlash(null), 600);
      return () => clearTimeout(t);
    }
    prevPriceRef.current = price;
  }, [price]);

  return (
    <div className="flex flex-col items-end gap-0.5">
      <span
        className={cn(
          'text-sm font-mono font-medium transition-all duration-300 px-1.5 py-0.5 rounded',
          flash === 'up' && 'animate-price-flash-up',
          flash === 'down' && 'animate-price-flash-down'
        )}
      >
        ${price ? Math.floor(price).toLocaleString() : '--'}
      </span>
      <span
        className={cn(
          'text-xs flex items-center font-mono',
          change24h >= 0 ? 'text-emerald-500' : 'text-red-500'
        )}
      >
        {change24h >= 0 ? (
          <TrendingUp size={12} className="mr-1" strokeWidth={2} />
        ) : (
          <TrendingDown size={12} className="mr-1" strokeWidth={2} />
        )}
        {change24h ? change24h.toFixed(2) : '--'}%
      </span>
    </div>
  );
};

const CryptoWidget: React.FC = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', id: 'bitcoin', price: 0, change24h: 0, sparkline: [] },
    { symbol: 'ETH', id: 'ethereum', price: 0, change24h: 0, sparkline: [] },
  ]);

  const fetchPrices = async () => {
    try {
      const [priceRes, btcChartRes, ethChartRes] = await Promise.all([
        fetch(COINGECKO_PRICE_API),
        fetch(COINGECKO_CHART_API('bitcoin')),
        fetch(COINGECKO_CHART_API('ethereum')),
      ]);
      const priceData = await priceRes.json();
      const btcChart = await btcChartRes.json();
      const ethChart = await ethChartRes.json();

      const btcPrices = (btcChart.prices || []).map((p: [number, number]) => p[1]);
      const ethPrices = (ethChart.prices || []).map((p: [number, number]) => p[1]);

      setCryptoPrices([
        {
          symbol: 'BTC',
          id: 'bitcoin',
          price: priceData.bitcoin?.usd ?? 0,
          change24h: priceData.bitcoin?.usd_24h_change ?? 0,
          sparkline: btcPrices,
        },
        {
          symbol: 'ETH',
          id: 'ethereum',
          price: priceData.ethereum?.usd ?? 0,
          change24h: priceData.ethereum?.usd_24h_change ?? 0,
          sparkline: ethPrices,
        },
      ]);
    } catch {
      // Silent fail for price fetches
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-rajdhani text-xs uppercase tracking-widest text-gray-400">Crypto Prices</h3>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-500/80">LIVE</span>
        </span>
      </div>
      <div className="space-y-3">
        {cryptoPrices.map((crypto) => (
          <div key={crypto.symbol} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {crypto.symbol === 'BTC' ? (
                <Bitcoin size={16} className="text-yellow-500 flex-shrink-0" strokeWidth={2} />
              ) : (
                <span className="w-4 h-4 rounded-full bg-[var(--neon-cyan)]/30 flex items-center justify-center text-[8px] flex-shrink-0 text-[var(--neon-cyan)]">Ξ</span>
              )}
              <span className="font-mono text-xs font-medium flex-shrink-0">{crypto.symbol}</span>
              <MiniSparkline data={crypto.sparkline} positive={crypto.change24h >= 0} />
            </div>
            <PriceWithFlair
              price={crypto.price}
              prevPrice={0}
              change24h={crypto.change24h}
            />
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default CryptoWidget;
