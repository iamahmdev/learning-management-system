import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

const FeeManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [openMenu, setOpenMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fees = [
    {
      id: 1,
      studentName: "Hamza Khan",
      admissionNo: "ADM-2026-001",
      className: "Grade 10-A",
      feeType: "Monthly Tuition",
      amount: "PKR 15,000",
      dueDate: "05 Sep 2026",
      status: "Paid",
      paidDate: "03 Sep 2026",
    },
    {
      id: 2,
      studentName: "Ayesha Ahmed",
      admissionNo: "ADM-2026-002",
      className: "Grade 9-B",
      feeType: "Monthly Tuition",
      amount: "PKR 15,000",
      dueDate: "05 Sep 2026",
      status: "Pending",
      paidDate: "-",
    },
    {
      id: 3,
      studentName: "Ali Farhan",
      admissionNo: "ADM-2026-003",
      className: "Grade 8-A",
      feeType: "Exam Fee",
      amount: "PKR 5,000",
      dueDate: "10 Sep 2026",
      status: "Paid",
      paidDate: "08 Sep 2026",
    },
    {
      id: 4,
      studentName: "Sara Khan",
      admissionNo: "ADM-2026-004",
      className: "Grade 7-C",
      feeType: "Monthly Tuition",
      amount: "PKR 12,000",
      dueDate: "05 Sep 2026",
      status: "Overdue",
      paidDate: "-",
    },
    {
      id: 5,
      studentName: "Usman Shah",
      admissionNo: "ADM-2026-005",
      className: "Grade 10-B",
      feeType: "Transport Fee",
      amount: "PKR 3,000",
      dueDate: "01 Sep 2026",
      status: "Paid",
      paidDate: "30 Aug 2026",
    },
    {
      id: 6,
      studentName: "Fatima Malik",
      admissionNo: "ADM-2026-006",
      className: "Grade 6-A",
      feeType: "Monthly Tuition",
      amount: "PKR 10,000",
      dueDate: "05 Sep 2026",
      status: "Pending",
      paidDate: "-",
    },
    {
      id: 7,
      studentName: "Ahmed Tariq",
      admissionNo: "ADM-2026-007",
      className: "Grade 9-A",
      feeType: "Library Fee",
      amount: "PKR 2,000",
      dueDate: "15 Sep 2026",
      status: "Paid",
      paidDate: "12 Sep 2026",
    },
    {
      id: 8,
      studentName: "Hira Iqbal",
      admissionNo: "ADM-2026-008",
      className: "Grade 8-B",
      feeType: "Monthly Tuition",
      amount: "PKR 13,000",
      dueDate: "02 Sep 2026",
      status: "Overdue",
      paidDate: "-",
    },
  ];

  const filteredFees = fees.filter((fee) => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(search.toLowerCase()) ||
      fee.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      fee.feeType.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || fee.status === statusFilter;

    const matchesClass =
      classFilter === "All Classes" ||
      fee.className.includes(classFilter);

    return matchesSearch && matchesStatus && matchesClass;
  });

  const feesPerPage = 4;

  const totalPages = Math.ceil(filteredFees.length / feesPerPage);

  const startIndex = (currentPage - 1) * feesPerPage;

  const currentFees = filteredFees.slice(
    startIndex,
    startIndex + feesPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, classFilter]);

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
      case "Paid":
        return "bg-emerald-100 text-emerald-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Overdue":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Paid":
        return <CheckCircle size={14} />;
      case "Pending":
        return <Clock size={14} />;
      case "Overdue":
        return <XCircle size={14} />;
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
            Fee Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage student fees, payments and generate invoices.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.02] hover:shadow-xl"
        >
          <Plus size={18} />
          Add Fee Record
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Collected</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                PKR 18.4M
              </h2>
            </div>

            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <DollarSign size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            +12.5% this month
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Paid Fees</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                PKR 16.2M
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-emerald-600">
            88% collection rate
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pending Fees</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                PKR 1.5M
              </h2>
            </div>

            <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
              <Clock size={22} />
            </div>
          </div>

          <p className="mt-3 text-xs font-medium text-amber-600">
            Awaiting payment
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Overdue Fees</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-800">
                PKR 700K
              </h2>
            </div>

            <div className="rounded-xl bg-rose-100 p-3 text-rose-600">
              <XCircle size={22} />
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
                placeholder="Search by student name, admission no or fee type..."
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
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Fee Type</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Paid Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {currentFees.length > 0 ? (
                currentFees.map((fee) => (
                  <tr
                    key={fee.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {fee.studentName}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {fee.admissionNo}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {fee.className}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {fee.feeType}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {fee.amount}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {fee.dueDate}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {fee.paidDate}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          fee.status
                        )}`}
                      >
                        {getStatusIcon(fee.status)}
                        {fee.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === fee.id ? null : fee.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {openMenu === fee.id && (
                        <div className="absolute right-6 top-14 z-20 w-44 rounded-xl border border-slate-100 bg-white p-1.5 text-left shadow-xl">
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View Details
                          </button>

                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Download size={16} />
                            Download Invoice
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
                    No fee records found.
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
              {filteredFees.length === 0 ? 0 : startIndex + 1}-
              {Math.min(startIndex + feesPerPage, filteredFees.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {filteredFees.length}
            </span>{" "}
            fees
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
                  Add Fee Record
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create a new fee record for a student.
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
                  Fee Type
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Select fee type</option>
                  <option>Monthly Tuition</option>
                  <option>Exam Fee</option>
                  <option>Transport Fee</option>
                  <option>Library Fee</option>
                  <option>Lab Fee</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Amount (PKR)
                </label>

                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Due Date
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
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Payment Method
                </label>

                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>Online Payment</option>
                  <option>Cheque</option>
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
                Create Fee Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeManagement;
