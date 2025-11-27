import { useState, useEffect, useMemo } from 'react';

export function useEnterprises() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('./data/enterprises.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const enterprises = data?.enterprises || [];
  const metadata = data?.metadata || {};

  // Calculate statistics
  const stats = useMemo(() => {
    if (!enterprises.length) return null;

    // Count by type
    const typeCount = enterprises.reduce((acc, ent) => {
      acc[ent.type] = (acc[ent.type] || 0) + 1;
      return acc;
    }, {});

    // Count by region
    const regionCount = enterprises.reduce((acc, ent) => {
      acc[ent.region] = (acc[ent.region] || 0) + 1;
      return acc;
    }, {});

    // Type data for charts
    const typeData = Object.entries(typeCount).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);

    // Region data for charts
    const regionData = Object.entries(regionCount).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);

    return {
      total: enterprises.length,
      typeCount,
      regionCount,
      typeData,
      regionData
    };
  }, [enterprises]);

  return {
    enterprises,
    metadata,
    stats,
    loading,
    error
  };
}

export default useEnterprises;
