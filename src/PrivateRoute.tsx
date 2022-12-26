import React from "react";
import { Navigate } from 'react-router-dom'
import { useAuth } from "./Hooks/useAuth";

const PrivateRoute: React.FC<any> = ({ component: Component }): React.ReactElement => {
    const auth = useAuth()
    return auth.isAuthenticated && auth.user ? <Component /> : <Navigate to={'/login'} />
}

export default PrivateRoute