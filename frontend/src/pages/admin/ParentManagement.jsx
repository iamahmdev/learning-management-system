import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Baby,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ParentManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [relationFilter, setRelationFilter] = useState("All Relations");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const parents = [
    {
      id: 1,
      name: "Khalid Mahmood",
      email: "khalid.mahmood@example.com",
      phone: "+92 300 1234567",
      relation: "Father",
      studentName: "Hamza Khalid",
      occupation: "Business Owner",
      status: "Active",
      registered: "01 Sep 2026",
    },
    {
      id: 2,
      name: "Nazia Ahmed",
      email: "nazia.ahmed@example.com",
      phone: "+92 301 2345678",
      relation: "Mother",
      studentName: "Ayesha Ahmed",
      occupation: "Teacher",
      status: "Active",
      registered: "28 Aug 2026",
    },
    {
      id: 3,
      name: "Farhan Ali",
      email: "farhan.ali@example.com",
      phone: "+92 302 3456789",
      relation: "Father",
      studentName: "Ali Farhan",
      occupation: "Engineer",
      status: "Active",
      registered: "25 Aug 2026",
    },
    {
      id: 4,
      name: "Samina Khan",
      email: "samina.khan@example.com",
      phone: "+92 303 4567890",
      relation: "Mother",
      studentName: "Sara Khan",
      occupation: "Doctor",
      status: "Active",
      registered: "22 Aug 2026",
    },
    {
      id: 5,
      name: "Imran Shah",
      email: "imran.shah@example.com",
      phone: "+92 304 5678901",
      relation: "Guardian",
      studentName: "Usman Shah",
      occupation: "Bank Manager",
      status: "Inactive",
      registered: "20 Aug 2026",
    },
    {
      id: 6,
      name: "Rabia Malik",
      email: "rabia.malik@example.com",
      phone: "+92 305 6789012",
      relation: "Mother",
      studentName: "Fatima Malik",
      occupation: "Homemaker",
      status: "Active",
      registered: "18 Aug 2026",
    },
    {
      id: 7,
      name: "Tariq Hussain",
      email: "tariq.hussain@example.com",
      phone: "+92 306 7890123",
      relation: "Father",
      studentName: "Ahmed Tariq",
      occupation: "Lawyer",
      status: "Active",
      registered: "15 Aug 2026",
    },
    {
      id: 8,
      name: "Sadia Iqbal",
      email: "sadia.iqbal@example.com",
      phone: "+92 307 8901234",
      relation: "Guardian",
      studentName: "Hira Iqbal",
      occupation: "Accountant",
      status: "Inactive",
      registered: "12 Aug 2026",
    },
  ];

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(search.toLowerCase()) ||
      parent.email.toLowerCase().includes(search.toLowerCase()) ||
      parent.studentName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || parent.status === statusFilter;

    const matchesRelation =
      relationFilter === "All Relations" ||
      parent.relation === relationFilter;

    return matchesSearch && matchesStatus && matchesRelation;
  });

  const parentsPerPage = 4;

  const totalPages = Math.ceil(filteredParents.length / parentsPerPage);

  const startIndex = (currentPage - 1) * parentsPerPage;

  const currentParents = filteredParents.slice(
    startIndex,
    startIndex + parentsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, relationFilter]);

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
            Parent Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage parent accounts, contact details and student relationships.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add New Parent
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Parents</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                924
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <Users size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            +12 new this month
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Parents</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                876
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <UserCheck size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            95% active
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Inactive Parents</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                48
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

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Students Linked</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,248
              </h2>
            </div>

            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <Baby size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-slate-400">
            Parent-student connections
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
                placeholder="Search by parent name, email or student name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={relationFilter}
              onChange={(e) => setRelationFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Relations</option>
              <option>Father</option>
              <option>Mother</option>
              <option>Guardian</option>
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
                <th className="px-6 py-4">Parent</th>
                <th className="px-6 py-4">Relation</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Occupation</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Registered</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentParents.length > 0 ? (
                currentParents.map((parent) => (
                  <tr
                    key={parent.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-sm font-bold text-white">
                          {parent.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {parent.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {parent.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {parent.relation}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {parent.studentName}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {parent.occupation}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {parent.phone}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          parent.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            parent.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          }`}
                        />

                        {parent.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {parent.registered}
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === parent.id ? null : parent.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === parent.id && (
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
                    No parents found.
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
              {filteredParents.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + parentsPerPage, filteredParents.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredParents.length}
            </span>{" "}
            parents
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
                  Add New Parent
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new parent/guardian account.
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
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter parent full name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

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

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone
                </label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Relation
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select relation</option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Guardian</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Student Name
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select student</option>
                  <option>Hamza Khan</option>
                  <option>Ayesha Ahmed</option>
                  <option>Ali Farhan</option>
                  <option>Sara Khan</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Occupation
                </label>

                <input
                  type="text"
                  placeholder="Enter occupation"
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
                Create Parent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentManagement;
