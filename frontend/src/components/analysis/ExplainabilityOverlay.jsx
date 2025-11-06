export default function ExplainabilityOverlay({ data }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="aspect-video bg-gradient-to-br from-red-100 via-yellow-100 to-green-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-600 text-sm">Explainability heatmap visualization</p>
      </div>
    </div>
  );
}
