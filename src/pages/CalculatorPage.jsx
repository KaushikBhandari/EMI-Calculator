import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EmiCalculator } from '@/components/EmiCalculator';

export function CalculatorPage({ title, description, defaultPrincipal, defaultRate, defaultTenure, schema }) {
  return (
    <div className="flex flex-col items-center">
      <Helmet>
        <title>{title} | FinCal</title>
        <meta name="description" content={description} />
        {schema && (
          <script type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        )}
      </Helmet>

      <div className="text-center mt-8 mb-12">
        <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <EmiCalculator 
        defaultPrincipal={defaultPrincipal} 
        defaultRate={defaultRate} 
        defaultTenure={defaultTenure} 
      />
    </div>
  );
}
