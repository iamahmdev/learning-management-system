import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

const AttendanceManagement = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const attendance = [
    {
      id: 1,
      studentName: "Hamza Khan",
      admissionNo: "ADM-2026-001",
      className: "Grade 10-A",
      date: "07 Sep 2026",
      timeIn: "07:45 AM",
      timeOut: "02:30 PM",
      status: "Present",
      remarks: "-",
    },
    {
      id: 2,
      studentName: "Ayesha Ahmed",
      admissionNo: "ADM-2026-002",
      className: "Grade 9-B",
      date: "07 Sep 2026",
      timeIn: "-",
      timeOut: "-",
      status: "Absent",
      remarks: "Medical Leave",
    },
    {
      id: 3,
      studentName: "Ali Farhan",
      admissionNo: "ADM-2026-003",
      className: "Grade 8-A",
      date: "07 Sep 2026",
      timeIn: "08:15 AM",
      timeOut: "02:30 PM",
      status: "Late",
      remarks: "Transportation issue",
    },
    {
      id: 4,
      studentName: "Sara Khan",
      admissionNo: "ADM-2026-004",
      className: "Grade 7-C",
      date: "07 Sep 2026",
      timeIn: "07:50 AM",
      timeOut: "02:30 PM",
      status: "Present",
      remarks: "-",
    },
    {
      id: 5,
      studentName: "Usman Shah",
      admissionNo: "ADM-2026-005",
      className: "Grade 10-B",
      date: "07 Sep 2026",
      timeIn: "07:40 AM",
      timeOut: "02:30 PM",
      status: "Present",
      remarks: "-",
    },
    {
      id: 6,
      studentName: "Fatima Malik",
      admissionNo: "ADM-2026-006",
      className: "Grade 6-A",
      date: "07 Sep 2026",
      timeIn: "-",
      timeOut: "-",
      status: "Absent",
      remarks: "Family Emergency",
    },
    {
      id: 7,
      studentName: "Ahmed Tariq",
      admissionNo: "ADM-2026-007",
      className: "Grade 9-A",
      date: "07 Sep 2026",
      timeIn: "07:55 AM",
      timeOut: "02:30 PM",
      status: "Present",
      remarks: "-",
    },
    {
      id: 8,
      studentName: "Hira Iqbal",
      admissionNo: "ADM-2026-008",
      className: "Grade 8-B",
      date: "07 Sep 2026",
      timeIn: "08:25 AM",
      timeOut: "02:30 PM",
      status: "Late",
      remarks: "Overslept",
    },
  ];

  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(search.toLowerCase()) ||
      record.admissionNo.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      classFilter === "All Classes" ||
      record.className.includes(classFilter);

    const matchesStatus =
      statusFilter === "All Status" || record.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const attendancePerPage = 4;

  const totalPages = Math.ceil(
    filteredAttendance.length / attendancePerPage
  );

  const startIndex = (currentPage - 1) * attendancePerPage;

  const currentAttendance = filteredAttendance.slice(
    startIndex,
    startIndex + attendancePerPage
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return "bg-emerald-100 text-emerald-700";
      case "Absent":
        return "bg-rose-100 text-rose-700";
      case "Late":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle size={14} />;
      case "Absent":
        return <XCircle size={14} />;
      case "Late":
        return <Clock size={14} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold text-indigo-600">
            Admin Panel
          </p>

          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Attendance Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Track and manage student attendance records and reports.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Mark Attendance
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Students</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,248
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <Users size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            Today: 07 Sep 2026
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Present Today</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,156
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            92.6% attendance
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Absent Today</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                72
              </h2>
            </div>

            <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
              <XCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-rose-600">
            5.8% absent
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Late Today</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                20
              </h2>
            </div>

            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <Clock size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-amber-600">
            1.6% late arrivals
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by student name or admission number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

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

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Status</option>
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time In</th>
                <th className="px-6 py-4">Time Out</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Remarks</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentAttendance.length > 0 ? (
                currentAttendance.map((record) => (
                  <tr
                    key={record.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {record.studentName}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {record.admissionNo}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {record.className}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {record.date}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {record.timeIn}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {record.timeOut}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          record.status
                        )}`}
                      >
                        {getStatusIcon(record.status)}
                        {record.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {record.remarks}
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === record.id ? null : record.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === record.id && (
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
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredAttendance.length === 0 ? 0 : startIndex + 1}-
              {Math.min(
                startIndex + attendancePerPage,
                filteredAttendance.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredAttendance.length}
            </span>{" "}
            records
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Mark Attendance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Record student attendance for today.
                </p>
              </div>

              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Student
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select student</option>
                  <option>Hamza Khan (ADM-2026-001)</option>
                  <option>Ayesha Ahmed (ADM-2026-002)</option>
                  <option>Ali Farhan (ADM-2026-003)</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Time In
                </label>

                <input
                  type="time"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Time Out
                </label>

                <input
                  type="time"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Remarks (Optional)
                </label>

                <input
                  type="text"
                  placeholder="Enter remarks if any"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

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
                Mark Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceManagement;
