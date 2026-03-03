import { DataStatus } from '@/lib/types/metrics';

interface DataStatusBadgeProps {
  status: DataStatus;
  isMockData: boolean;
  className?: string;
}

export function DataStatusBadge({
  status,
  isMockData,
  className = '',
}: DataStatusBadgeProps) {
  const getStatusConfig = () => {
    if (isMockData) {
      return {
        label: 'MOCK DATA',
        icon: '🟡',
        bgColor: 'bg-amber-100',
        textColor: 'text-amber-800',
        borderColor: 'border-amber-300',
      };
    }

    switch (status) {
      case 'available':
        return {
          label: 'LIVE DATA',
          icon: '🟢',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-300',
        };
      case 'short-term':
        return {
          label: 'SHORT-TERM',
          icon: '⏱',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-300',
        };
      case 'blocked':
        return {
          label: 'NEEDS INTEGRATION',
          icon: '🔴',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-300',
        };
      case 'low-priority':
        return {
          label: 'LOW PRIORITY',
          icon: '⚫',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-300',
        };
      case 'fundamental-limitation':
        return {
          label: 'NOT FEASIBLE',
          icon: '⛔',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-300',
        };
      default:
        return {
          label: 'UNKNOWN',
          icon: '❓',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-300',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor} ${className}`}
      title={`Status: ${config.label}${isMockData ? ' - Using sample data' : ''}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
}
