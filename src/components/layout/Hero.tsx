import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-gray-900 flex items-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-12 max-w-5xl w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Find Your <br/>
          <span className="text-yellow-400">Future Here.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-light">
          Discover world-class undergraduate and postgraduate courses designed to accelerate your career and expand your horizons.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/courses" className="inline-flex justify-center items-center px-8 py-4 bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition-colors rounded-sm">
            Find a Course
          </Link>
          <Link href="/open-days" className="inline-flex justify-center items-center px-8 py-4 bg-white/20 text-white font-bold text-lg hover:bg-white/30 backdrop-blur-sm transition-colors rounded-sm border border-white/30">
            Book an Open Day
          </Link>
        </div>
      </div>
    </section>
  );
}
