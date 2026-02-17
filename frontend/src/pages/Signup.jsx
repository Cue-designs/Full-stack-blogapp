import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'At least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      console.log('Signup attempt:', formData);
      alert('Account created! (demo)');
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-zinc-400 text-sm">
            Start Reading in seconds
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
          {errors.general && (
            <div className="bg-red-950/60 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm text-center">
              {errors.general}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-950 border ${
                errors.fullName ? 'border-red-600' : 'border-zinc-700'
              } rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600/40 focus:border-purple-600 transition-colors`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1.5 text-sm text-red-400">{errors.fullName}</p>
            )}
          </div>

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
              autoComplete="new-password"
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

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300 mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-950 border ${
                errors.confirmPassword ? 'border-red-600' : 'border-zinc-700'
              } rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-600/40 focus:border-purple-600 transition-colors`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-400">{errors.confirmPassword}</p>
            )}
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
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;