import React from 'react';
import { X, MapPin, Phone, Globe, Package } from 'lucide-react';
import { TYPE_CONFIG } from '../constants';

export default function EnterpriseModal({ enterprise, onClose }) {
  if (!enterprise) return null;

  const config = TYPE_CONFIG[enterprise.type] || {};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">{enterprise.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Type Badge */}
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: config.color }}
            >
              {enterprise.type}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
              {enterprise.region}
            </span>
          </div>

          {/* Product/Service */}
          {enterprise.product && enterprise.product !== '-' && (
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 mb-1">주요 사업</p>
                <p className="text-gray-800">{enterprise.product}</p>
              </div>
            </div>
          )}

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500 mb-1">주소</p>
              <p className="text-gray-800">{enterprise.address}</p>
            </div>
          </div>

          {/* Phone */}
          {enterprise.phone && enterprise.phone !== '-' && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 mb-1">연락처</p>
                <a
                  href={`tel:${enterprise.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {enterprise.phone}
                </a>
              </div>
            </div>
          )}

          {/* Website */}
          {enterprise.website && (
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 mb-1">웹사이트</p>
                <a
                  href={enterprise.website.startsWith('http') ? enterprise.website : `https://${enterprise.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {enterprise.website}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
