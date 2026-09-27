import ProfileHeader from './components/ProfileHeader'
import About from './components/About'
import GithubActivity from './components/GithubActivity'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <main className="max-w-content mx-auto px-5 sm:px-6">
        <ProfileHeader />
        <About />
        <GithubActivity />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}