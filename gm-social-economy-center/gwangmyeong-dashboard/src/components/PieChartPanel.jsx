import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TYPE_CONFIG, PIE_COLORS, REGION_CONFIG } from '../constants';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const percentage = ((payload[0].value / payload[0].payload.total) * 100).toFixed(1);
    return (
      <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-100">
        <p className="font-medium text-gray-800">{payload[0].name}</p>
        <p className="text-gray-600">{payload[0].value}개 기업</p>
        <p className="text-gray-500 text-sm">{percentage}%</p>
      </div>
    );
  }
  return null;
};

export default function PieChartPanel({
  title,
  data,
  dataType = 'type',
  selectedValue,
  onSelect
}) {
  const getColor = (name, index) => {
    if (dataType === 'type') {
      return TYPE_CONFIG[name]?.color || PIE_COLORS[index % PIE_COLORS.length];
    }
    return REGION_CONFIG[name]?.color || PIE_COLORS[index % PIE_COLORS.length];
  };

  // Calculate total for percentage
  const total = data?.reduce((sum, item) => sum + item.value, 0) || 0;
  const dataWithTotal = data?.map(item => ({ ...item, total })) || [];

  // Handle click on pie slice
  const handleClick = (entry) => {
    if (onSelect) {
      // Toggle: if already selected, deselect (null)
      onSelect(selectedValue === entry.name ? null : entry.name);
    }
  };

  // Custom legend with clickable items and counts
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-col gap-1.5">
        {/* 전체 (All) button */}
        <button
          onClick={() => onSelect && onSelect(null)}
          className={`flex items-center justify-between px-2 py-1 rounded-md text-sm transition-all hover:bg-gray-100 ${
            selectedValue === null ? 'bg-gray-100 font-semibold' : ''
          }`}
        >
          <span className="text-gray-700">전체</span>
          <span className="text-gray-500 ml-2">{total}</span>
        </button>

        {payload.map((entry, index) => {
          const isSelected = selectedValue === entry.value;
          const itemData = data?.find(d => d.name === entry.value);
          return (
            <button
              key={`legend-${index}`}
              onClick={() => handleClick({ name: entry.value })}
              className={`flex items-center justify-between px-2 py-1 rounded-md text-sm transition-all hover:bg-gray-100 ${
                isSelected ? 'bg-gray-100 ring-2 ring-offset-1' : ''
              } ${selectedValue && !isSelected ? 'opacity-50' : ''}`}
              style={isSelected ? { ringColor: entry.color } : {}}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-700 truncate">{entry.value}</span>
              </div>
              <span className="text-gray-500 ml-2 font-medium">{itemData?.value || 0}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-xs text-gray-400">* 클릭하여 필터</span>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="40%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              onClick={(_, index) => handleClick(dataWithTotal[index])}
              style={{ cursor: 'pointer' }}
            >
              {dataWithTotal?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColor(entry.name, index)}
                  opacity={selectedValue && selectedValue !== entry.name ? 0.4 : 1}
                  stroke={selectedValue === entry.name ? '#1f2937' : 'transparent'}
                  strokeWidth={selectedValue === entry.name ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              content={renderLegend}
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ paddingLeft: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
