import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.currentUser ? <>{children}</> :(auth.currentUser==null && auth.currentUser!==undefined)? <Navigate to="/login" />:<Skeleton variant="circular" width={70} height={70}/>;
}
