
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would connect to a backend
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user validation (in a real app, this would be validated by the server)
      if (email === "user@example.com" && password === "password") {
        const user = {
          id: "1",
          email: email,
          name: "Demo User"
        };
        
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
      
      // Check if user exists in localStorage from registration
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const user = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name
        };
        
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
      
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulating network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const emailExists = users.some((u: any) => u.email === email);
      
      if (emailExists) {
        toast({
          title: "Registration Failed",
          description: "Email already in use",
          variant: "destructive"
        });
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In a real app, this would be hashed
        name
      };
      
      // Save to "database" (localStorage in this case)
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Log in the user
      const user = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      };
      
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An error occurred during registration",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
