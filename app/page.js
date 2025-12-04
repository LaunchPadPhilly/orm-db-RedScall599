import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-red-400 bg-clip-text text-transparent">
            Hi, I'm <span className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse">Jose</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Full Stack Developer & Designer
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            I love building computers, baking, and creating sites that make a difference. Passionate about clean code and beautiful user experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/projects" 
              className="group relative px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-300 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/contact" 
              className="group relative px-10 py-4 border-2 border-red-500 text-red-400 hover:text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 bg-transparent hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:border-red-400"
            >
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

