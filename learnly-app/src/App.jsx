import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MyLearning from './pages/MyLearning'
import SkillProfile from './pages/SkillProfile'
import Teams from './pages/Teams'
import Leaderboard from './pages/Leaderboard'
import CourseDetail from './pages/CourseDetail'
import HRDashboard from './pages/HRDashboard'
import Layout from './components/Layout'

function ProtectedRoute({ children, hrOnly = false }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (hrOnly && user.role !== 'hr') return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my-learning" element={<MyLearning />} />
            <Route path="skill-profile" element={<SkillProfile />} />
            <Route path="teams" element={<Teams />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route
              path="hr-dashboard"
              element={
                <ProtectedRoute hrOnly>
                  <HRDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
