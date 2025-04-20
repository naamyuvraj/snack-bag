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
  });
  const [userSession, setUserSession] = useState(null);

  // Keep formData in sync
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  // 1️⃣ Fetch existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session?.user ?? null);
    });
  }, []);

  // 2️⃣ Listen for sign-in / sign-out events
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserSession(session?.user ?? null);
        if (_event === 'SIGNED_IN') {
          window.location.href = '/'; // redirect after login
        }
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 3️⃣ Enable/disable signup button by checking uniqueness
  useEffect(() => {
    if (isLogin) return setSignupDisabled(true);

    async function checkUnique() {
      if (!formData.email || !formData.phone) {
        setPromptMessage('');
        return setSignupDisabled(true);
      }
      const [{ data: p }, { data: e }] = await Promise.all([
        supabase.from('users').select('id').eq('phone_number', formData.phone),
        supabase.from('users').select('id').eq('email', formData.email),
      ]);
      if ((p?.length) || (e?.length)) {
        setPromptMessage(
          'A user with that email or phone already exists.'
        );
        setSignupDisabled(true);
      } else {
        setPromptMessage('');
        setSignupDisabled(false);
      }
    }
    checkUnique();
  }, [formData.email, formData.phone, isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // 4️⃣ Sign-in flow: lookup user by phone, verify bcrypt, then call supabase.auth.signInWithPassword
      const { data: users, error: userErr } = await supabase
        .from('users')
        .select('email, password')
        .eq('phone_number', formData.phone);

      if (userErr || !users?.length) {
        return alert('Invalid credentials!');
      }
      const [user] = users;
      const match = await bcrypt.compare(formData.password, user.password);
      if (!match) {
        return alert('Invalid credentials!');
      }

      const { error: authErr } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: formData.password,
      });
      if (authErr) {
        return alert('Login error: ' + authErr.message);
      }
      // onAuthStateChange will handle redirect
      alert('Logged in successfully!');
      return;
    }

    // 5️⃣ Sign-up flow
    if (signupDisabled) {
      return alert(promptMessage);
    }
    const hashed = await bcrypt.hash(formData.password, 10);
    const { data: signupData, error: signupErr } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    }, {
      emailRedirectTo: `${window.location.origin}/login`
    });
    if (signupErr) {
      return alert('Sign-up error: ' + signupErr.message);
    }
    // Insert the rest of the profile into your users table
    await supabase
      .from('users')
      .insert([{
        id: signupData.user.id,
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        room_number: formData.roomNumber,
        password: hashed,
      }]);
    alert(
      'Check your email for a magic-link. Once verified, sign in to finish registration.'
    );
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#050505] to-[#3c3c3c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-full shadow-lg">
              <ShoppingBag className="text-white" size={28} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#ECD9BA]">
            <span className="text-[#238b45]">Snack</span> Bag
          </h1>
          <p className="text-gray-300 mt-2 text-lg">
            Quick snacks, delivered faster
          </p>
        </div>

        {/* Toggle */}
        <div className="bg-[#3c3c3c]-900 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-5 text-center font-semibold text-lg ${
                isLogin
                  ? 'text-[#238b45] border-b-4 border-[#238b45] bg-[#ECD9BA]'
                  : 'text-[#238b45] hover:bg-gray-50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-5 text-center font-semibold text-lg ${
                !isLogin
                  ? 'text-[#238b45] border-b-4 border-[#238b45] bg-[#ECD9BA]'
                  : 'text-[#238b45] hover:bg-gray-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  {/* Name */}
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-[#ECD9BA] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full py-4 px-4 pl-12 rounded-xl bg-[#ebebd4]/95 border"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Room */}
                  <div className="mb-5">
                    <label className="block text-sm font-semibold text-[#ECD9BA] mb-1">
                      Room Number
                    </label>
                    <div className="relative">
                      <Home
                        size={20}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        className="w-full py-4 px-4 pl-12 rounded-xl bg-[#ebebd4]/95 border"
                        placeholder="101"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Phone */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-[#ECD9BA] mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-4 px-4 pl-12 rounded-xl bg-[#ebebd4]/95 border"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-[#ECD9BA] mb-1">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    📧
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-4 px-4 pl-12 rounded-xl bg-[#ebebd4]/95 border"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#ECD9BA] mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full py-4 px-4 pl-12 pr-12 rounded-xl bg-[#ebebd4]/95 border"
                    placeholder="********"
                    required
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-[#ECD9BA] hover:bg-orange-600 text-[#238b45] font-bold rounded-xl flex justify-center items-center gap-2"
                disabled={!isLogin && signupDisabled}
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ChevronRight size={20} />
              </button>
            </form>

            {promptMessage && (
              <p className="text-sm text-red-500 mt-4 text-center">
                {promptMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
