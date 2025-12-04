import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export const metadata = {
  title: "Jose.dev - Portfolio",
  description: "Full Stack Developer & Designer Portfolio",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
