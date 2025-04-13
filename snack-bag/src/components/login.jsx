import React, { useState } from 'react';
import { Phone, Lock, User, ShoppingBag, ChevronRight, Home, Eye, EyeOff } from 'lucide-react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    name: '',
    roomNumber: '',
    otp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full shadow-lg">
              <ShoppingBag className="text-white" size={28} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Snack Bag</h1>
          <p className="text-gray-600 mt-2 text-lg">Quick snacks, delivered faster</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
          {/* Tabs */}
          <div className="flex">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-5 text-center font-semibold text-lg transition-colors duration-300 ${isLogin ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-5 text-center font-semibold text-lg transition-colors duration-300 ${!isLogin ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="mb-5">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                        <User size={20} />
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="roomNumber" className="block text-sm font-semibold text-gray-700 mb-1">
                      Room Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                        <Home size={20} />
                      </span>
                      <input
                        type="text"
                        id="roomNumber"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder="A-101"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-5">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <Phone size={20} />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="mb-5">
                  <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-1">
                    Enter OTP
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full py-4 pl-4 pr-28 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter OTP"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-2 text-orange-600 font-bold hover:text-orange-800 transition duration-300"
                      onClick={() => console.log('Send OTP clicked')}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full py-4 pl-12 pr-12 text-gray-700 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center transition duration-300 transform hover:scale-105 shadow-md"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ChevronRight size={20} className="ml-2" />
              </button>
            </form>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-orange-600 font-bold hover:text-orange-800 transition duration-300"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Snack Bag. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;