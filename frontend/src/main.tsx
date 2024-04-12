import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import Notes from './pages/Notes.tsx'
import Project from './pages/Project.tsx'
import ProjectTasks from './pages/ProjectTasks.tsx'
import { Error } from './pages/Error.tsx'
import './index.css'
import Authentication from './pages/Authentication.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './middleware/PrivateRoutes.tsx'
import { AuthProvider } from '@/middleware/useAuth.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='846393406450-7mopqb3n10vai4na9ojntk77m4g6g2k8.apps.googleusercontent.com' >
      {/* <RouterProvider router={router} /> */}
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={<App />}
              errorElement={<Error />} // Apply middleware to this route
            />
            <Route element={<PrivateRoutes />}>
              <Route path="/notes" element={<Notes />} errorElement={<Error />} />
              <Route path="/project" element={<Project />} errorElement={<Error />} />
              <Route
                path="/project/:nameproject"
                element={<ProjectTasks />}
                errorElement={<Error />}
              />
            </Route>
            <Route path="/auth" element={<Authentication />} errorElement={<Error />} />
            {/* <Route path="*" element={<Navigate to="/" />} /> Fallback route */}
          </Routes>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
