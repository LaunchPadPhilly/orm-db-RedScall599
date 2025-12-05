import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-white text-center">About Me</h1>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <Image
                src="/DSC_0692.jpg"
                alt="Profile photo"
                width={300}
                height={300}
                className="rounded-full object-cover shadow-lg border-4 border-gray-700"
              />
            </div>
            
            {/* About Content */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-white">Hello, I&apos;m Jose</h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  I&apos;m a passionate Full Stack Developer & Designer who loves creating meaningful digital experiences. 
                  My journey in technology is driven by curiosity and a desire to build solutions that make a real difference.
                </p>
                <p className="text-lg leading-relaxed">
                  When I&apos;m not coding, you&apos;ll find me building computers, baking delicious treats, or exploring new 
                  technologies. I believe in the power of clean code and beautiful user experiences to transform ideas into reality.
                </p>
                <p className="text-lg leading-relaxed">
                  I&apos;m always excited to take on new challenges and collaborate on projects that push the boundaries 
                  of what&apos;s possible with modern web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-white">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {['React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Git', 'UI/UX Design'].map((skill) => (
              <span key={skill} className="bg-blue-900/50 text-blue-300 border border-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-white">What I Love</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">💻</div>
              <h4 className="font-semibold text-white mb-2">Building Computers</h4>
              <p className="text-gray-400 text-sm">Assembling and optimizing hardware for peak performance</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🍰</div>
              <h4 className="font-semibold text-white mb-2">Baking</h4>
              <p className="text-gray-400 text-sm">Creating delicious treats and experimenting with new recipes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="font-semibold text-white mb-2">Innovation</h4>
              <p className="text-gray-400 text-sm">Exploring cutting-edge technologies and creative solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
