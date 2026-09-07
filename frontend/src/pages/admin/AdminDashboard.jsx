import {
  Users,
  GraduationCap,
  UserRound,
  UserCheck,
  BookOpen,
  ClipboardCheck,
  Wallet,
  Library,
  Bus,
  CalendarDays,
  Bell,
  TrendingUp,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12.5%",
      icon: GraduationCap,
    },
    {
      title: "Total Teachers",
      value: "86",
      change: "+5.2%",
      icon: UserCheck,
    },
    {
      title: "Total Parents",
      value: "1,015",
      change: "+8.4%",
      icon: Users,
    },
    {
      title: "Total Staff",
      value: "42",
      change: "+3.1%",
      icon: UserRound,
    },
  ];

  const quickStats = [
    {
      title: "Attendance",
      value: "92.4%",
      icon: ClipboardCheck,
    },
    {
      title: "Fee Collection",
      value: "78.6%",
      icon: Wallet,
    },
    {
      title: "Library Books",
      value: "3,842",
      icon: Library,
    },
    {
      title: "Active Routes",
      value: "18",
      icon: Bus,
    },
  ];

  const activities = [
    {
      title: "New student registered",
      description: "Ali Ahmad was added to Grade 8",
      time: "10 minutes ago",
      icon: GraduationCap,
    },
    {
      title: "Fee payment received",
      description: "Monthly fee payment was recorded",
      time: "35 minutes ago",
      icon: Wallet,
    },
    {
      title: "New teacher added",
      description: "Sarah Khan joined the teaching staff",
      time: "1 hour ago",
      icon: UserCheck,
    },
    {
      title: "Exam schedule updated",
      description: "Mid-term examination timetable updated",
      time: "2 hours ago",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-5 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Admin Panel
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Here's what's happening in your school.
            </p>
          </div>

          <button
            type="button"
            className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Bell className="h-5 w-5" />
            Notifications
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 lg:p-8">

        {/* Main Stats */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">
              Overview
            </h2>

            <p className="text-sm text-gray-500">
              School statistics at a glance
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 shadow-md shadow-indigo-100">
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {stat.change}
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-1 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">
              Quick Statistics
            </h2>

            <p className="text-sm text-gray-500">
              Important school metrics
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {quickStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        {stat.title}
                      </p>

                      <p className="mt-1 text-xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-gray-400" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Section */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Recent Activity */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="font-bold text-gray-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Latest updates from your school
                </p>
              </div>

              <button
                type="button"
                className="text-sm font-semibold text-indigo-600 transition hover:text-fuchsia-600"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.title}
                    className="flex items-center gap-4 p-5 transition hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <Icon className="h-5 w-5 text-indigo-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {activity.title}
                      </h3>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {activity.description}
                      </p>
                    </div>

                    <div className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
                      <Clock3 className="h-3.5 w-3.5" />
                      {activity.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-bold text-gray-900">
                System Status
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Current system overview
              </p>
            </div>

            <div className="space-y-4 p-5">

              <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Database
                    </p>

                    <p className="text-xs text-gray-500">
                      Connected
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-green-600">
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      API Server
                    </p>

                    <p className="text-xs text-gray-500">
                      Running normally
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-green-600">
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Pending Tasks
                    </p>

                    <p className="text-xs text-gray-500">
                      Requires attention
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-yellow-600">
                  12
                </span>
              </div>

            </div>
          </div>

        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;

