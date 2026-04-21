export default function HomePage() {
  return (
    <main className="min-h-screen from-slate-900 to-slate-800 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Student Success Predictor
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 mb-8">
          Predict a student's second-term GPA and identify if they are at risk using machine learning.
        </p>

        {/* Description */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-10">
          <p className="text-slate-200">
            This system uses neural networks to analyze academic and demographic data to provide insights into student performance.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/predictpersistance"
            className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
          >
            Predict Persistance
          </a>

          <a
            href="/predictAP"
            className="px-8 py-4 rounded-2xl border border-white text-white font-semibold hover:bg-white hover:text-slate-900 transition"
          >
            Predict Academic Performance
          </a>
    
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-slate-400">
          COMP258 Neural Networks Project • Centennial College
        </p>
      </div>
    </main>
  );
}
