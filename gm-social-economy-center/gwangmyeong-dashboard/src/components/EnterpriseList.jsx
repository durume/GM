import React from 'react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import { TYPE_CONFIG } from '../constants';

export default function EnterpriseList({ enterprises, onSelectEnterprise }) {
  if (!enterprises || enterprises.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500">해당하는 기업이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {enterprises.map((enterprise) => {
          const config = TYPE_CONFIG[enterprise.type] || {};

          return (
            <div
              key={enterprise.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelectEnterprise(enterprise)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {enterprise.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium text-white flex-shrink-0"
                      style={{ backgroundColor: config.color }}
                    >
                      {enterprise.type}
                    </span>
                  </div>

                  {enterprise.product && enterprise.product !== '-' && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {enterprise.product}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {enterprise.region}
                    </span>
                    {enterprise.phone && enterprise.phone !== '-' && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {enterprise.phone}
                      </span>
                    )}
                  </div>
                </div>

                <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
