import { Activity, Zap, Database, CheckCircle } from 'lucide-react';

export default function DetectionAI() {
  const capabilities = [
    {
      icon: Database,
      title: '537 Skin Conditions',
      description: 'Comprehensive coverage of dermatologic presentations',
      items: ['Acne', 'Eczema', 'Psoriasis', 'Tinea', 'Vitiligo', 'Melanoma', '+ 531 more']
    },
    {
      icon: Zap,
      title: 'Fast Inference',
      description: 'Real-time analysis with minimal latency',
      items: ['<300ms response time', 'Offline-first architecture', 'On-device processing']
    },
    {
      icon: CheckCircle,
      title: 'High Accuracy',
      description: 'Validated performance across diverse populations',
      items: ['89.5% overall accuracy', 'Calibrated confidence scores', 'Explainable AI results']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Detection AI</h1>
        <p className="text-gray-600 mt-1">AI-powered skin condition analysis system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {capabilities.map((capability, index) => (
          <div key={index} className="card">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <capability.icon className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{capability.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{capability.description}</p>
            <ul className="space-y-2">
              {capability.items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Capture Image</h4>
            <p className="text-sm text-gray-600">Upload or capture patient skin image</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">AI Analysis</h4>
            <p className="text-sm text-gray-600">Deep learning model processes image</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Get Results</h4>
            <p className="text-sm text-gray-600">Top-3 predictions with confidence</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary-600">4</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Clinical Decision</h4>
            <p className="text-sm text-gray-600">Clinician makes final diagnosis</p>
          </div>
        </div>
      </div>

      <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
        <div className="flex gap-4">
          <Activity className="w-6 h-6 text-primary-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Assists, Clinician Decides</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our AI model is designed to augment clinical expertise, not replace it. The system 
              provides data-driven insights and pattern recognition, while the final diagnostic 
              and treatment decisions remain with qualified healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
