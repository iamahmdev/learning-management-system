import { useState, useEffect } from "react";
import { Search, Plus, Calendar, TrendingUp, CheckCircle, ChevronLeft, ChevronRight, MoreVertical, Eye, Edit, Trash2, X } from "lucide-react";

const AcademicSessionManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sessions = [
    { id: 1, name: "Academic Year 2026-2027", startDate: "01 Aug 2026", endDate: "30 Jun 2027", term: "Full Year", totalStudents: 1248, status: "Active" },
    { id: 2, name: "Academic Year 2025-2026", startDate: "01 Aug 2025", endDate: "30 Jun 2026", term: "Full Year", totalStudents: 1156, status: "Completed" },
    { id: 3, name: "Spring Term 2026", startDate: "01 Jan 2026", endDate: "30 Apr 2026", term: "Spring", totalStudents: 1180, status: "Completed" },
    { id: 4, name: "Fall Term 2025", startDate: "01 Sep 2025", endDate: "31 Dec 2025", term: "Fall", totalStudents: 1165, status: "Completed" },
    { id: 5, name: "Summer Term 2025", startDate: "01 May 2025", endDate: "31 Aug 2025", term: "Summer", totalStudents: 980, status: "Completed" },
    { id: 6, name: "Academic Year 2024-2025", startDate: "01 Aug 2024", endDate: "30 Jun 2025", term: "Full Year", totalStudents: 1098, status: "Completed" },
    { id: 7, name: "Spring Term 2025", startDate: "01 Jan 2025", endDate: "30 Apr 2025", term: "Spring", totalStudents: 1105, status: "Completed" },
    { id: 8, name: "Fall Term 2024", startDate: "01 Sep 2024", endDate: "31 Dec 2024", term: "Fall", totalStudents: 1090, status: "Completed" },
  ];

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.name.toLowerCase().includes(search.toLowerCase()) || session.term.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sessionsPerPage = 4;
  const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);
  const startIndex = (currentPage - 1) * sessionsPerPage;
  const currentSessions = filteredSessions.slice(startIndex, startIndex + sessionsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search, statusFilter]);
  const goToPage = (page) => { if (page >= 1 && page <= totalPages) { setCurrentPage(page); setOpenMenu(null); } };
  const getPageNumbers = () => Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold text-indigo-600">Admin Panel</p>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Academic Session Management</h1>
          <p className="mt-1 text-sm text-slate-500">Manage academic years, terms and enrollment periods.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl">
          <Plus size={18} />Add New Session</button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Total Sessions</p><h2 className="mt-1 text-2xl font-bold text-slate-800">8</h2></div>
            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600"><Calendar size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">All time</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Active Session</p><h2 className="mt-1 text-2xl font-bold text-slate-800">1</h2></div>
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600"><CheckCircle size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-emerald-600">2026-2027</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Current Students</p><h2 className="mt-1 text-2xl font-bold text-slate-800">1,248</h2></div>
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600"><TrendingUp size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-purple-600">+8% from last year</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Completed</p><h2 className="mt-1 text-2xl font-bold text-slate-800">7</h2></div>
            <div className="rounded-xl bg-amber-100 p-3 text-amber-600"><Calendar size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">Past sessions</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search by session name or term..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option>All Status</option><option>Active</option><option>Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Session Name</th><th className="px-6 py-4">Start Date</th><th className="px-6 py-4">End Date</th><th className="px-6 py-4">Term</th><th className="px-6 py-4">Students</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentSessions.length > 0 ? (
                currentSessions.map((session) => (
                  <tr key={session.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-sm font-bold text-white">{session.name.match(/\d{4}/)?.[0].slice(-2) || "AS"}</div><p className="font-semibold text-slate-800">{session.name}</p></div></td>
                    <td className="px-6 py-4 text-sm text-slate-600">{session.startDate}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{session.endDate}</td>
                    <td className="px-6 py-4"><span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{session.term}</span></td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{session.totalStudents}</td>
                    <td className="px-6 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${session.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"}`}><span className={`h-1.5 w-1.5 rounded-full ${session.status === "Active" ? "bg-emerald-500" : "bg-slate-500"}`} />{session.status}</span></td>
                    <td className="relative px-6 py-4 text-right">
                      <button onClick={() => setOpenMenu(openMenu === session.id ? null : session.id)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"><MoreVertical size={19} /></button>
                      {openMenu === session.id && (
                        <div className="absolute right-6 top-14 z-20 w-40 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"><Eye size={16} />View</button>
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"><Edit size={16} />Edit</button>
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"><Trash2 size={16} />Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (<tr><td colSpan="7" className="px-6 py-12 text-center text-sm text-slate-500">No sessions found.</td></tr>)}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-700">{filteredSessions.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + sessionsPerPage, filteredSessions.length)}</span> of <span className="font-semibold text-slate-700">{filteredSessions.length}</span> sessions</p>
          <div className="flex items-center gap-2">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1 || totalPages === 0} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={17} /></button>
            {getPageNumbers().map((page) => (<button key={page} onClick={() => goToPage(page)} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${currentPage === page ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{page}</button>))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={17} /></button>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div><h2 className="text-xl font-bold text-slate-800">Add New Session</h2><p className="mt-1 text-sm text-slate-500">Create a new academic session.</p></div>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className="mb-1.5 block text-sm font-medium text-slate-700">Session Name</label><input type="text" placeholder="e.g. Academic Year 2027-2028" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Start Date</label><input type="date" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">End Date</label><input type="date" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Term</label><select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"><option>Full Year</option><option>Spring</option><option>Fall</option><option>Summer</option></select></div>
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label><select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"><option>Active</option><option>Completed</option></select></div>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
              <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-md">Create Session</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicSessionManagement;
