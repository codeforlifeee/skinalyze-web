// // import { AlertTriangle } from 'lucide-react';

// // export default function DisclaimerBanner() {
// //   return (
// //     <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
// //       <div className="flex items-center gap-3">
// //         <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
// //         <p className="text-sm font-medium text-yellow-800">
// //           This is an AI-assisted advisory tool; clinician judgment prevails.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }
// import { AlertTriangle } from 'lucide-react';

// export default function DisclaimerBanner() {
//   return (
//     <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-3">
//       <div className="flex items-center gap-3">
//         <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
//         <p className="text-sm font-medium text-yellow-800">
//           <strong>AI-Assisted Advisory Tool:</strong> Clinician judgment prevails. 
//           All diagnoses and treatment decisions must be made by qualified healthcare professionals.
//         </p>
//       </div>
//     </div>
//   );
// }
import { AlertTriangle } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 sm:px-6 py-2 sm:py-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
        <p className="text-xs sm:text-sm font-medium text-yellow-800">
          <span className="hidden sm:inline">AI-Assisted Advisory Tool: </span>
          Clinician judgment prevails
        </p>
      </div>
    </div>
  );
}
