import React, { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/formatters';
import { useStore } from '@/store/useStore';

export function SliderInput({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step = 1, 
  isCurrency = false,
  symbol = ''
}) {
  const { currency } = useStore();
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState('');

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(isCurrency ? formatCurrency(value, currency) : `${value}${symbol}`);
    }
  }, [value, isFocused, isCurrency, currency, symbol]);

  const handleInputChange = (e) => {
    const rawVal = e.target.value.replace(/[^0-9.]/g, '');
    if ((rawVal.match(/\./g) || []).length > 1) return;
    
    setLocalValue(rawVal);
    
    const numVal = parseFloat(rawVal);
    if (!isNaN(numVal)) {
      if (numVal > max) {
        onChange(max);
      } else {
        onChange(numVal);
      }
    } else {
      onChange(0);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numVal = parseFloat(localValue.replace(/[^0-9.]/g, ''));
    if (isNaN(numVal) || numVal < min) {
      onChange(min);
    } else if (numVal > max) {
      onChange(max);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setLocalValue(value.toString());
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <div className="relative">
          <input
            type="text"
            value={localValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-32 text-right bg-secondary border-none rounded-md px-3 py-1.5 text-foreground font-semibold focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
      </div>
      <div className="relative w-full h-2 bg-secondary rounded-full">
        <div 
          className="absolute h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>{isCurrency ? formatCurrency(min, currency) : `${min}${symbol}`}</span>
        <span>{isCurrency ? formatCurrency(max, currency) : `${max}${symbol}`}</span>
      </div>
    </div>
  );
}
