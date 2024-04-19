// import App from '@/pages/App.tsx'
// import Notes from '@/pages/Notes.tsx'
import Project from '@/pages/Project.tsx'
import ProjectTasks from '@/pages/ProjectTasks.tsx'
import Error from '@/pages/Error.tsx'
// import Authentication from '@/pages/Authentication.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from '@/middleware/PrivateRoutes.tsx'
import { AuthProvider } from '@/middleware/useAuth.tsx';
import { useAuth } from '@/middleware/useAuth';
import React, { Suspense } from 'react'
import Loading from './Loading'

const Notes = React.lazy(() => {
    return Promise.all([
        import("@/pages/Notes.tsx"),
        new Promise(resolve => setTimeout(resolve, 1300))
        ])
        .then(([moduleExports]) => moduleExports);
    });

const Authentication = React.lazy(() => {
    return Promise.all([
        import("@/pages/Authentication.tsx"),
        new Promise(resolve => setTimeout(resolve, 1000))
        ])
        .then(([moduleExports]) => moduleExports);
    });

const App = React.lazy(() => {
    return Promise.all([
        import("@/pages/App.tsx"),
        new Promise(resolve => setTimeout(resolve, 1500))
        ])
        .then(([moduleExports]) => moduleExports);
    });
  

const Index = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
        <AuthProvider>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/check' element={<div>{isAuthenticated == true ? "true" : "false"}</div>} />
                    <Route
                        path="/"
                        element={<App />}
                        errorElement={<Error />} // Apply middleware to this route
                    />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/notes" element={<Notes />} errorElement={<Error />} />
                        <Route path="/project" element={<Project />} errorElement={<Error />} />
                    <Route
                        path="/project/:projectId"
                        element={<ProjectTasks />}
                        errorElement={<Error />}
                    />
                    </Route>
                    <Route path="/auth" element={<Authentication />} errorElement={<Error />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Suspense>
        </AuthProvider>
    </Router>
  )
}

export default Index