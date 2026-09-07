import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Award,
  TrendingUp,
  TrendingDown,
  Target,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

const ResultManagement = () => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [examFilter, setExamFilter] = useState("All Exams");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const results = [
    {
      id: 1,
      studentName: "Hamza Khan",
      admissionNo: "ADM-2026-001",
      className: "Grade 10-A",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 435,
      percentage: "87%",
      grade: "A",
      status: "Pass",
    },
    {
      id: 2,
      studentName: "Ayesha Ahmed",
      admissionNo: "ADM-2026-002",
      className: "Grade 9-B",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 458,
      percentage: "91.6%",
      grade: "A+",
      status: "Pass",
    },
    {
      id: 3,
      studentName: "Ali Farhan",
      admissionNo: "ADM-2026-003",
      className: "Grade 8-A",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 375,
      percentage: "75%",
      grade: "B",
      status: "Pass",
    },
    {
      id: 4,
      studentName: "Sara Khan",
      admissionNo: "ADM-2026-004",
      className: "Grade 7-C",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 410,
      percentage: "82%",
      grade: "A",
      status: "Pass",
    },
    {
      id: 5,
      studentName: "Usman Shah",
      admissionNo: "ADM-2026-005",
      className: "Grade 10-B",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 315,
      percentage: "63%",
      grade: "C",
      status: "Pass",
    },
    {
      id: 6,
      studentName: "Fatima Malik",
      admissionNo: "ADM-2026-006",
      className: "Grade 6-A",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 425,
      percentage: "85%",
      grade: "A",
      status: "Pass",
    },
    {
      id: 7,
      studentName: "Ahmed Tariq",
      admissionNo: "ADM-2026-007",
      className: "Grade 9-A",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 465,
      percentage: "93%",
      grade: "A+",
      status: "Pass",
    },
    {
      id: 8,
      studentName: "Hira Iqbal",
      admissionNo: "ADM-2026-008",
      className: "Grade 8-B",
      examType: "Mid-Term 2026",
      totalMarks: 500,
      obtainedMarks: 285,
      percentage: "57%",
      grade: "D",
      status: "Needs Improvement",
    },
  ];

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.studentName.toLowerCase().includes(search.toLowerCase()) ||
      result.admissionNo.toLowerCase().includes(search.toLowerCase());

    const matchesClass =
      classFilter === "All Classes" ||
      result.className.includes(classFilter);

    const matchesExam =
      examFilter === "All Exams" || result.examType === examFilter;

    return matchesSearch && matchesClass && matchesExam;
  });

  const resultsPerPage = 4;

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const startIndex = (currentPage - 1) * resultsPerPage;

  const currentResults = filteredResults.slice(
    startIndex,
    startIndex + resultsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, classFilter, examFilter]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setOpenMenu(null);
    }
  };

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  const getGradeStyle = (grade) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-100 text-emerald-700";
      case "A":
        return "bg-green-100 text-green-700";
      case "B":
        return "bg-blue-100 text-blue-700";
      case "C":
        return "bg-amber-100 text-amber-700";
      case "D":
        return "bg-orange-100 text-orange-700";
      case "F":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
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
            Result Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage student exam results, grades and performance reports.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add Result
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Results</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,248
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <Award size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            Mid-Term 2026
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Average Score</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                82.4%
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <TrendingUp size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            +5.2% from last exam
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pass Rate</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                94.5%
              </h2>
            </div>

            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <Target size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-purple-600">
            1,180 students passed
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Need Improvement</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                68
              </h2>
            </div>

            <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
              <TrendingDown size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-rose-600">
            Requires attention
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
              value={examFilter}
              onChange={(e) => setExamFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Exams</option>
              <option>Mid-Term 2026</option>
              <option>Final Term 2026</option>
              <option>Mock Exam 2026</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Exam Type</th>
                <th className="px-6 py-4">Total Marks</th>
                <th className="px-6 py-4">Obtained</th>
                <th className="px-6 py-4">Percentage</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentResults.length > 0 ? (
                currentResults.map((result) => (
                  <tr
                    key={result.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {result.studentName}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {result.admissionNo}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {result.className}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {result.examType}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {result.totalMarks}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {result.obtainedMarks}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {result.percentage}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getGradeStyle(
                          result.grade
                        )}`}
                      >
                        {result.grade}
                      </span>
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === result.id ? null : result.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === result.id && (
                        <div className="absolute right-6 top-14 z-20 w-44 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View Details
                          </button>

                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Download size={16} />
                            Download Report
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
                    No results found.
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
              {filteredResults.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + resultsPerPage, filteredResults.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredResults.length}
            </span>{" "}
            results
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
                  Add Exam Result
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter student exam result details.
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
                  Exam Type
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select exam</option>
                  <option>Mid-Term 2026</option>
                  <option>Final Term 2026</option>
                  <option>Mock Exam 2026</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Total Marks
                </label>

                <input
                  type="number"
                  placeholder="Enter total marks"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Obtained Marks
                </label>

                <input
                  type="number"
                  placeholder="Enter obtained marks"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Grade
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select grade</option>
                  <option>A+</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>F</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Pass</option>
                  <option>Fail</option>
                  <option>Needs Improvement</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Remarks (Optional)
                </label>

                <textarea
                  rows="3"
                  placeholder="Enter remarks or comments"
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
                Create Result
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultManagement;
