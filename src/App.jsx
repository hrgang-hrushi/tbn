import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './components/Contact'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import SignupSuccess from './pages/SignupSuccess'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy-load the optional SignupSuccess page.
// Removed lazy loading to ensure it's always available and avoid potential loading issues.

export default function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <AuthProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/welcome"
                element={<SignupSuccess />}
              />
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </div>
  )
}
