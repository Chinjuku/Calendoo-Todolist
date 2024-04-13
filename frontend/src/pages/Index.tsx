import App from '@/pages/App.tsx'
import Notes from '@/pages/Notes.tsx'
import Project from '@/pages/Project.tsx'
import ProjectTasks from '@/pages/ProjectTasks.tsx'
import { Error } from '@/pages/Error.tsx'
import Authentication from '@/pages/Authentication.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from '@/middleware/PrivateRoutes.tsx'
import { AuthProvider } from '@/middleware/useAuth.tsx';
import { useAuth } from '@/middleware/useAuth';

const Index = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path='/check' element={<div>{isAuthenticated == true ? "true" : "false"}</div>} />
                <Route
                path="/"
                element={<App />}
                errorElement={<Error />} // Apply middleware to this route
                />
                <Route element={<PrivateRoutes value={true} />}>
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
  )
}

export default Index