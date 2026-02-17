import React, { useState } from 'react';
import {  Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
 
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', formData);
      // In real app → authService.login(formData)
      alert(`Please wait work in progress`)
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-zinc-400 text-sm">
            Sign in to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          {errors.general && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm text-center">
              {errors.general}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-950 border ${
                errors.email ? 'border-red-600' : 'border-zinc-700'
              } rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600/40 focus:border-purple-600 transition-colors`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-950 border ${
                errors.password ? 'border-red-600' : 'border-zinc-700'
              } rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600/40 focus:border-purple-600 transition-colors`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-green-600 focus:ring-green-600/40"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-zinc-300">
                Remember me
              </label>
            </div>

            <a
              href="/#"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isLoading
                ? 'bg-green-800 text-green-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-500 active:bg-green-700 text-white shadow-lg shadow-green-900/30 hover:shadow-green-700/40'
            }`}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer / Signup link */}
        <div className="text-center text-sm text-zinc-500 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Create one
          </a>
        </div>

        {/* Optional: Social login divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-zinc-900 px-4 text-zinc-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-white transition-colors"
          >
            <span>Home</span>
          </Link>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-white transition-colors"
          >
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;