
import React, { useState, useEffect } from 'react';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
}

const CryptoWidget: React.FC = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([
    { symbol: 'BTC', price: 62547, change24h: 2.3 },
    { symbol: 'ETH', price: 3162, change24h: -0.7 }
  ]);
  
  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoPrices(prevPrices => 
        prevPrices.map(crypto => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() * 0.01 - 0.005)),
          change24h: crypto.change24h + (Math.random() * 0.2 - 0.1)
        }))
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-3">
      <h3 className="text-sm font-medium text-gray-300 mb-2">Crypto Prices</h3>
      <div className="space-y-2">
        {cryptoPrices.map((crypto) => (
          <div key={crypto.symbol} className="flex items-center justify-between">
            <div className="flex items-center">
              {crypto.symbol === 'BTC' ? (
                <Bitcoin size={16} className="text-yellow-500 mr-2" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-crypto-blue mr-2 flex items-center justify-center text-[8px]">Ξ</span>
              )}
              <span className="text-sm font-medium">{crypto.symbol}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">
                ${Math.floor(crypto.price).toLocaleString()}
              </span>
              <span 
                className={cn(
                  "text-xs flex items-center",
                  crypto.change24h >= 0 ? "text-crypto-green" : "text-crypto-red"
                )}
              >
                {crypto.change24h >= 0 ? (
                  <TrendingUp size={12} className="mr-1" />
                ) : (
                  <TrendingDown size={12} className="mr-1" />
                )}
                {crypto.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoWidget;
