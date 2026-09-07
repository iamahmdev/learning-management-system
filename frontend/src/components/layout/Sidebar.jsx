import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserRoundCheck,
  BriefcaseBusiness,
  School,
  BookOpen,
  Layers,
  BookMarked,
  CalendarDays,
  ClipboardList,
  FileText,
  UserCheck,
  Wallet,
  Library,
  Bus,
  Clock3,
  Bell,
  Settings,
  UserCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [openSections, setOpenSections] = useState({
    academic: true,
    services: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-md">
              <School size={23} />
            </div>

            <div>
              <h1 className="text-base font-bold text-slate-800">
                SchoolMS
              </h1>

              <p className="text-xs text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          {/* Main */}
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <NavLink
            to="/admin/dashboard"
            onClick={onClose}
            className={navLinkClass}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          {/* Academic Management */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("academic")}
              className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              <span>Academic Management</span>

              {openSections.academic ? (
                <ChevronDown size={15} />
              ) : (
                <ChevronRight size={15} />
              )}
            </button>

            {openSections.academic && (
              <div className="mt-1 space-y-1">
                <NavLink
                  to="/admin/users"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <Users size={18} />
                  Users
                </NavLink>

                <NavLink
                  to="/admin/students"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <GraduationCap size={18} />
                  Students
                </NavLink>

                <NavLink
                  to="/admin/teachers"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <UserRoundCheck size={18} />
                  Teachers
                </NavLink>

                <NavLink
                  to="/admin/parents"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <Users size={18} />
                  Parents
                </NavLink>

                <NavLink
                  to="/admin/staff"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <BriefcaseBusiness size={18} />
                  Staff
                </NavLink>

                <NavLink
                  to="/admin/classes"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <School size={18} />
                  Classes
                </NavLink>

                <NavLink
                  to="/admin/sections"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <Layers size={18} />
                  Sections
                </NavLink>

                <NavLink
                  to="/admin/subjects"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <BookOpen size={18} />
                  Subjects
                </NavLink>

                <NavLink
                  to="/admin/academic-sessions"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <CalendarDays size={18} />
                  Academic Sessions
                </NavLink>

                <NavLink
                  to="/admin/exams"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <ClipboardList size={18} />
                  Exams
                </NavLink>

                <NavLink
                  to="/admin/results"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <FileText size={18} />
                  Results
                </NavLink>

                <NavLink
                  to="/admin/attendance"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <UserCheck size={18} />
                  Attendance
                </NavLink>
              </div>
            )}
          </div>

          {/* Finance */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Finance
            </p>

            <NavLink
              to="/admin/fees"
              onClick={onClose}
              className={navLinkClass}
            >
              <Wallet size={19} />
              Fees
            </NavLink>
          </div>

          {/* School Services */}
          <div className="mt-6">
            <button
              onClick={() => toggleSection("services")}
              className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400"
            >
              <span>School Services</span>

              {openSections.services ? (
                <ChevronDown size={15} />
              ) : (
                <ChevronRight size={15} />
              )}
            </button>

            {openSections.services && (
              <div className="mt-1 space-y-1">
                <NavLink
                  to="/admin/library"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <Library size={18} />
                  Library
                </NavLink>

                <NavLink
                  to="/admin/transport"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <Bus size={18} />
                  Transport
                </NavLink>

                <NavLink
                  to="/admin/timetable"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <Clock3 size={18} />
                  Timetable
                </NavLink>

                <NavLink
                  to="/admin/notices"
                  onClick={onClose}
                  className={navLinkClass}
                >
                  <Bell size={18} />
                  Notices
                </NavLink>
              </div>
            )}
          </div>

          {/* Administration */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Administration
            </p>

            <NavLink
              to="/admin/schools"
              onClick={onClose}
              className={navLinkClass}
            >
              <School size={19} />
              Schools
            </NavLink>
          </div>

          {/* System */}
          <div className="mt-6">
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              System
            </p>

            <NavLink
              to="/admin/profile"
              onClick={onClose}
              className={navLinkClass}
            >
              <UserCircle size={19} />
              My Profile
            </NavLink>

            <NavLink
              to="/admin/settings"
              onClick={onClose}
              className={navLinkClass}
            >
              <Settings size={19} />
              Settings
            </NavLink>
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


