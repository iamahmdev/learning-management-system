import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const AppBar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    setShowProfile(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      {/* Left Side */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative hidden w-64 sm:block lg:w-80">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search */}
        <button className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 sm:hidden">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600">
          <Bell size={21} />

          <span className="absolute right-1.5 top-1.5 flex h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-sm font-bold text-white shadow-sm">
              A
            </div>

            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-800">
                Admin
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={17}
              className={`hidden text-slate-400 transition md:block ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
              {/* Profile Header */}
              <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                <p className="font-semibold text-slate-800">
                  Admin
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  administrator@school.com
                </p>
              </div>

              {/* Menu */}
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/admin/profile");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <UserCircle size={18} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/admin/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppBar;



