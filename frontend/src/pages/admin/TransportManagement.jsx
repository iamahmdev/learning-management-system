import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Bus,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Clock,
} from "lucide-react";

const TransportManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [routeFilter, setRouteFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [transports] = useState([
    {
      id: 1,
      vehicleNumber: "LEA-2026-001",
      vehicleType: "School Bus",
      driverName: "Muhammad Ali",
      driverPhone: "0300-1234567",
      routeName: "Route A - Main City",
      pickupPoints: 8,
      students: 42,
      startTime: "07:00 AM",
      endTime: "03:00 PM",
      status: "Active",
    },
    {
      id: 2,
      vehicleNumber: "LEA-2026-002",
      vehicleType: "School Bus",
      driverName: "Ahmed Khan",
      driverPhone: "0311-2345678",
      routeName: "Route B - University Road",
      pickupPoints: 10,
      students: 38,
      startTime: "07:10 AM",
      endTime: "03:10 PM",
      status: "Active",
    },
    {
      id: 3,
      vehicleNumber: "LEA-2026-003",
      vehicleType: "Coaster",
      driverName: "Usman Shah",
      driverPhone: "0322-3456789",
      routeName: "Route C - Hayatabad",
      pickupPoints: 7,
      students: 28,
      startTime: "07:15 AM",
      endTime: "03:15 PM",
      status: "Active",
    },
    {
      id: 4,
      vehicleNumber: "LEA-2026-004",
      vehicleType: "School Bus",
      driverName: "Bilal Ahmad",
      driverPhone: "0333-4567890",
      routeName: "Route D - Saddar",
      pickupPoints: 9,
      students: 45,
      startTime: "06:50 AM",
      endTime: "02:50 PM",
      status: "Active",
    },
    {
      id: 5,
      vehicleNumber: "LEA-2026-005",
      vehicleType: "Coaster",
      driverName: "Hamza Malik",
      driverPhone: "0344-5678901",
      routeName: "Route E - Cantt",
      pickupPoints: 6,
      students: 25,
      startTime: "07:20 AM",
      endTime: "03:20 PM",
      status: "Inactive",
    },
    {
      id: 6,
      vehicleNumber: "LEA-2026-006",
      vehicleType: "School Bus",
      driverName: "Asif Khan",
      driverPhone: "0355-6789012",
      routeName: "Route F - Ring Road",
      pickupPoints: 11,
      students: 48,
      startTime: "06:45 AM",
      endTime: "02:45 PM",
      status: "Active",
    },
    {
      id: 7,
      vehicleNumber: "LEA-2026-007",
      vehicleType: "Van",
      driverName: "Sajid Ali",
      driverPhone: "0366-7890123",
      routeName: "Route G - Board Bazaar",
      pickupPoints: 5,
      students: 18,
      startTime: "07:25 AM",
      endTime: "03:25 PM",
      status: "Active",
    },
    {
      id: 8,
      vehicleNumber: "LEA-2026-008",
      vehicleType: "School Bus",
      driverName: "Faisal Khan",
      driverPhone: "0377-8901234",
      routeName: "Route H - Nasir Bagh",
      pickupPoints: 8,
      students: 36,
      startTime: "07:05 AM",
      endTime: "03:05 PM",
      status: "Active",
    },
  ]);

  const itemsPerPage = 4;

  const filteredTransports = transports.filter((item) => {
    const matchesSearch =
      item.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vehicleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.routeName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRoute =
      routeFilter === "All" || item.routeName === routeFilter;

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesRoute && matchesStatus;
  });

  const totalPages = Math.ceil(
    filteredTransports.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentTransports = filteredTransports.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, routeFilter, statusFilter]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-700";
    }

    return "bg-rose-50 text-rose-700";
  };

  const getStatusIcon = (status) => {
    if (status === "Active") {
      return <CheckCircle size={15} />;
    }

    return <AlertCircle size={15} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Transport Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage school vehicles, drivers, routes and student transport.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Transport
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Vehicles</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                24
              </h3>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Bus size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Active Vehicles</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                21
              </h3>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Routes</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                18
              </h3>
            </div>

            <div className="rounded-lg bg-violet-50 p-3 text-violet-600">
              <MapPin size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Students Using Transport</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                842
              </h3>
            </div>

            <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
              <Users size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search vehicle, driver or route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Routes</option>
            <option value="Route A - Main City">
              Route A - Main City
            </option>
            <option value="Route B - University Road">
              Route B - University Road
            </option>
            <option value="Route C - Hayatabad">
              Route C - Hayatabad
            </option>
            <option value="Route D - Saddar">
              Route D - Saddar
            </option>
            <option value="Route E - Cantt">
              Route E - Cantt
            </option>
            <option value="Route F - Ring Road">
              Route F - Ring Road
            </option>
            <option value="Route G - Board Bazaar">
              Route G - Board Bazaar
            </option>
            <option value="Route H - Nasir Bagh">
              Route H - Nasir Bagh
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vehicle
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Driver
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Route
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Students
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pickup Points
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Schedule
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentTransports.length > 0 ? (
                currentTransports.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                          <Bus size={18} />
                        </div>

                        <div>
                          <p className="font-medium text-slate-800">
                            {item.vehicleNumber}
                          </p>

                          <p className="text-xs text-slate-500">
                            {item.vehicleType}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {item.driverName}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <Phone size={13} />
                        {item.driverPhone}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={16}
                          className="text-blue-500"
                        />

                        <span className="text-sm text-slate-600">
                          {item.routeName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users
                          size={15}
                          className="text-slate-400"
                        />
                        {item.students}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {item.pickupPoints}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock
                          size={15}
                          className="text-slate-400"
                        />
                        {item.startTime} - {item.endTime}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === item.id ? null : item.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === item.id && (
                        <div className="absolute right-5 top-12 z-20 w-44 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">
                          <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                            <Eye size={16} />
                            View Details
                          </button>

                          <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                            <Edit size={16} />
                            Edit
                          </button>

                          <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50">
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
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    No transport records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filteredTransports.length === 0
                ? 0
                : startIndex + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-slate-700">
              {Math.min(
                startIndex + itemsPerPage,
                filteredTransports.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              {filteredTransports.length}
            </span>{" "}
            vehicles
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
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
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Transport Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Add Transport
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new vehicle and transport information.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  placeholder="e.g. LEA-2026-009"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Vehicle Type
                </label>

                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Select Vehicle Type</option>
                  <option>School Bus</option>
                  <option>Coaster</option>
                  <option>Van</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Driver Name
                </label>

                <input
                  type="text"
                  placeholder="Enter driver name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Driver Phone
                </label>

                <input
                  type="text"
                  placeholder="03XX-XXXXXXX"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Route
                </label>

                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Select Route</option>
                  <option>Route A - Main City</option>
                  <option>Route B - University Road</option>
                  <option>Route C - Hayatabad</option>
                  <option>Route D - Saddar</option>
                  <option>Route E - Cantt</option>
                  <option>Route F - Ring Road</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Pickup Points
                </label>

                <input
                  type="number"
                  placeholder="e.g. 8"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Start Time
                </label>

                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  End Time
                </label>

                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Assigned Students
                </label>

                <input
                  type="number"
                  placeholder="Number of students"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Save Transport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportManagement;

