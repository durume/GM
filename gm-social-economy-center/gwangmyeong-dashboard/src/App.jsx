import React, { useState, useMemo } from 'react';
import { Search, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import useEnterprises from './hooks/useEnterprises';
import StatCard from './components/StatCard';
import PieChartPanel from './components/PieChartPanel';
import GrowthChart from './components/GrowthChart';
import EnterpriseList from './components/EnterpriseList';
import EnterpriseModal from './components/EnterpriseModal';
import Pagination from './components/Pagination';
import { ITEMS_PER_PAGE } from './constants';

export default function App() {
  const { enterprises, metadata, stats, loading, error } = useEnterprises();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  // Filter enterprises
  const filteredEnterprises = useMemo(() => {
    return enterprises.filter((ent) => {
      const matchesType = !selectedType || ent.type === selectedType;
      const matchesRegion = !selectedRegion || ent.region === selectedRegion;
      const matchesSearch =
        !searchQuery ||
        ent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ent.product?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ent.address?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesRegion && matchesSearch;
    });
  }, [enterprises, selectedType, selectedRegion, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredEnterprises.length / ITEMS_PER_PAGE);
  const paginatedEnterprises = filteredEnterprises.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">오류가 발생했습니다</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">광명시 사회적경제</h1>
                <p className="text-xs text-gray-500">대시보드</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-80 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="기업명, 사업내용, 주소로 검색..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="relative mb-6 md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="기업명, 사업내용, 주소로 검색..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="전체 기업"
            value={stats?.total || 0}
            icon="building"
            color="blue"
            subtitle={`${metadata?.lastUpdated || ''} 기준`}
          />
          <StatCard
            title="기업 유형"
            value={Object.keys(stats?.typeCount || {}).length}
            icon="users"
            color="violet"
            subtitle="5개 유형"
          />
          <StatCard
            title="활동 지역"
            value={Object.keys(stats?.regionCount || {}).length}
            icon="mapPin"
            color="green"
            subtitle="광명시 내"
          />
          <StatCard
            title="최다 유형"
            value={stats?.typeData?.[0]?.name || '-'}
            icon="trending"
            color="amber"
            subtitle={`${stats?.typeData?.[0]?.value || 0}개 기업`}
          />
        </div>

        {/* Charts Grid - Interactive Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PieChartPanel
            title="유형별 분포"
            data={stats?.typeData}
            dataType="type"
            selectedValue={selectedType}
            onSelect={handleTypeSelect}
          />
          <PieChartPanel
            title="지역별 분포"
            data={stats?.regionData}
            dataType="region"
            selectedValue={selectedRegion}
            onSelect={handleRegionSelect}
          />
        </div>

        {/* Enterprise List */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            기업 목록
            <span className="ml-2 text-base font-normal text-gray-500">
              ({filteredEnterprises.length}개)
            </span>
          </h2>
          {/* Active filter badges */}
          <div className="flex gap-2">
            {selectedType && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                {selectedType}
                <button onClick={() => handleTypeSelect(null)} className="ml-1 hover:text-blue-900">&times;</button>
              </span>
            )}
            {selectedRegion && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                {selectedRegion}
                <button onClick={() => handleRegionSelect(null)} className="ml-1 hover:text-green-900">&times;</button>
              </span>
            )}
          </div>
        </div>

        <EnterpriseList
          enterprises={paginatedEnterprises}
          onSelectEnterprise={setSelectedEnterprise}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Growth Chart */}
        <div className="mb-8 mt-8">
          <GrowthChart selectedType={selectedType} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">광명시사회적경제센터</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{metadata?.centerContact?.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${metadata?.centerContact?.phone}`} className="hover:text-blue-500">
                  {metadata?.centerContact?.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${metadata?.centerContact?.email}`} className="hover:text-blue-500">
                  {metadata?.centerContact?.email}
                </a>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400">
              데이터 출처:{' '}
              <a
                href={metadata?.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {metadata?.source}
              </a>
              {' '}| 마지막 업데이트: {metadata?.lastUpdated}
            </p>
          </div>
        </footer>
      </main>

      {/* Enterprise Detail Modal */}
      {selectedEnterprise && (
        <EnterpriseModal
          enterprise={selectedEnterprise}
          onClose={() => setSelectedEnterprise(null)}
        />
      )}
    </div>
  );
}
