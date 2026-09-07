import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Layers,
  Users,
  BookOpen,
  Award,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ClassManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [gradeFilter, setGradeFilter] = useState("All Grades");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const classes = [
    {
      id: 1,
      className: "Grade 10-A",
      grade: "Grade 10",
      section: "A",
      classTeacher: "Muhammad Ali",
      totalStudents: 45,
      subjects: 8,
      roomNumber: "101",
      status: "Active",
    },
    {
      id: 2,
      className: "Grade 9-B",
      grade: "Grade 9",
      section: "B",
      classTeacher: "Fatima Noor",
      totalStudents: 42,
      subjects: 8,
      roomNumber: "205",
      status: "Active",
    },
    {
      id: 3,
      className: "Grade 8-A",
      grade: "Grade 8",
      section: "A",
      classTeacher: "Ahmed Khan",
      totalStudents: 38,
      subjects: 7,
      roomNumber: "102",
      status: "Active",
    },
    {
      id: 4,
      className: "Grade 7-C",
      grade: "Grade 7",
      section: "C",
      classTeacher: "Ayesha Malik",
      totalStudents: 40,
      subjects: 7,
      roomNumber: "303",
      status: "Active",
    },
    {
      id: 5,
      className: "Grade 10-B",
      grade: "Grade 10",
      section: "B",
      classTeacher: "Bilal Ahmed",
      totalStudents: 43,
      subjects: 8,
      roomNumber: "104",
      status: "Inactive",
    },
    {
      id: 6,
      className: "Grade 6-A",
      grade: "Grade 6",
      section: "A",
      classTeacher: "Sara Khan",
      totalStudents: 35,
      subjects: 6,
      roomNumber: "201",
      status: "Active",
    },
    {
      id: 7,
      className: "Grade 9-A",
      grade: "Grade 9",
      section: "A",
      classTeacher: "Usman Shah",
      totalStudents: 44,
      subjects: 8,
      roomNumber: "203",
      status: "Active",
    },
    {
      id: 8,
      className: "Grade 8-B",
      grade: "Grade 8",
      section: "B",
      classTeacher: "Hira Ahmad",
      totalStudents: 39,
      subjects: 7,
      roomNumber: "105",
      status: "Inactive",
    },
  ];

  const filteredClasses = classes.filter((classItem) => {
    const matchesSearch =
      classItem.className.toLowerCase().includes(search.toLowerCase()) ||
      classItem.classTeacher.toLowerCase().includes(search.toLowerCase()) ||
      classItem.roomNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || classItem.status === statusFilter;

    const matchesGrade =
      gradeFilter === "All Grades" || classItem.grade === gradeFilter;

    return matchesSearch && matchesStatus && matchesGrade;
  });

  const classesPerPage = 4;

  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const startIndex = (currentPage - 1) * classesPerPage;

  const currentClasses = filteredClasses.slice(
    startIndex,
    startIndex + classesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, gradeFilter]);

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
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold text-indigo-600">
            Admin Panel
          </p>

          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Class Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage classes, sections, teachers and room assignments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add New Class
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Classes</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                32
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <Layers size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            Across all grades
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Students</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,248
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <Users size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            Active enrollment
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Subjects</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                12
              </h2>
            </div>

            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <BookOpen size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            Core curriculum
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Average Students</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                39
              </h2>
            </div>

            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <Award size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            Per class
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
                placeholder="Search by class name, teacher or room number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Grades</option>
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
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Class Name</th>
                <th className="px-6 py-4">Class Teacher</th>
                <th className="px-6 py-4">Total Students</th>
                <th className="px-6 py-4">Subjects</th>
                <th className="px-6 py-4">Room No.</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentClasses.length > 0 ? (
                currentClasses.map((classItem) => (
                  <tr
                    key={classItem.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-sm font-bold text-white">
                          {classItem.section}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {classItem.className}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Section {classItem.section}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {classItem.classTeacher}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {classItem.totalStudents} Students
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {classItem.subjects} Subjects
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      Room {classItem.roomNumber}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          classItem.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            classItem.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          }`}
                        />

                        {classItem.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === classItem.id ? null : classItem.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === classItem.id && (
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
                    colSpan="7"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No classes found.
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
              {filteredClasses.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + classesPerPage, filteredClasses.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredClasses.length}
            </span>{" "}
            classes
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
                  Add New Class
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new class record.
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
                  Grade
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select grade</option>
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Section
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select section</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Class Teacher
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select teacher</option>
                  <option>Muhammad Ali</option>
                  <option>Fatima Noor</option>
                  <option>Ahmed Khan</option>
                  <option>Ayesha Malik</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Room Number
                </label>

                <input
                  type="text"
                  placeholder="e.g. 101"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Total Students
                </label>

                <input
                  type="number"
                  placeholder="Enter capacity"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

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
                Create Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
