import { useState } from "react";
import {
  User,
  School,
  Lock,
  Bell,
  Save,
  Eye,
  EyeOff,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabs = [
    {
      name: "Profile",
      icon: User,
    },
    {
      name: "School",
      icon: School,
    },
    {
      name: "Security",
      icon: Lock,
    },
    {
      name: "Notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-semibold text-indigo-600">
          Admin Panel
        </p>

        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your profile, school information, security and notifications.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="h-fit rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
          <div className="mb-4 px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Settings
            </p>
          </div>

          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Profile */}
          {activeTab === "Profile" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="text-lg font-bold text-slate-800">
                    Admin Profile
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update your personal account information.
                  </p>
                </div>

                <div className="p-6">
                  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-2xl font-bold text-white shadow-lg">
                      AK
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        Admin User
                      </h3>

                      <p className="text-sm text-slate-500">
                        System Administrator
                      </p>

                      <button className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                        Change Profile Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Full Name
                      </label>

                      <div className="relative">
                        <User
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          defaultValue="Admin User"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="email"
                          defaultValue="admin@school.com"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Phone Number
                      </label>

                      <div className="relative">
                        <Phone
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="text"
                          defaultValue="+92 300 1234567"
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Role
                      </label>

                      <input
                        type="text"
                        value="Administrator"
                        disabled
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700">
                      <Save size={17} />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* School */}
          {activeTab === "School" && (
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-lg font-bold text-slate-800">
                  School Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your school's basic information and contact details.
                </p>
              </div>

              <div className="p-6">
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                    <School size={30} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      The Educators School
                    </h3>

                    <p className="text-sm text-slate-500">
                      School Code: SCH-001
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      School Name
                    </label>

                    <input
                      type="text"
                      defaultValue="The Educators School"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      School Code
                    </label>

                    <input
                      type="text"
                      defaultValue="SCH-001"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Principal Name
                    </label>

                    <input
                      type="text"
                      defaultValue="Ahmed Khan"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        defaultValue="051-2345678"
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        defaultValue="info@school.com"
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Website
                    </label>

                    <div className="relative">
                      <Globe
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        defaultValue="www.school.com"
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Address
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-4 text-slate-400"
                      />

                      <textarea
                        rows="3"
                        defaultValue="Main Campus, Islamabad, Pakistan"
                        className="w-full resize-none rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700">
                    <Save size={17} />
                    Save School Information
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "Security" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                      <ShieldCheck size={22} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-800">
                        Password & Security
                      </h2>

                      <p className="text-sm text-slate-500">
                        Keep your account secure by updating your password.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="max-w-xl space-y-5">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Current Password
                      </label>

                      <div className="relative">
                        <Lock
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        New Password
                      </label>

                      <div className="relative">
                        <Lock
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Confirm New Password
                      </label>

                      <div className="relative">
                        <Lock
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-slate-700">
                        Password requirements
                      </p>

                      <ul className="space-y-1.5 text-xs text-slate-500">
                        <li>• At least 8 characters</li>
                        <li>• Include uppercase and lowercase letters</li>
                        <li>• Include at least one number</li>
                        <li>• Include at least one special character</li>
                      </ul>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700">
                      <Lock size={17} />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                    <CheckCircle size={21} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Account Security
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Your account is currently protected with secure
                      authentication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "Notifications" && (
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-lg font-bold text-slate-800">
                  Notification Preferences
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose which notifications you want to receive.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 text-indigo-600" size={20} />

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        New Student Registration
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Receive notifications when a new student is registered.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 text-indigo-600" size={20} />

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Fee Payment
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Get notified when fee payments are received.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 text-indigo-600" size={20} />

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Attendance Alerts
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Receive alerts about attendance issues.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-indigo-600"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 text-indigo-600" size={20} />

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Exam Reminders
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Receive reminders about upcoming examinations.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-indigo-600"
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-100 px-6 py-5">
                <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700">
                  <Save size={17} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

