import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  BookOpen,
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
  RotateCcw,
} from "lucide-react";

const LibraryManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const books = [
    {
      id: 1,
      title: "Introduction to Mathematics",
      isbn: "978-0134685991",
      author: "John Smith",
      category: "Mathematics",
      totalCopies: 25,
      availableCopies: 18,
      issuedCopies: 7,
      status: "Available",
    },
    {
      id: 2,
      title: "English Grammar & Composition",
      isbn: "978-0199539324",
      author: "Michael Swan",
      category: "English",
      totalCopies: 30,
      availableCopies: 22,
      issuedCopies: 8,
      status: "Available",
    },
    {
      id: 3,
      title: "Physics for Secondary School",
      isbn: "978-1107615481",
      author: "David Halliday",
      category: "Physics",
      totalCopies: 20,
      availableCopies: 0,
      issuedCopies: 20,
      status: "Issued",
    },
    {
      id: 4,
      title: "Modern Biology",
      isbn: "978-0321558237",
      author: "Neil Campbell",
      category: "Biology",
      totalCopies: 18,
      availableCopies: 5,
      issuedCopies: 13,
      status: "Available",
    },
    {
      id: 5,
      title: "Computer Science Fundamentals",
      isbn: "978-0131103627",
      author: "Peter Norton",
      category: "Computer Science",
      totalCopies: 15,
      availableCopies: 3,
      issuedCopies: 12,
      status: "Low Stock",
    },
    {
      id: 6,
      title: "Pakistan Studies",
      isbn: "978-9693501234",
      author: "M. Hassan",
      category: "Pakistan Studies",
      totalCopies: 22,
      availableCopies: 14,
      issuedCopies: 8,
      status: "Available",
    },
    {
      id: 7,
      title: "Urdu Adab",
      isbn: "978-9693512456",
      author: "Ashfaq Ahmed",
      category: "Urdu",
      totalCopies: 16,
      availableCopies: 0,
      issuedCopies: 16,
      status: "Issued",
    },
    {
      id: 8,
      title: "Islamic Studies",
      isbn: "978-9693523456",
      author: "Dr. Khalid",
      category: "Islamiyat",
      totalCopies: 20,
      availableCopies: 11,
      issuedCopies: 9,
      status: "Available",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.isbn.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || book.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All Categories" ||
      book.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const booksPerPage = 4;

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;

  const currentBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter]);

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
      case "Available":
        return "bg-emerald-100 text-emerald-700";
      case "Issued":
        return "bg-blue-100 text-blue-700";
      case "Low Stock":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Available":
        return <CheckCircle size={14} />;
      case "Issued":
        return <Clock size={14} />;
      case "Low Stock":
        return <AlertCircle size={14} />;
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
            Library Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage books, copies, categories and library circulation.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add New Book
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Books</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                3,842
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <BookOpen size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-indigo-600">
            All library copies
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Available Books</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                2,615
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            Ready for issue
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Issued Books</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                1,227
              </h2>
            </div>

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Clock size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-blue-600">
            Currently issued
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Low Stock</p>

              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                24
              </h2>
            </div>

            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <AlertCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-amber-600">
            Needs attention
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
                placeholder="Search by book title, ISBN or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Categories</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Physics</option>
              <option>Biology</option>
              <option>Computer Science</option>
              <option>Pakistan Studies</option>
              <option>Urdu</option>
              <option>Islamiyat</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All Status</option>
              <option>Available</option>
              <option>Issued</option>
              <option>Low Stock</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Book</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Total Copies</th>
                <th className="px-6 py-4">Available</th>
                <th className="px-6 py-4">Issued</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentBooks.length > 0 ? (
                currentBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                          <BookOpen size={20} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {book.title}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            ISBN: {book.isbn}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {book.author}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                        {book.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {book.totalCopies}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      {book.availableCopies}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      {book.issuedCopies}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          book.status
                        )}`}
                      >
                        {getStatusIcon(book.status)}
                        {book.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === book.id ? null : book.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === book.id && (
                        <div className="absolute right-6 top-14 z-20 w-44 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View Details
                          </button>

                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <RotateCcw size={16} />
                            Issue / Return
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
                    No books found.
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
              {filteredBooks.length === 0 ? 0 : startIndex + 1}-
              {Math.min(
                startIndex + booksPerPage,
                filteredBooks.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredBooks.length}
            </span>{" "}
            books
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

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add New Book
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new book to the school library.
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
                  Book Title
                </label>

                <input
                  type="text"
                  placeholder="e.g. Introduction to Mathematics"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Author
                </label>

                <input
                  type="text"
                  placeholder="Enter author name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  ISBN
                </label>

                <input
                  type="text"
                  placeholder="Enter ISBN"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select category</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Physics</option>
                  <option>Biology</option>
                  <option>Computer Science</option>
                  <option>Pakistan Studies</option>
                  <option>Urdu</option>
                  <option>Islamiyat</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Total Copies
                </label>

                <input
                  type="number"
                  placeholder="Enter number of copies"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Shelf / Location
                </label>

                <input
                  type="text"
                  placeholder="e.g. Shelf A-12"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Available</option>
                  <option>Issued</option>
                  <option>Low Stock</option>
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
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryManagement;
