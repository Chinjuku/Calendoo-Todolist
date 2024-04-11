import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import Notes from './pages/Notes.tsx'
import Project from './pages/Project.tsx'
import ProjectTasks from './pages/ProjectTasks.tsx'
import { Error } from './pages/Error.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Authentication from './pages/Authentication.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/notes",
    element: <Notes />,
    errorElement: <Error />,
  },
  {
    path: "/project",
    element: <Project />,
    errorElement: <Error />,
  },
  {
    path: "/project/:nameproject",
    element: <ProjectTasks />,
    errorElement: <Error />,
  },
  {
    path: "/auth",
    element: <Authentication />,
    errorElement: <Error />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='846393406450-7mopqb3n10vai4na9ojntk77m4g6g2k8.apps.googleusercontent.com' >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
