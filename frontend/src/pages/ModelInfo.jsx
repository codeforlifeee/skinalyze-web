import { Shield, Zap, Database, TrendingUp } from 'lucide-react';

export default function ModelInfo() {
  const metrics = [
    { label: 'Supported Conditions', value: '537', icon: Database },
    { label: 'Inference Time', value: '<300ms', icon: Zap },
    { label: 'Model Size', value: '<35MB', icon: Shield },
    { label: 'Accuracy (Overall)', value: '89.5%', icon: TrendingUp },
  ];

  const fitzpatrickPerformance = [
    { type: 'I', accuracy: '87.2%', samples: 1245 },
    { type: 'II', accuracy: '89.1%', samples: 2834 },
    { type: 'III', accuracy: '90.3%', samples: 3621 },
    { type: 'IV', accuracy: '89.8%', samples: 3156 },
    { type: 'V', accuracy: '88.4%', samples: 2743 },
    { type: 'VI', accuracy: '87.9%', samples: 1892 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Model Information</h1>
        <p className="text-gray-600 mt-1">AI model performance and fairness metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
              </div>
              <metric.icon className="w-10 h-10 text-primary-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Performance by Fitzpatrick Skin Type
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Model performance stratified across all six Fitzpatrick skin types to ensure fairness
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Fitzpatrick Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Accuracy
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Test Samples
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Performance Bar
                </th>
              </tr>
            </thead>
            <tbody>
              {fitzpatrickPerformance.map((item) => (
                <tr key={item.type} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">Type {item.type}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{item.accuracy}</td>
                  <td className="py-3 px-4 text-gray-700">{item.samples.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: item.accuracy }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">Model Philosophy</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Our AI model is designed with a fairness-first approach, validated across all Fitzpatrick 
          skin types (I-VI) to ensure equitable performance. The model provides calibrated confidence 
          scores and maintains transparency through explainability features. Remember: AI assists, 
          dermatologist decides.
        </p>
      </div>
    </div>
  );
}
