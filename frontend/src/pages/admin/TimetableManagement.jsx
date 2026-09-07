import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  Clock,
  Users,
  BookOpen,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const TimetableManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [dayFilter, setDayFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [timetables] = useState([
    {
      id: 1,
      className: "Grade 10-A",
      day: "Monday",
      subject: "Mathematics",
      teacher: "Ahmed Khan",
      startTime: "08:00 AM",
      endTime: "08:45 AM",
      room: "Room 101",
      status: "Active",
    },
    {
      id: 2,
      className: "Grade 10-A",
      day: "Monday",
      subject: "English",
      teacher: "Sara Ahmed",
      startTime: "08:45 AM",
      endTime: "09:30 AM",
      room: "Room 101",
      status: "Active",
    },
    {
      id: 3,
      className: "Grade 9-B",
      day: "Tuesday",
      subject: "Physics",
      teacher: "Usman Ali",
      startTime: "09:00 AM",
      endTime: "09:45 AM",
      room: "Room 204",
      status: "Active",
    },
    {
      id: 4,
      className: "Grade 8-A",
      day: "Wednesday",
      subject: "Computer Science",
      teacher: "Hamza Malik",
      startTime: "10:00 AM",
      endTime: "10:45 AM",
      room: "Lab 01",
      status: "Active",
    },
    {
      id: 5,
      className: "Grade 7-C",
      day: "Thursday",
      subject: "Science",
      teacher: "Ayesha Khan",
      startTime: "08:00 AM",
      endTime: "08:45 AM",
      room: "Room 302",
      status: "Active",
    },
    {
      id: 6,
      className: "Grade 10-B",
      day: "Friday",
      subject: "Chemistry",
      teacher: "Bilal Shah",
      startTime: "09:45 AM",
      endTime: "10:30 AM",
      room: "Lab 02",
      status: "Active",
    },
    {
      id: 7,
      className: "Grade 9-A",
      day: "Monday",
      subject: "Urdu",
      teacher: "Fatima Noor",
      startTime: "11:00 AM",
      endTime: "11:45 AM",
      room: "Room 205",
      status: "Inactive",
    },
    {
      id: 8,
      className: "Grade 8-B",
      day: "Wednesday",
      subject: "Islamiyat",
      teacher: "Muhammad Asif",
      startTime: "12:00 PM",
      endTime: "12:45 PM",
      room: "Room 203",
      status: "Active",
    },
  ]);

  const itemsPerPage = 4;

  const filteredTimetables = timetables.filter((item) => {
    const matchesSearch =
      item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.room.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      classFilter === "All" || item.className === classFilter;

    const matchesDay = dayFilter === "All" || item.day === dayFilter;

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesClass && matchesDay && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTimetables.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentTimetables = filteredTimetables.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, classFilter, dayFilter, statusFilter]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-700";
    }

    return "bg-rose-50 text-rose-700";
  };

  const getStatusIcon = (status) => {
    if (status === "Active") {
      return <CheckCircle size={15} />;
    }

    return <AlertCircle size={15} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Timetable Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage school class timetables and schedules.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Timetable
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Schedules</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">186</h3>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <CalendarDays size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Schedules</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">172</h3>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Classes</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">32</h3>
            </div>

            <div className="rounded-lg bg-violet-50 p-3 text-violet-600">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Subjects Scheduled</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">24</h3>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
              <BookOpen size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search timetable..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Classes</option>
            <option value="Grade 10-A">Grade 10-A</option>
            <option value="Grade 10-B">Grade 10-B</option>
            <option value="Grade 9-A">Grade 9-A</option>
            <option value="Grade 9-B">Grade 9-B</option>
            <option value="Grade 8-A">Grade 8-A</option>
            <option value="Grade 8-B">Grade 8-B</option>
            <option value="Grade 7-C">Grade 7-C</option>
          </select>

          <select
            value={dayFilter}
            onChange={(e) => setDayFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Days</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Class
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Day
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Subject
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Teacher
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Time
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Room
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentTimetables.length > 0 ? (
                currentTimetables.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800">
                        {item.className}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.day}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <BookOpen size={16} className="text-blue-500" />
                        {item.subject}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.teacher}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={15} className="text-slate-400" />
                        {item.startTime} - {item.endTime}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.room}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item.id ? null : item.id)
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === item.id && (
                        <div className="absolute right-5 top-12 z-20 w-44 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">
                          <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View Details
                          </button>

                          <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                            <Edit size={16} />
                            Edit
                          </button>

                          <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50">
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
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No timetable records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filteredTimetables.length === 0 ? 0 : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-slate-700">
              {Math.min(
                startIndex + itemsPerPage,
                filteredTimetables.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              {filteredTimetables.length}
            </span>{" "}
            schedules
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Timetable Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Add Timetable
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Create a new class timetable schedule.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Class
                </label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Select Class</option>
                  <option>Grade 10-A</option>
                  <option>Grade 10-B</option>
                  <option>Grade 9-A</option>
                  <option>Grade 9-B</option>
                  <option>Grade 8-A</option>
                  <option>Grade 8-B</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Day
                </label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Select Day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Select Subject</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Computer Science</option>
                  <option>Science</option>
                  <option>Urdu</option>
                  <option>Islamiyat</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Teacher
                </label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Select Teacher</option>
                  <option>Ahmed Khan</option>
                  <option>Sara Ahmed</option>
                  <option>Usman Ali</option>
                  <option>Hamza Malik</option>
                  <option>Ayesha Khan</option>
                  <option>Bilal Shah</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Start Time
                </label>
                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  End Time
                </label>
                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Room
                </label>
                <input
                  type="text"
                  placeholder="e.g. Room 101"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Save Timetable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableManagement;
