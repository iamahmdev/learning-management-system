import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

const ExamManagement = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const exams = [
    {
      id: 1,
      examName: "Mid-Term Examination 2026",
      className: "Grade 10-A",
      subject: "Mathematics",
      date: "15 Sep 2026",
      time: "09:00 AM - 11:00 AM",
      duration: "2 Hours",
      totalMarks: 100,
      status: "Scheduled",
    },
    {
      id: 2,
      examName: "Mid-Term Examination 2026",
      className: "Grade 9-B",
      subject: "English",
      date: "16 Sep 2026",
      time: "09:00 AM - 11:00 AM",
      duration: "2 Hours",
      totalMarks: 100,
      status: "Scheduled",
    },
    {
      id: 3,
      examName: "Quiz Test",
      className: "Grade 8-A",
      subject: "Physics",
      date: "05 Sep 2026",
      time: "10:00 AM - 11:00 AM",
      duration: "1 Hour",
      totalMarks: 50,
      status: "Completed",
    },
    {
      id: 4,
      examName: "Mid-Term Examination 2026",
      className: "Grade 7-C",
      subject: "Biology",
      date: "18 Sep 2026",
      time: "09:00 AM - 11:00 AM",
      duration: "2 Hours",
      totalMarks: 100,
      status: "Scheduled",
    },
    {
      id: 5,
      examName: "Final Term Examination 2026",
      className: "Grade 10-B",
      subject: "Chemistry",
      date: "10 Nov 2026",
      time: "09:00 AM - 12:00 PM",
      duration: "3 Hours",
      totalMarks: 150,
      status: "Upcoming",
    },
    {
      id: 6,
      examName: "Mid-Term Examination 2026",
      className: "Grade 6-A",
      subject: "Urdu",
      date: "20 Sep 2026",
      time: "09:00 AM - 11:00 AM",
      duration: "2 Hours",
      totalMarks: 100,
      status: "Scheduled",
    },
    {
      id: 7,
      examName: "Mock Examination 2026",
      className: "Grade 9-A",
      subject: "Computer Science",
      date: "25 Sep 2026",
      time: "10:00 AM - 12:00 PM",
      duration: "2 Hours",
      totalMarks: 100,
      status: "Scheduled",
    },
    {
      id: 8,
      examName: "Quiz Test",
      className: "Grade 8-B",
      subject: "Islamiyat",
      date: "04 Sep 2026",
      time: "11:00 AM - 12:00 PM",
      duration: "1 Hour",
      totalMarks: 50,
      status: "Completed",
    },
  ];

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.examName.toLowerCase().includes(search.toLowerCase()) ||
      exam.subject.toLowerCase().includes(search.toLowerCase()) ||
      exam.className.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      classFilter === "All Classes" ||
      exam.className.includes(classFilter);

    const matchesStatus =
      statusFilter === "All Status" || exam.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const examsPerPage = 4;

  const totalPages = Math.ceil(filteredExams.length / examsPerPage);

  const startIndex = (currentPage - 1) * examsPerPage;

  const currentExams = filteredExams.slice(
    startIndex,
    startIndex + examsPerPage
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
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "Upcoming":
        return "bg-amber-100 text-amber-700";
      case "Cancelled":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Scheduled":
        return <Calendar size={14} />;
      case "Completed":
        return <CheckCircle size={14} />;
      case "Upcoming":
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
            Exam Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Schedule and manage exams, tests and assessments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Schedule Exam
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Exams</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                156
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <BookOpen size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            This academic year
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Scheduled</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                42
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Calendar size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-blue-600">
            This month
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Completed</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                98
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            Results published
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Upcoming</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                16
              </h2>
            </div>

            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <Clock size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-amber-600">
            Next 30 days
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
                placeholder="Search by exam name, subject or class..."
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
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Upcoming</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Exam Name</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentExams.length > 0 ? (
                currentExams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {exam.examName}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          Total Marks: {exam.totalMarks}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {exam.className}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {exam.subject}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {exam.date}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {exam.time}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {exam.duration}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          exam.status
                        )}`}
                      >
                        {getStatusIcon(exam.status)}
                        {exam.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === exam.id ? null : exam.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === exam.id && (
                        <div className="absolute right-6 top-14 z-20 w-44 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View Details
                          </button>

                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <FileText size={16} />
                            Question Paper
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
                    No exams found.
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
              {filteredExams.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + examsPerPage, filteredExams.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredExams.length}
            </span>{" "}
            exams
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
                  Schedule Exam
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new exam schedule.
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
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Exam Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Mid-Term Examination 2026"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

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

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Subject
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select subject</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Computer Science</option>
                  <option>Urdu</option>
                  <option>Islamiyat</option>
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
                  Start Time
                </label>

                <input
                  type="time"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Duration (Hours)
                </label>

                <input
                  type="number"
                  placeholder="e.g. 2"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Total Marks
                </label>

                <input
                  type="number"
                  placeholder="e.g. 100"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Scheduled</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                </select>
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
                Schedule Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManagement;
