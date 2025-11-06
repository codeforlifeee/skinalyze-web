import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export default function RiskBandIndicator({ risk }) {
  const riskConfig = {
    low: {
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: CheckCircle,
      label: 'Low Risk',
      message: 'Condition appears manageable with standard care',
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: AlertCircle,
      label: 'Medium Risk',
      message: 'Requires monitoring and potential intervention',
    },
    high: {
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: AlertTriangle,
      label: 'High Risk',
      message: 'Immediate attention recommended - possible serious condition',
    },
  };

  const config = riskConfig[risk] || riskConfig.medium;
  const Icon = config.icon;

  return (
    <div className={`border-2 rounded-lg p-4 ${config.color}`}>
      <div className="flex items-center gap-3">
        <Icon className="w-6 h-6" />
        <div className="flex-1">
          <h3 className="font-semibold">{config.label}</h3>
          <p className="text-sm mt-1">{config.message}</p>
        </div>
      </div>
    </div>
  );
}
