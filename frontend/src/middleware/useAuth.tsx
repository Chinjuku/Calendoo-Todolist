"use client"
import React, { createContext, useContext, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isAuthenticated: boolean;
  logoutUser: () => void;
  loginUser: (credentialResponse: unknown) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (credentialResponse: unknown) => {
    try {
    //   console.log(credentialResponse);
      const response = await axios.post("http://localhost:8888/api/google-auth/google-login", credentialResponse);
      if (response.status == 200) {
        toast({
          variant: "success",
          title: "Login with Google Successfully!..",
        });
        localStorage.setItem("token", response.data.token);
      } else {
        toast({
            variant: "destructive",
            title: "Login Google Failure!",
          });
      }
      setIsAuthenticated(true);
      navigate("/notes")
    } catch (error) {
      console.error("Error during Google Login:", error);
      localStorage.removeItem("token");
      toast({
        variant: "destructive",
        title: "An error occurred. Please try again.",
      });
    }
    };

  const logoutUser = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({ isAuthenticated, loginUser, logoutUser }), []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('use Auth must be used within an AuthProvider');
  }
  return context;
};