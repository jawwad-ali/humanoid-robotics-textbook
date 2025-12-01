"use client"

import React, { useEffect } from "react";

export function Chat() {
  const [data, setData] = React.useState<null | Object>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const getData = async () => {
      try {
        const response = await fetch('api/health');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isMounted) {
          setError(error instanceof Error ? error.message : 'Failed to fetch');
          setLoading(false);
        }
      }
    };
    
    getData();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-52px)] bg-background">
      <h1>Hello world</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
