import { useState, useEffect } from "react";
import { Search, Plus, BookOpen, Award, Users, ChevronLeft, ChevronRight, MoreVertical, Eye, Edit, Trash2, X } from "lucide-react";

const SubjectManagement = () => {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All Grades");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const subjects = [
    { id: 1, name: "Mathematics", code: "MATH-101", grade: "Grade 10", type: "Core", teacher: "Muhammad Ali", students: 120, status: "Active" },
    { id: 2, name: "English", code: "ENG-101", grade: "Grade 10", type: "Core", teacher: "Fatima Noor", students: 120, status: "Active" },
    { id: 3, name: "Physics", code: "PHY-101", grade: "Grade 10", type: "Science", teacher: "Ahmed Khan", students: 115, status: "Active" },
    { id: 4, name: "Chemistry", code: "CHEM-101", grade: "Grade 10", type: "Science", teacher: "Sara Khan", students: 115, status: "Active" },
    { id: 5, name: "Biology", code: "BIO-101", grade: "Grade 10", type: "Science", teacher: "Bilal Ahmed", students: 110, status: "Active" },
    { id: 6, name: "Computer Science", code: "CS-101", grade: "Grade 9", type: "Elective", teacher: "Ayesha Malik", students: 85, status: "Active" },
    { id: 7, name: "Urdu", code: "URD-101", grade: "Grade 9", type: "Core", teacher: "Usman Shah", students: 100, status: "Active" },
    { id: 8, name: "Islamiyat", code: "ISL-101", grade: "Grade 8", type: "Core", teacher: "Hira Ahmad", students: 95, status: "Inactive" },
  ];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch = subject.name.toLowerCase().includes(search.toLowerCase()) || subject.code.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "All Grades" || subject.grade === gradeFilter;
    const matchesType = typeFilter === "All Types" || subject.type === typeFilter;
    return matchesSearch && matchesGrade && matchesType;
  });

  const subjectsPerPage = 4;
  const totalPages = Math.ceil(filteredSubjects.length / subjectsPerPage);
  const startIndex = (currentPage - 1) * subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(startIndex, startIndex + subjectsPerPage);

  useEffect(() => { setCurrentPage(1); }, [search, gradeFilter, typeFilter]);
  const goToPage = (page) => { if (page >= 1 && page <= totalPages) { setCurrentPage(page); setOpenMenu(null); } };
  const getPageNumbers = () => Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold text-indigo-600">Admin Panel</p>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Subject Management</h1>
          <p className="mt-1 text-sm text-slate-500">Manage subjects, curriculum and teacher assignments.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl">
          <Plus size={18} />Add New Subject</button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Total Subjects</p><h2 className="mt-1 text-2xl font-bold text-slate-800">12</h2></div>
            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600"><BookOpen size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-emerald-600">Active curriculum</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Core Subjects</p><h2 className="mt-1 text-2xl font-bold text-slate-800">5</h2></div>
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600"><Award size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">Mandatory</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Elective</p><h2 className="mt-1 text-2xl font-bold text-slate-800">7</h2></div>
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600"><BookOpen size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">Optional</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Total Students</p><h2 className="mt-1 text-2xl font-bold text-slate-800">1,248</h2></div>
            <div className="rounded-xl bg-amber-100 p-3 text-amber-600"><Users size={22} /></div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-400">Enrolled</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search by subject name or code..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100" />
            </div>
            <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option>All Grades</option><option>Grade 6</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Grade 10</option>
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option>All Types</option><option>Core</option><option>Science</option><option>Elective</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Subject</th><th className="px-6 py-4">Code</th><th className="px-6 py-4">Grade</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Teacher</th><th className="px-6 py-4">Students</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentSubjects.length > 0 ? (
                currentSubjects.map((subject) => (
                  <tr key={subject.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-sm font-bold text-white">{subject.name.charAt(0)}</div><p className="font-semibold text-slate-800">{subject.name}</p></div></td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{subject.code}</td>
                    <td className="px-6 py-4"><span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{subject.grade}</span></td>
                    <td className="px-6 py-4 text-sm text-slate-600">{subject.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{subject.teacher}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{subject.students}</td>
                    <td className="px-6 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${subject.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}><span className={`h-1.5 w-1.5 rounded-full ${subject.status === "Active" ? "bg-emerald-500" : "bg-rose-500"}`} />{subject.status}</span></td>
                    <td className="relative px-6 py-4 text-right">
                      <button onClick={() => setOpenMenu(openMenu === subject.id ? null : subject.id)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"><MoreVertical size={19} /></button>
                      {openMenu === subject.id && (
                        <div className="absolute right-6 top-14 z-20 w-40 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"><Eye size={16} />View</button>
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"><Edit size={16} />Edit</button>
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"><Trash2 size={16} />Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (<tr><td colSpan="8" className="px-6 py-12 text-center text-sm text-slate-500">No subjects found.</td></tr>)}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-700">{filteredSubjects.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + subjectsPerPage, filteredSubjects.length)}</span> of <span className="font-semibold text-slate-700">{filteredSubjects.length}</span> subjects</p>
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
              <div><h2 className="text-xl font-bold text-slate-800">Add New Subject</h2><p className="mt-1 text-sm text-slate-500">Create a new subject.</p></div>
              <button onClick={() => setShowAddModal(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Subject Name</label><input type="text" placeholder="Enter subject name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Subject Code</label><input type="text" placeholder="e.g. MATH-101" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></div>
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Grade</label><select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"><option>Grade 6</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Grade 10</option></select></div>
              <div><label className="mb-1.5 block text-sm font-medium text-slate-700">Type</label><select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"><option>Core</option><option>Science</option><option>Elective</option></select></div>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
              <button onClick={() => setShowAddModal(false)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-md">Create Subject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;
