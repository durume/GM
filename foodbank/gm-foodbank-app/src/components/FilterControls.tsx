import type { DonorType } from '../types/donor';

interface FilterControlsProps {
  selectedType: DonorType;
  onFilterChange: (type: DonorType) => void;
  donorCounts: {
    government: number;
    corporate: number;
    individual: number;
    total: number;
  };
  mapActions: {
    zoomToType: (type: string) => void;
    fitAllMarkers: () => void;
  } | null;
}

const FilterControls = ({ selectedType, onFilterChange, donorCounts, mapActions }: FilterControlsProps) => {
  const filterButtons: { type: DonorType; label: string; count: number }[] = [
    { type: 'All', label: '전체 후원자', count: donorCounts.total },
    { type: 'Government', label: '정부/공공기관', count: donorCounts.government },
    { type: 'Corporate', label: '기업', count: donorCounts.corporate },
    { type: 'Individual', label: '개인', count: donorCounts.individual },
  ];

  const handleFilterClick = (type: DonorType) => {
    // Change the filter
    onFilterChange(type);

    // Zoom to the selected type (if map actions are available)
    if (mapActions) {
      if (type === 'All') {
        mapActions.fitAllMarkers();
      } else {
        mapActions.zoomToType(type);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        padding: '12px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        flexWrap: 'wrap',
      }}
    >
      {filterButtons.map(({ type, label, count }) => (
        <button
          key={type}
          onClick={() => handleFilterClick(type)}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedType === type ? '#3B82F6' : '#F3F4F6',
            color: selectedType === type ? 'white' : '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            if (selectedType !== type) {
              e.currentTarget.style.backgroundColor = '#E5E7EB';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedType !== type) {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }
          }}
        >
          <span>{label}</span>
          <span
            style={{
              backgroundColor: selectedType === type ? 'rgba(255,255,255,0.3)' : '#D1D5DB',
              padding: '2px 6px',
              borderRadius: '10px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
