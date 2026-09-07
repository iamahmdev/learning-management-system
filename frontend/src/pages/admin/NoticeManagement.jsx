import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Megaphone,
} from "lucide-react";

const NoticeManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [audienceFilter, setAudienceFilter] = useState("All Audience");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const notices = [
    {
      id: 1,
      title: "Annual Sports Day 2026",
      description: "Annual sports day will be held on the school ground.",
      audience: "All",
      publishDate: "05 Sep 2026",
      expiryDate: "20 Sep 2026",
      status: "Published",
      priority: "High",
    },
    {
      id: 2,
      title: "Parent Teacher Meeting",
      description: "Parent teacher meeting for all classes.",
      audience: "Parents",
      publishDate: "04 Sep 2026",
      expiryDate: "15 Sep 2026",
      status: "Published",
      priority: "High",
    },
    {
      id: 3,
      title: "Mid Term Examination Schedule",
      description: "Mid term examination schedule has been announced.",
      audience: "Students",
      publishDate: "03 Sep 2026",
      expiryDate: "30 Sep 2026",
      status: "Published",
      priority: "High",
    },
    {
      id: 4,
      title: "Teacher Staff Meeting",
      description: "Monthly staff meeting for all teaching staff.",
      audience: "Teachers",
      publishDate: "02 Sep 2026",
      expiryDate: "10 Sep 2026",
      status: "Published",
      priority: "Normal",
    },
    {
      id: 5,
      title: "School Holiday Notice",
      description: "School will remain closed on the announced holiday.",
      audience: "All",
      publishDate: "01 Sep 2026",
      expiryDate: "12 Sep 2026",
      status: "Scheduled",
      priority: "Normal",
    },
    {
      id: 6,
      title: "Fee Submission Reminder",
      description: "Students are reminded to submit pending fee dues.",
      audience: "Parents",
      publishDate: "30 Aug 2026",
      expiryDate: "10 Sep 2026",
      status: "Published",
      priority: "High",
    },
    {
      id: 7,
      title: "Library Book Return Reminder",
      description: "Please return all overdue library books.",
      audience: "Students",
      publishDate: "28 Aug 2026",
      expiryDate: "08 Sep 2026",
      status: "Expired",
      priority: "Normal",
    },
    {
      id: 8,
      title: "Teacher Training Workshop",
      description: "Professional development workshop for teachers.",
      audience: "Teachers",
      publishDate: "27 Aug 2026",
      expiryDate: "07 Sep 2026",
      status: "Published",
      priority: "Normal",
    },
  ];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || notice.status === statusFilter;

    const matchesAudience =
      audienceFilter === "All Audience" ||
      notice.audience === audienceFilter;

    return matchesSearch && matchesStatus && matchesAudience;
  });

  const noticesPerPage = 4;

  const totalPages = Math.ceil(
    filteredNotices.length / noticesPerPage
  );

  const startIndex = (currentPage - 1) * noticesPerPage;

  const currentNotices = filteredNotices.slice(
    startIndex,
    startIndex + noticesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, audienceFilter]);

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
      case "Published":
        return "bg-emerald-100 text-emerald-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Expired":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Published":
        return <CheckCircle size={14} />;
      case "Scheduled":
        return <Clock size={14} />;
      case "Expired":
        return <AlertCircle size={14} />;
      default:
        return null;
    }
  };

  const getPriorityStyle = (priority) => {
    return priority === "High"
      ? "bg-rose-100 text-rose-700"
      : "bg-slate-100 text-slate-600";
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
            Notice Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create, publish and manage school notices and announcements.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Create Notice
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Notices</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                128
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <Bell size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-indigo-600">
            All announcements
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Published</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                96
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            Currently active
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Scheduled</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                18
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Clock size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-blue-600">
            Upcoming notices
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">High Priority</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                14
              </h2>
            </div>

            <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
              <AlertCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-rose-600">
            Requires attention
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
                placeholder="Search by notice title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Audience</option>
              <option>All</option>
              <option>Students</option>
              <option>Parents</option>
              <option>Teachers</option>
              <option>Staff</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Status</option>
              <option>Published</option>
              <option>Scheduled</option>
              <option>Expired</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Notice</th>
                <th className="px-6 py-4">Audience</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentNotices.length > 0 ? (
                currentNotices.map((notice) => (
                  <tr
                    key={notice.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                          <Megaphone size={20} />
                        </div>

                        <div className="max-w-[330px]">
                          <p className="font-semibold text-slate-800">
                            {notice.title}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {notice.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                        {notice.audience}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {notice.publishDate}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {notice.expiryDate}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                          notice.priority
                        )}`}
                      >
                        {notice.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          notice.status
                        )}`}
                      >
                        {getStatusIcon(notice.status)}
                        {notice.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === notice.id ? null : notice.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === notice.id && (
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
                    colSpan="7"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No notices found.
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
              {filteredNotices.length === 0 ? 0 : startIndex + 1}-
              {Math.min(
                startIndex + noticesPerPage,
                filteredNotices.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredNotices.length}
            </span>{" "}
            notices
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

      {/* Add Notice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Create New Notice
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Publish a new announcement for your school.
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
                  Notice Title
                </label>

                <input
                  type="text"
                  placeholder="Enter notice title"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Write notice details..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Audience
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>All</option>
                  <option>Students</option>
                  <option>Parents</option>
                  <option>Teachers</option>
                  <option>Staff</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Publish Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Expiry Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Published</option>
                  <option>Scheduled</option>
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
                Create Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticeManagement;
