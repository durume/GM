import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GROWTH_DATA, TYPE_CONFIG } from '../constants';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 shadow-lg rounded-lg border border-gray-100">
        <p className="font-semibold text-gray-800 mb-2">{label}년</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}개
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GrowthChart({ selectedType }) {
  const types = Object.keys(TYPE_CONFIG);

  // Selected view mode: '전체기업' | '전체비교' | specific type name
  const [selectedView, setSelectedView] = useState('전체비교');

  // Calculate total for each year
  const dataWithTotal = useMemo(() => {
    return GROWTH_DATA.map(item => ({
      ...item,
      '전체기업': types.reduce((sum, type) => sum + (item[type] || 0), 0)
    }));
  }, []);

  // Determine which types to show based on selectedType filter from parent
  const displayTypes = selectedType ? [selectedType] : types;

  // Determine what to show based on selectedView
  const showTotal = selectedView === '전체기업';
  const showAllTypes = selectedView === '전체비교';
  const showSingleType = !showTotal && !showAllTypes ? selectedView : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">연도별 성장 추이</h3>
        <span className="text-xs text-gray-400">* 시뮬레이션 데이터</span>
      </div>

      {/* Legend Controls - Radio Style */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* 전체기업 (Total Sum Only) */}
        <button
          onClick={() => setSelectedView('전체기업')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
            selectedView === '전체기업'
              ? 'border-indigo-400 bg-indigo-500 text-white shadow-md'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <span className={`w-5 h-0.5 border-t-2 border-dashed ${selectedView === '전체기업' ? 'border-white' : 'border-indigo-500'}`}></span>
          전체기업
        </button>

        {/* 전체비교 (All Types Together) */}
        <button
          onClick={() => setSelectedView('전체비교')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
            selectedView === '전체비교'
              ? 'border-gray-600 bg-gray-800 text-white shadow-md'
              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          전체비교
        </button>

        <span className="text-gray-300 mx-1">|</span>

        {/* Individual Type Buttons */}
        {displayTypes.map((type) => {
          const isSelected = selectedView === type;
          const config = TYPE_CONFIG[type];
          return (
            <button
              key={type}
              onClick={() => setSelectedView(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                isSelected
                  ? 'text-white shadow-md'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
              style={isSelected ? { backgroundColor: config.color, borderColor: config.color } : {}}
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: isSelected ? 'white' : config.color }}
              />
              {type}
            </button>
          );
        })}
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataWithTotal}>
            <defs>
              {/* Gradient for 전체기업 (total) */}
              <linearGradient id="gradient-전체기업" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              {types.map((type) => (
                <linearGradient key={type} id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={TYPE_CONFIG[type].color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={TYPE_CONFIG[type].color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* 전체기업 (Total Sum) - show only when selected */}
            <Area
              key="전체기업"
              type="monotone"
              dataKey="전체기업"
              stroke="#6366F1"
              fill="url(#gradient-전체기업)"
              strokeWidth={3}
              strokeDasharray="5 5"
              strokeOpacity={showTotal ? 1 : 0}
              fillOpacity={showTotal ? 1 : 0}
            />

            {/* Individual type areas */}
            {displayTypes.map((type) => {
              const isVisible = showAllTypes || showSingleType === type;
              return (
                <Area
                  key={type}
                  type="monotone"
                  dataKey={type}
                  stroke={TYPE_CONFIG[type].color}
                  fill={`url(#gradient-${type})`}
                  strokeWidth={2}
                  strokeOpacity={isVisible ? 1 : 0}
                  fillOpacity={isVisible ? 1 : 0}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
