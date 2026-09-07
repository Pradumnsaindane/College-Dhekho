"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Map, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication - set a cookie to indicate logged in
    document.cookie = "auth_token=mock_token; path=/; max-age=86400"; // 1 day expiry

    // Redirect to home page or callback URL
    const searchParams = new URLSearchParams(window.location.search);
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white text-gray-900">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center min-h-screen relative overflow-hidden bg-white">
        
        <div className="max-w-md w-full mx-auto relative z-10 animate-fade-in-up">
          
          <Link href="/" className="flex items-center gap-2 mb-16 w-fit hover:opacity-80 transition-opacity">
            <div className="p-2 bg-green-50 rounded-xl border border-green-100">
              <Map className="w-6 h-6 text-green-500" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">CollegeDhekho</span>
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3 tracking-tight text-gray-900">Login</h1>
            <p className="text-gray-500">Enter your account details</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 ml-1">Username</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-300 py-2 px-1 text-gray-900 focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-400"
                placeholder="johndoe"
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-600 ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-transparent border-b border-gray-300 py-2 px-1 text-gray-900 focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-400 pr-10"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 bottom-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm pt-2 px-1">
              <span className="text-green-600 hover:text-green-700 cursor-pointer transition-colors font-medium">Forgot Password?</span>
            </div>

            <button 
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-4 font-semibold transition-all duration-200 transform active:scale-[0.98] mt-8 shadow-[0_4px_20px_rgba(34,197,94,0.2)] hover:shadow-[0_4px_25px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 group"
            >
              Login
              <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          <div className="mt-16 flex items-center justify-between text-sm px-1">
            <span className="text-gray-500">Don&apos;t have an account?</span>
            <Link href="/register" className="px-6 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-900 transition-colors border border-gray-200 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Illustration/Banner */}
      <div className="hidden md:flex w-1/2 bg-[#f1e8f9] p-16 flex-col justify-center items-center relative overflow-hidden">
        {/* Dynamic decorative shapes */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-white/40 rounded-full blur-[80px] mix-blend-overlay animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-green-200/40 rounded-full blur-[100px] mix-blend-overlay animate-[spin_25s_linear_infinite_reverse]"></div>

        <div className="relative z-10 w-full max-w-lg">
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Welcome to<br/>student portal
          </h2>
          <p className="text-gray-600 text-lg mb-16 animate-fade-in-up font-medium" style={{ animationDelay: '300ms' }}>
            Login to access your account and explore colleges.
          </p>

          {/* Abstract Interface Illustration */}
          <div className="relative w-full aspect-square max-w-[400px] mx-auto animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className="absolute inset-0 bg-white/60 rounded-[2rem] backdrop-blur-md border border-white/80 shadow-xl overflow-hidden p-8 flex flex-col gap-6">
              {/* Fake UI Header */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Map className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="w-1/2 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-1/3 h-2 rounded-full bg-gray-200"></div>
                </div>
              </div>

              {/* Fake UI Content */}
              <div className="space-y-4 flex-1">
                <div className="w-full h-24 rounded-2xl bg-white flex p-4 gap-4 items-center border border-gray-100 shadow-sm">
                  <div className="w-16 h-16 rounded-xl bg-purple-100 flex-shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="w-3/4 h-3 rounded-full bg-gray-200"></div>
                    <div className="w-1/2 h-2 rounded-full bg-gray-100"></div>
                  </div>
                </div>
                <div className="w-full h-24 rounded-2xl bg-white flex p-4 gap-4 items-center border border-gray-100 shadow-sm opacity-60">
                  <div className="w-16 h-16 rounded-xl bg-green-50 flex-shrink-0"></div>
                  <div className="space-y-2 flex-1">
                    <div className="w-3/4 h-3 rounded-full bg-gray-200"></div>
                    <div className="w-1/2 h-2 rounded-full bg-gray-100"></div>
                  </div>
                </div>
              </div>

              {/* Bottom decorative bar */}
              <div className="w-1/2 h-1.5 rounded-full bg-gray-200 mx-auto mt-auto"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-400 rounded-full blur-md opacity-30 animate-[bounce_4s_infinite]"></div>
            <div className="absolute bottom-12 -left-8 w-16 h-16 bg-purple-400 rounded-full blur-md opacity-30 animate-[pulse_3s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
