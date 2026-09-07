import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  GraduationCap,
  UserCheck,
  UserX,
  Users,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StudentManagement = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const students = [
    {
      id: 1,
      name: "Hamza Khan",
      admissionNo: "ADM-2026-001",
      email: "hamza.khan@example.com",
      className: "Grade 10",
      section: "A",
      gender: "Male",
      status: "Active",
      admissionDate: "01 Sep 2026",
    },
    {
      id: 2,
      name: "Ayesha Malik",
      admissionNo: "ADM-2026-002",
      email: "ayesha.malik@example.com",
      className: "Grade 9",
      section: "B",
      gender: "Female",
      status: "Active",
      admissionDate: "30 Aug 2026",
    },
    {
      id: 3,
      name: "Muhammad Ali",
      admissionNo: "ADM-2026-003",
      email: "muhammad.ali@example.com",
      className: "Grade 8",
      section: "A",
      gender: "Male",
      status: "Active",
      admissionDate: "28 Aug 2026",
    },
    {
      id: 4,
      name: "Fatima Noor",
      admissionNo: "ADM-2026-004",
      email: "fatima.noor@example.com",
      className: "Grade 7",
      section: "C",
      gender: "Female",
      status: "Active",
      admissionDate: "26 Aug 2026",
    },
    {
      id: 5,
      name: "Bilal Ahmed",
      admissionNo: "ADM-2026-005",
      email: "bilal.ahmed@example.com",
      className: "Grade 10",
      section: "B",
      gender: "Male",
      status: "Inactive",
      admissionDate: "24 Aug 2026",
    },
    {
      id: 6,
      name: "Sara Khan",
      admissionNo: "ADM-2026-006",
      email: "sara.khan@example.com",
      className: "Grade 6",
      section: "A",
      gender: "Female",
      status: "Active",
      admissionDate: "22 Aug 2026",
    },
    {
      id: 7,
      name: "Usman Shah",
      admissionNo: "ADM-2026-007",
      email: "usman.shah@example.com",
      className: "Grade 9",
      section: "A",
      gender: "Male",
      status: "Active",
      admissionDate: "20 Aug 2026",
    },
    {
      id: 8,
      name: "Hira Ahmad",
      admissionNo: "ADM-2026-008",
      email: "hira.ahmad@example.com",
      className: "Grade 8",
      section: "B",
      gender: "Female",
      status: "Inactive",
      admissionDate: "18 Aug 2026",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      classFilter === "All Classes" ||
      student.className === classFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      student.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const studentsPerPage = 4;

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const startIndex = (currentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, classFilter, statusFilter]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setOpenMenu(null);
    }
  };

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold text-indigo-600">
            Admin Panel
          </p>

          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Student Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage student records, classes, sections and enrollment status.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add New Student
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Students</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,248
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <GraduationCap size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            +6.2% this year
          </p>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Students</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,198
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <UserCheck size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            96% active
          </p>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Inactive Students</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                50
              </h2>
            </div>

            <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
              <UserX size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-rose-600">
            Requires attention
          </p>
        </div>

        {/* Classes */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Classes</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                32
              </h2>
            </div>

            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <Users size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            Across all grades
          </p>
        </div>
      </div>

      {/* Students Table Card */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by student name, admission no or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Class */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Classes</option>
              <option>Grade 6</option>
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Admission No.</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Section</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Admission Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentStudents.length > 0 ? (
                currentStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-sm font-bold text-white">
                          {student.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {student.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Admission */}
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {student.admissionNo}
                    </td>

                    {/* Class */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {student.className}
                    </td>

                    {/* Section */}
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {student.section}
                      </span>
                    </td>

                    {/* Gender */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {student.gender}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            student.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          }`}
                        />

                        {student.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {student.admissionDate}
                    </td>

                    {/* Actions */}
                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === student.id ? null : student.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === student.id && (
                        <div className="absolute right-6 top-14 z-20 w-40 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View
                          </button>

                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Edit size={16} />
                            Edit
                          </button>

                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredStudents.length === 0
                ? 0
                : startIndex + 1}
              -
              {Math.min(
                startIndex + studentsPerPage,
                filteredStudents.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredStudents.length}
            </span>{" "}
            students
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add New Student
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new student record.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter student full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Admission No */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Admission Number
                </label>

                <input
                  type="text"
                  placeholder="e.g. ADM-2026-009"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Class */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Class
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select class</option>
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>

              {/* Section */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Section
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select section</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Gender
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-md"
              >
                Create Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;

