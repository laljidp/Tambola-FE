import React from "react";
import { Navigate, Outlet } from 'react-router-dom'
import AppHeader from "./components/UI/AppHeader";
import { ACCESS_TOKEN_KEY } from "./constants";

const PrivateRoute: React.FC<any> = ({ component: Component }): React.ReactElement => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (token) {
    return (
      <>
        <AppHeader />
        <Outlet />
      </>
    )
  }
  return <Navigate to={'/login'} />
}

export default PrivateRoute