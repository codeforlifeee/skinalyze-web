// import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
// import ClassificationCard from './ClassificationCard';
// import RiskBandIndicator from './RiskBandIndicator';
// import ExplainabilityOverlay from './ExplainabilityOverlay';

// export default function AIAnalysisResults({ results }) {
//   const { predictions, confidence, riskBand, explainability } = results;

//   return (
//     <div className="space-y-6">
//       {/* Risk Band */}
//       <RiskBandIndicator risk={riskBand} />

//       {/* Top 3 Predictions */}
//       <div className="space-y-3">
//         <h3 className="font-semibold text-gray-900">Top Predictions</h3>
//         {predictions.slice(0, 3).map((prediction, index) => (
//           <ClassificationCard
//             key={index}
//             rank={index + 1}
//             condition={prediction.condition}
//             confidence={prediction.confidence}
//             category={prediction.category}
//           />
//         ))}
//       </div>

//       {/* Explainability */}
//       {explainability && (
//         <div className="space-y-3">
//           <h3 className="font-semibold text-gray-900">Explainability Highlights</h3>
//           <ExplainabilityOverlay data={explainability} />
//           <p className="text-sm text-gray-600">
//             Highlighted regions show areas that influenced the AI's assessment
//           </p>
//         </div>
//       )}

//       {/* Disclaimer */}
//       <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//         <div className="flex gap-3">
//           <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-sm font-medium text-yellow-800">
//               AI-Assisted Advisory Tool
//             </p>
//             <p className="text-sm text-yellow-700 mt-1">
//               These results are suggestions only. Clinical diagnosis and treatment 
//               decisions must be made by qualified healthcare professionals based on 
//               comprehensive patient assessment.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { AlertTriangle } from 'lucide-react';
import ClassificationCard from './ClassificationCard';
import RiskBandIndicator from './RiskBandIndicator';

export default function AIAnalysisResults({ results }) {
  const { predictions, riskBand } = results;

  return (
    <div className="space-y-6">
      <RiskBandIndicator risk={riskBand} />

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Top Predictions</h3>
        {predictions.slice(0, 3).map((prediction, index) => (
          <ClassificationCard
            key={index}
            rank={index + 1}
            condition={prediction.condition}
            confidence={prediction.confidence}
            category={prediction.category}
          />
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              AI-Assisted Advisory Tool
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              These results are suggestions only. Clinical diagnosis and treatment 
              decisions must be made by qualified healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
