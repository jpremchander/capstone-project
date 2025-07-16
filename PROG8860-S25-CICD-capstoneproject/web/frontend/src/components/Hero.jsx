export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10"></div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="text-blue-400">Northern</span>AI Robotics
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Where Edmonton's innovation meets the future of autonomous systems.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Shop Robots
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}