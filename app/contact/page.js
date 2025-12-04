import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-white text-center">Get In Touch</h1>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-300 mb-8 text-center">
            I'd love to hear from you! Feel free to reach out through any of these channels.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 bg-gray-700/50 rounded-lg border border-gray-600">
              <span className="text-4xl">📧</span>
              <div>
                <p className="font-bold text-white text-lg">Email</p>
                <a href="mailto:jalic0054@launchpadphilly.org" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">
                  jalic0054@launchpadphilly.org
                </a>
                <p className="text-sm text-gray-400 mt-1">Best way to reach me for professional inquiries</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-gray-700/50 rounded-lg border border-gray-600">
              <span className="text-4xl">🔗</span>
              <div>
                <p className="font-bold text-white text-lg">LinkedIn</p>
                <Link href="https://www.linkedin.com/in/jose-alicea-117311319/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">
                  linkedin.com/in/jose-alicea-117311319
                </Link>
                <p className="text-sm text-gray-400 mt-1">Connect with me professionally</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-gray-700/50 rounded-lg border border-gray-600">
              <span className="text-4xl">💻</span>
              <div>
                <p className="font-bold text-white text-lg">GitHub</p>
                <Link href="https://github.com/RedScall599" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">
                  github.com/jose-alicea
                </Link>
                <p className="text-sm text-gray-400 mt-1">Check out my code and projects</p>
              </div>
            </div>

            
          </div>
        </div>

        <div className="bg-blue-900/50 border-2 border-blue-700 rounded-lg p-6">
          <h3 className="font-bold text-blue-200 mb-4 text-xl">💡 Let's Collaborate!</h3>
          <div className="text-blue-300 space-y-2">
            <p>🚀 Available for freelance projects</p>
            <p>⏰ Typically respond within 24 hours</p>
            <p>🌍 Open to remote work opportunities</p>
            <p>🤝 Always interested in innovative projects</p>
          </div>
        </div>
      </div>
    </div>
  )
}
