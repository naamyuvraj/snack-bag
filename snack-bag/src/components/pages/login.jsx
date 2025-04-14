import React, { useEffect, useState } from 'react';
import {
  Phone,
  Lock,
  User,
  ShoppingBag,
  ChevronRight,
  Home,
  Eye,
  EyeOff
} from 'lucide-react';
import { supabase } from '../../supabaseClient';
import bcrypt from 'bcryptjs';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [signupDisabled, setSignupDisabled] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    name: '',
    roomNumber: '',
    otp: ''
  });
  const [verifiedUser, setVerifiedUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    async function checkUnique() {
      if (!formData.email || !formData.phone) {
        setSignupDisabled(true);
        setPromptMessage('');
        return;
      }

      const { data: phoneData } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', formData.phone);
      const { data: emailData } = await supabase
        .from('users')
        .select('*')
        .eq('email', formData.email);

      if ((phoneData && phoneData.length > 0) || (emailData && emailData.length > 0)) {
        setSignupDisabled(true);
        setPromptMessage('A user with the provided email or phone number already exists.');
      } else {
        setSignupDisabled(false);
        setPromptMessage('');
      }
    }
    if (!isLogin) {
      checkUnique();
    }
  }, [formData.email, formData.phone, isLogin]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        setVerifiedUser(session.user);
      }
    });
    return () => authListener.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', formData.phone);

      if (error || !data || data.length === 0) {
        alert('Invalid credentials!');
        return;
      }

      const user = data[0];
      const isMatch = await bcrypt.compare(formData.password, user.password);
      if (isMatch) {
        alert('Logged in successfully!');
        window.location.href = '/';
      } else {
        alert('Invalid credentials!');
      }
    } else {
      if (signupDisabled) {
        alert(promptMessage);
        return;
      }

      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const { data: authData, error: authError } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password
        },
        { emailRedirectTo: `${window.location.origin}/login` }
      );

      if (authError) {
        alert('Error signing up: ' + authError.message);
        return;
      }

      if (authData?.user?.id) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              name: formData.name,
              email: formData.email,
              phone_number: formData.phone,
              room_number: formData.roomNumber,
              password: hashedPassword
            }
          ]);

        if (userError) {
          alert('Error saving user details: ' + userError.message);
          return;
        }
      }

      alert('Magic link sent! Please verify your email. After verification, sign in to complete registration.');
      setIsLogin(true);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setPromptMessage('');
    setSignupDisabled(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full shadow-lg">
              <ShoppingBag className="text-white" size={28} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Snack Bag</h1>
          <p className="text-gray-600 mt-2 text-lg">Quick snacks, delivered faster</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-5 text-center font-semibold text-lg transition-colors duration-300 ${
                isLogin
                  ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-5 text-center font-semibold text-lg transition-colors duration-300 ${
                !isLogin
                  ? 'text-orange-500 border-b-4 border-orange-500 bg-orange-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Sign Up
            </button>
          </div>

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
                        className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200"
                        placeholder="John Doe"
                        required
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
                        className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200"
                        placeholder="101"
                        required
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
                    className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-4 pl-12 pr-4 text-gray-700 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full py-4 pl-12 pr-12 text-gray-700 bg-gray-50 rounded-xl border border-gray-200"
                    placeholder="********"
                    required
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 flex items-center justify-center"
                disabled={!isLogin && signupDisabled}
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ChevronRight className="ml-2" />
              </button>
            </form>

            {promptMessage && (
              <p className="text-sm text-red-500 mt-4 text-center">{promptMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
