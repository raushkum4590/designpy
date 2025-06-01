"use client";

import { SignIn, useUser, useStackApp } from "@stackframe/stack";
import { Button } from "./../@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, Layers, Image as ImageIcon, Type, PenTool, Zap, Star } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const user = useUser(); // Use Stack Auth's useUser hook
  const stackApp = useStackApp(); // Get Stack app instance from context
  const [signInVisible, setSignInVisible] = useState(false);

  // Handle Google OAuth sign-in
  const handleGoogleSignIn = async () => {
    try {
      await stackApp.signInWithOAuth("google", {
        afterAuthReturnTo: "/dashboard"
      });
    } catch (error) {
      console.error("Google OAuth failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await stackApp.signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const navigateToWorkspace = () => {
    router.push("/workspace");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center py-4 px-6 md:px-12 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <PenTool className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Designipy</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 mx-8">
          <Link href="#features" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Features</Link>
          <Link href="#templates" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Templates</Link>
          <Link href="#pricing" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            // When authenticated: display Home and Sign Out buttons
            <>
              <Button 
                variant="outline" 
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2" 
                onClick={() => router.push("/workspace")}
              >
                Home
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            // When not authenticated: display login / signup buttons only
            <>
              <Button variant="outline" onClick={handleGoogleSignIn} className="hidden md:flex">
                Log in with Google
              </Button>
              <Button 
                onClick={() => setSignInVisible(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Sign up free
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between py-16 lg:py-24 px-6 md:px-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Enhanced Background decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 right-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
        
        <div className="md:w-1/2 space-y-8 relative z-10">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-4 shadow-lg animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-3 animate-pulse"></span>
            🎨 Unleash your creativity today
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight animate-fade-in-up">
            Design anything, <br />publish <span className="relative">
              anywhere
              <svg className="absolute -bottom-2 w-full animate-draw" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.5C32.5 1.5 62.5 1.5 93 5.5C123.5 9.5 153.5 9.5 194 5.5C234.5 1.5 279 1.5 299 5.5" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-xl animate-fade-in-up delay-200">
            Create stunning designs with drag-and-drop simplicity. Powerful AI tools, countless templates, and intuitive features make design accessible to everyone.
            <span className="block mt-2 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚀 Join 50,000+ creators worldwide
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {user ? (
              // When user is logged in: Show go to workspace button
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white py-7 px-10 text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 flex items-center gap-3 animate-fade-in-up delay-300"
                onClick={navigateToWorkspace}
              >
                <span>🎨</span> Go to Workspace <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              // When user is logged out: Show sign up and try without signup buttons
              <>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white py-7 px-10 text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 flex items-center gap-3 animate-fade-in-up delay-300"
                  onClick={handleGoogleSignIn}
                >
                  <span>🚀</span> Get Started with Google <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="py-7 px-10 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-purple-600 hover:text-purple-600 rounded-2xl transition-all duration-300 hover:scale-105 animate-fade-in-up delay-400"
                  onClick={navigateToWorkspace}
                >
                  <span>✨</span> Try Without Signup
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm mt-8 text-gray-500 animate-fade-in-up delay-500">
            <div className="flex -space-x-2">
              <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-md" />
              <img src="https://i.pravatar.cc/40?img=2" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-md" />
              <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-md" />
              <img src="https://i.pravatar.cc/40?img=4" alt="User" className="w-8 h-8 rounded-full border-2 border-white shadow-md" />
            </div>
            <span>Joined by 10,000+ designers & creative teams</span>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-12 md:mt-0 md:pl-8 relative z-10">
          <div className="bg-white rounded-2xl p-1 shadow-2xl relative overflow-hidden border border-gray-200">
            <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-400/10 to-blue-500/10 w-full h-full"></div>
            
            {/* App mockup/screenshot */}
            <div className="relative rounded-xl overflow-hidden h-[450px] shadow-inner">
              <img 
                src="/design.jpeg" 
                alt="Designipy Interface" 
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Floating UI elements on top of the screenshot */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-xs font-medium text-gray-700">AI-Powered Design</span>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Easy Layer Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {signInVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Sign in to Designipy</h3>
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSignInVisible(false)}>
                &times;
              </Button>
            </div>
            
            {/* Google OAuth Button */}
            <Button
              onClick={handleGoogleSignIn}
              className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-3"
              size="lg"
            >
              Continue with Google
            </Button>
            
            <div className="flex items-center mb-4">
              <hr className="flex-1 border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            
            {/* Traditional Stack Sign In */}
            <SignIn 
              onSignInComplete={() => {
                setSignInVisible(false);
                router.push("/dashboard");
              }}
              redirectUrl="/dashboard"
              signUpRedirectUrl="/dashboard"
              onSignUpComplete={() => {
                setSignInVisible(false);
                router.push("/dashboard");
              }}
            />
          </div>
        </div>
      )}
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Design like a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">professional</span>, no experience needed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features that make design accessible to everyone, from beginners to experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Layers className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Layers</h3>
              <p className="text-gray-600">
                Intuitively manage your design elements with our smart layer system. Organize, group, and arrange with ease.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <ImageIcon className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Image Filters</h3>
              <p className="text-gray-600">
                Transform your images with professional-grade filters, adjustments, and effects with just a few clicks.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                <Type className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Typography Control</h3>
              <p className="text-gray-600">
                Access hundreds of fonts and precise typography controls to make your text stand out beautifully.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <PenTool className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Design Tools</h3>
              <p className="text-gray-600">
                From shapes to custom paths, our vector tools give you the power of professional design software.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <Zap className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Design</h3>
              <p className="text-gray-600">
                Let our AI assist with automatic layouts, smart resizing, and design suggestions that make you look like a pro.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                <Star className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Templates Gallery</h3>
              <p className="text-gray-600">
                Start with professional templates for any need - social media, presentations, marketing materials, and more.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 px-8 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl"
              onClick={handleGoogleSignIn}
            >
              Start Creating For Free
            </Button>
          </div>
        </div>
      </section>
      
      {/* Templates Showcase */}
      <section id="templates" className="py-20 bg-gray-50 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start with beautiful <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">templates</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from hundreds of professionally designed templates to jumpstart your creative projects.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Template 1 */}
            <div className="group cursor-pointer relative">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                <img 
                  src="/insta.jpg" 
                  alt="Instagram Post Template" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900">Instagram Post</h3>
                <p className="text-xs text-gray-500">1080 × 1080 px</p>
              </div>
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button 
                  size="sm" 
                  className="bg-white text-blue-600 shadow-lg"
                  onClick={handleGoogleSignIn}
                >
                  Use Template
                </Button>
              </div>
            </div>
            
            {/* Template 2 */}
            <div className="group cursor-pointer relative">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                <img 
                  src="/face1.jpg" 
                  alt="Facebook Cover Template" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900">Facebook Cover</h3>
                <p className="text-xs text-gray-500">851 × 315 px</p>
              </div>
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button 
                  size="sm" 
                  className="bg-white text-blue-600 shadow-lg"
                  onClick={handleGoogleSignIn}
                >
                  Use Template
                </Button>
              </div>
            </div>
            
            {/* Template 3 */}
            <div className="group cursor-pointer relative">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                <img 
                  src="/prsent.png" 
                  alt="Presentation Slide" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900">Presentation</h3>
                <p className="text-xs text-gray-500">1920 × 1080 px</p>
              </div>
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button 
                  size="sm" 
                  className="bg-white text-blue-600 shadow-lg"
                  onClick={handleGoogleSignIn}
                >
                  Use Template
                </Button>
              </div>
            </div>
            
            {/* Template 4 */}
            <div className="group cursor-pointer relative">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                <img 
                  src="/card.jpg" 
                  alt="Business Card" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900">Business Card</h3>
                <p className="text-xs text-gray-500">1050 × 600 px</p>
              </div>
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button 
                  size="sm" 
                  className="bg-white text-blue-600 shadow-lg"
                  onClick={handleGoogleSignIn}
                >
                  Use Template
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="py-6 px-8 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              onClick={navigateToWorkspace}
            >
              Browse All Templates
            </Button>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're just starting out or scaling up, we have a plan that's right for you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-xl p-8 border-2 border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all">
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Free</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="mt-4 text-gray-600">Perfect for individuals just starting out.</p>
              </div>
              
              <hr className="my-6" />
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">5 designs per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Basic templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Essential design tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">720p exports</span>
                </li>
              </ul>
              
              <Button
                className="w-full mt-8 py-6"
                variant="outline"
                onClick={handleGoogleSignIn}
              >
                Start for Free
              </Button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-xl p-8 border-2 border-blue-600 shadow-xl relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              
              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Pro</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">$12</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="mt-4 text-gray-600">For professionals and small teams.</p>
              </div>
              
              <hr className="my-6" />
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Unlimited designs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Full template library</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Advanced design tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">4K exports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Priority support</span>
                </li>
              </ul>
              
              <Button
                className="w-full mt-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleGoogleSignIn}
              >
                Start Pro Trial
              </Button>
            </div>
            
            {/* Business Plan */}
            <div className="bg-white rounded-xl p-8 border-2 border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all">
              <div className="mb-4">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Business</span>
                <div className="mt-2 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">$32</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <p className="mt-4 text-gray-600">For businesses and larger teams.</p>
              </div>
              
              <hr className="my-6" />
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Team collaboration</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Brand asset management</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Dedicated support</span>
                </li>
              </ul>
              
              <Button
                className="w-full mt-8 py-6"
                variant="outline"
                onClick={handleGoogleSignIn}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50 px-6 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Loved by designers and <br/>teams around the world
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 mt-12">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-12 h-12 rounded-full mr-4"/>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600 text-left">
                "Designipy has revolutionized how our marketing team creates content. No more waiting for designers—we can now produce professional graphics in minutes."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img src="https://i.pravatar.cc/100?img=20" alt="User" className="w-12 h-12 rounded-full mr-4"/>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Freelance Designer</p>
                </div>
              </div>
              <p className="text-gray-600 text-left">
                "As a professional designer, I was skeptical at first, but Designipy has become an essential part of my workflow. The templates save me hours, and the tools are impressively powerful."
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 px-8 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl"
              onClick={handleGoogleSignIn}
            >
              Join Thousands of Happy Users
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <PenTool className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Designipy</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Design made simple, powerful, and accessible for everyone.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#templates" className="text-gray-400 hover:text-white transition-colors">Templates</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Designipy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
