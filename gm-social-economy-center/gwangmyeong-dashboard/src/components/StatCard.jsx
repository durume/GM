import React from 'react';
import { Building2, Users, MapPin, TrendingUp } from 'lucide-react';

const iconMap = {
  building: Building2,
  users: Users,
  mapPin: MapPin,
  trending: TrendingUp
};

export default function StatCard({ title, value, icon, color = 'blue', subtitle }) {
  const Icon = iconMap[icon] || Building2;

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    violet: 'bg-violet-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
