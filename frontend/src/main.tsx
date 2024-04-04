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
import Select from './pages/Select.tsx'

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
    path: "/select",
    element: <Select />,
    errorElement: <Error />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
