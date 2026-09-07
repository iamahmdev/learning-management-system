import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
} from "lucide-react";



 



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-12 lg:flex lg:flex-col lg:justify-between">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
              <GraduationCap className="h-9 w-9 text-indigo-600" />
            </div>

            <h1 className="max-w-md text-5xl font-bold leading-tight text-white">
              Welcome Back to
              <span className="block text-fuchsia-200">
                School Portal
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
              Manage your school, students, teachers, classes and
              academic activities from one powerful platform.
            </p>
          </div>

          <div className="relative z-10">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm font-medium text-white">
                "Education is the most powerful weapon which you can
                use to change the world."
              </p>
              <p className="mt-2 text-sm text-indigo-200">
                — Nelson Mandela
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  School Portal
                </h2>
                <p className="text-xs text-gray-500">
                  Management System
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                Welcome back
              </p>

              <h2 className="text-4xl font-bold text-gray-900">
                Sign in
              </h2>

              <p className="mt-3 text-gray-500">
                Enter your credentials to access your account.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5"
            onSubmit={(e) => { e.preventDefault();
             loginMutation.mutate(); }}>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                    
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                    
                  >
                    Password
                  </label>

                  <Link
  to="/forgot-password"
  className="text-sm font-semibold text-indigo-600 transition hover:text-fuchsia-600"
>
  Forgot Password?
</Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-indigo-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-3">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Sign In

                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                 to="/register"
  className="font-bold text-indigo-600 transition hover:text-fuchsia-600"
              >
                Create Account
              </Link>
            </p>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-400">
              © 2026 School Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;