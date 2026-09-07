import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Reset token:", token);
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 p-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-12 lg:flex lg:flex-col lg:justify-between">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-white/10" />

          <div className="relative z-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
              <GraduationCap className="h-9 w-9 text-indigo-600" />
            </div>

            <h1 className="max-w-md text-5xl font-bold leading-tight text-white">
              Create a New
              <span className="block text-fuchsia-200">
                Password
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
              Set a strong new password for your School Management
              System account and continue securely.
            </p>
          </div>

          <div className="relative z-10">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm font-medium text-white">
                Keep your password secure and never share it with anyone.
              </p>

              <p className="mt-2 text-sm text-indigo-200">
                School Management System
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

            {!submitted ? (
              <>
                {/* Heading */}
                <div className="mb-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                    Account Recovery
                  </p>

                  <h2 className="text-4xl font-bold text-gray-900">
                    Reset Password
                  </h2>

                  <p className="mt-3 text-gray-500">
                    Enter your new password below to secure your account.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      New Password
                    </label>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your new password"
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Confirm Password
                    </label>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm your new password"
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-indigo-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Reset Password

                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              </>
            ) : (
              /* Success Message */
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900">
                  Password Reset Successful
                </h2>

                <p className="mt-4 text-gray-500">
                  Your password has been updated successfully.
                  You can now sign in using your new password.
                </p>

                <Link
                  to="/login"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            )}

            {/* Back to Login */}
            {!submitted && (
              <div className="mt-8 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-indigo-600"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            )}

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

export default ResetPassword;

