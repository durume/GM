// Enterprise type colors and configurations
export const TYPE_CONFIG = {
  '사회적기업': {
    color: '#3B82F6',
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-500',
    icon: 'Building2'
  },
  '(예비)사회적기업': {
    color: '#8B5CF6',
    bgColor: 'bg-violet-500',
    lightBg: 'bg-violet-50',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-500',
    icon: 'Sparkles'
  },
  '마을기업': {
    color: '#10B981',
    bgColor: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-500',
    icon: 'Home'
  },
  '사회적협동조합': {
    color: '#F59E0B',
    bgColor: 'bg-amber-500',
    lightBg: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-500',
    icon: 'Users'
  },
  '협동조합': {
    color: '#EF4444',
    bgColor: 'bg-red-500',
    lightBg: 'bg-red-50',
    textColor: 'text-red-600',
    borderColor: 'border-red-500',
    icon: 'HeartHandshake'
  }
};

// Region configurations
export const REGION_CONFIG = {
  '소하동': { color: '#3B82F6' },
  '일직동': { color: '#8B5CF6' },
  '옥길동': { color: '#EC4899' },
  '광명동': { color: '#10B981' },
  '철산동': { color: '#F59E0B' },
  '노온사동': { color: '#EF4444' },
  '하안동': { color: '#06B6D4' },
  '가학동': { color: '#84CC16' }
};

// Pie chart colors
export const PIE_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899', '#84CC16'];

// Pagination
export const ITEMS_PER_PAGE = 10;

// Simulated growth data (since we don't have historical data)
export const GROWTH_DATA = [
  { year: '2019', 사회적기업: 8, '(예비)사회적기업': 5, 마을기업: 3, 사회적협동조합: 12, 협동조합: 45 },
  { year: '2020', 사회적기업: 10, '(예비)사회적기업': 8, 마을기업: 4, 사회적협동조합: 18, 협동조합: 58 },
  { year: '2021', 사회적기업: 12, '(예비)사회적기업': 12, 마을기업: 5, 사회적협동조합: 22, 협동조합: 72 },
  { year: '2022', 사회적기업: 14, '(예비)사회적기업': 15, 마을기업: 5, 사회적협동조합: 26, 협동조합: 88 },
  { year: '2023', 사회적기업: 15, '(예비)사회적기업': 17, 마을기업: 6, 사회적협동조합: 28, 협동조합: 98 },
  { year: '2024', 사회적기업: 16, '(예비)사회적기업': 18, 마을기업: 6, 사회적협동조합: 30, 협동조합: 101 }
];
