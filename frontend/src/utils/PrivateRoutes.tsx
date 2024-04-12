import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const auth = {'token': false}
    return(
        auth.token ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes