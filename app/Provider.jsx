"use client";
import React, { Suspense, useEffect, useState } from 'react'

import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { useUser } from '@stackframe/stack';
import { api } from './../convex/_generated/api';
import { UserDetailContext } from './../context/UserDetailContext';

// Initialize the Convex client outside of the component
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// Inner component that uses Convex hooks
function UserInitializer({ user, setUserDetail }) {
  const createNewUserMutation = useMutation(api.users.CreateNewUser);
  
  useEffect(() => {
    if (user) {
      createUser();
    }
  }, [user]);
  
  const createUser = async () => {
    try {
      const data = await createNewUserMutation({
        name: user?.displayName,
        email: user?.primaryEmail,
        picture: user?.picture,
      });
      
      const result = await createNewUserMutation({
        ...data,
      });
      console.log("User created successfully:", result);
      setUserDetail(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  
  return null;
}

function Provider({ children }) {
  const user = useUser();
  const [userDetail, setUserDetail] = useState(null);
  const [error, setError] = useState(null);
  
  // Global error handler
  useEffect(() => {
    const handleError = (event) => {
      console.error("Global error caught:", event.error);
      setError(event.error);
      // Prevent the default behavior which would show the browser's error dialog
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="p-6 max-w-md bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-4">The application encountered an unexpected error.</p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
            {error.message || "Unknown error"}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
        <ConvexProvider client={convex}>
          <UserInitializer user={user} setUserDetail={setUserDetail} />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ConvexProvider>
      </UserDetailContext.Provider>
    </Suspense>
  );
}

// Create an error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50">
          <div className="p-6 max-w-md bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-4">Component Error</h2>
            <p className="text-gray-700 mb-4">An error occurred in a component.</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
              {this.state.error?.message || "Unknown error"}
            </pre>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Provider;