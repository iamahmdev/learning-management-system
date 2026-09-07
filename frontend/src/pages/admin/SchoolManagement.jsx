import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  School,
  Users,
  CheckCircle,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";

const SchoolManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const schools = [
    {
      id: 1,
      name: "The Educators School",
      code: "SCH-001",
      principal: "Ahmed Khan",
      city: "Islamabad",
      phone: "051-2345678",
      students: 520,
      teachers: 38,
      status: "Active",
    },
    {
      id: 2,
      name: "Beaconhouse School",
      code: "SCH-002",
      principal: "Ayesha Ahmed",
      city: "Rawalpindi",
      phone: "051-8765432",
      students: 680,
      teachers: 46,
      status: "Active",
    },
    {
      id: 3,
      name: "Roots Millennium School",
      code: "SCH-003",
      principal: "Ali Farhan",
      city: "Islamabad",
      phone: "051-3456789",
      students: 745,
      teachers: 52,
      status: "Active",
    },
    {
      id: 4,
      name: "City School Campus",
      code: "SCH-004",
      principal: "Sara Khan",
      city: "Lahore",
      phone: "042-4567890",
      students: 430,
      teachers: 31,
      status: "Active",
    },
    {
      id: 5,
      name: "Army Public School",
      code: "SCH-005",
      principal: "Usman Shah",
      city: "Peshawar",
      phone: "091-2345678",
      students: 610,
      teachers: 41,
      status: "Inactive",
    },
    {
      id: 6,
      name: "Froebel's International School",
      code: "SCH-006",
      principal: "Fatima Malik",
      city: "Islamabad",
      phone: "051-5678901",
      students: 390,
      teachers: 29,
      status: "Active",
    },
    {
      id: 7,
      name: "Pak-Turk Maarif School",
      code: "SCH-007",
      principal: "Ahmed Tariq",
      city: "Lahore",
      phone: "042-6789012",
      students: 560,
      teachers: 37,
      status: "Active",
    },
    {
      id: 8,
      name: "Islamia College School",
      code: "SCH-008",
      principal: "Hira Iqbal",
      city: "Peshawar",
      phone: "091-7890123",
      students: 475,
      teachers: 34,
      status: "Inactive",
    },
  ];

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(search.toLowerCase()) ||
      school.code.toLowerCase().includes(search.toLowerCase()) ||
      school.principal.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      school.status === statusFilter;

    const matchesCity =
      cityFilter === "All Cities" || school.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  const schoolsPerPage = 4;

  const totalPages = Math.ceil(
    filteredSchools.length / schoolsPerPage
  );

  const startIndex = (currentPage - 1) * schoolsPerPage;

  const currentSchools = filteredSchools.slice(
    startIndex,
    startIndex + schoolsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, cityFilter]);

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
    return status === "Active"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-rose-100 text-rose-700";
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
            School Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage schools, principals, students, teachers and school information.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add New School
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Schools</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                24
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <School size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-indigo-600">
            Registered schools
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Schools</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                21
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            Currently operational
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Students</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                12,480
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Users size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-blue-600">
            Across all schools
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Inactive Schools</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                3
              </h2>
            </div>

            <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
              <XCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-rose-600">
            Currently inactive
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search by school name, code or principal..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Cities</option>
              <option>Islamabad</option>
              <option>Rawalpindi</option>
              <option>Lahore</option>
              <option>Peshawar</option>
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">School</th>
                <th className="px-6 py-4">Principal</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Teachers</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentSchools.length > 0 ? (
                currentSchools.map((school) => (
                  <tr
                    key={school.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                          <School size={20} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {school.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Code: {school.code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {school.principal}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <MapPin size={15} className="text-slate-400" />
                        {school.city}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Phone size={15} className="text-slate-400" />
                        {school.phone}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      {school.students}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-purple-600">
                      {school.teachers}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          school.status
                        )}`}
                      >
                        {school.status === "Active" ? (
                          <CheckCircle size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {school.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === school.id ? null : school.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === school.id && (
                        <div className="absolute right-6 top-14 z-20 w-40 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View Details
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
                    No schools found.
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
              {filteredSchools.length === 0 ? 0 : startIndex + 1}-
              {Math.min(
                startIndex + schoolsPerPage,
                filteredSchools.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredSchools.length}
            </span>{" "}
            schools
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
              disabled={
                currentPage === totalPages || totalPages === 0
              }
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Add School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add New School
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new school to the management system.
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
                  School Name
                </label>

                <input
                  type="text"
                  placeholder="Enter school name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  School Code
                </label>

                <input
                  type="text"
                  placeholder="e.g. SCH-009"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Principal
                </label>

                <input
                  type="text"
                  placeholder="Enter principal name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  City
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select city</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                  <option>Lahore</option>
                  <option>Peshawar</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  type="text"
                  placeholder="Enter school phone"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Address
                </label>

                <textarea
                  rows="3"
                  placeholder="Enter complete school address"
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Total Students
                </label>

                <input
                  type="number"
                  placeholder="Enter total students"
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
                Add School
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;

