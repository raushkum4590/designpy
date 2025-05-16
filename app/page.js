"use client";

import { SignIn } from "@stackframe/stack";
import { Button } from "./../@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [signInVisible, setSignInVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check localStorage for authentication state on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignInSuccess = (userData) => {
    console.log("Sign in successful, redirecting to workspace");
    setSignInVisible(false);
    setIsAuthenticated(true);
    
    const userInfo = {
      name: userData?.name || "User",
      email: userData?.email || "user@example.com",
    };
    
    setUser(userInfo);
    
    // Store authentication state in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userInfo));
    
    // Use setTimeout to ensure state updates complete before navigation
    setTimeout(() => {
      router.push("/workspace");
    }, 100);
  };

  const handleSignOut = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  const navigateToWorkspace = () => {
    router.push("/workspace");
  };

  // Check if user is already authenticated on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/workspace");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-6 md:px-12 border-b">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">Designipy</h1>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            // When authenticated: display only go to workspace button
            <Button 
              variant="outline" 
              className="text-blue-600 hover:text-blue-800" 
              onClick={navigateToWorkspace}
            >
              Go to Workspace
            </Button>
          ) : (
            // When not authenticated: display links to workspace and login / signup buttons
            <>
              <Link href="/workspace" className="text-blue-600 hover:text-blue-800 mr-4">
                Go to Workspace
              </Link>
              <Button variant="outline" onClick={() => setSignInVisible(true)}>
                Log in
              </Button>
              <Button onClick={() => setSignInVisible(true)}>
                Sign up free
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Design anything, publish anywhere
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
            Create beautiful designs with drag-and-drop simplicity using Designipy's powerful tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-7 px-10 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl"
              onClick={() => setSignInVisible(true)}
            >
              Get Started — It's Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="py-7 px-10 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              onClick={navigateToWorkspace}
            >
              Go to Workspace
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0 md:pl-8">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 shadow-2xl h-[450px] flex items-center justify-center relative overflow-hidden border border-gray-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full -ml-20 -mb-20"></div>
            <div className="relative z-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 mx-auto flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xl font-semibold text-gray-800">Beautiful Design Tools</p>
              <p className="text-gray-600 max-w-xs mx-auto">Create stunning visuals with our intuitive design platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {signInVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Sign in to Designipy</h3>
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSignInVisible(false)}>
                &times;
              </Button>
            </div>
            <SignIn 
              onSignInComplete={handleSignInSuccess}
              redirectUrl="/workspace"
              signUpRedirectUrl="/workspace"
              onSignUpComplete={handleSignInSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}
