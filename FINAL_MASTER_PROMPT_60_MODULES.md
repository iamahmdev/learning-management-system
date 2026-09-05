# 🚀 FINAL MASTER PROMPT: 60 Complete Modules - School Management System

**Production-Ready Master Prompt for Complete Frontend Integration**

---

## ✅ **CONFIRMED: 60 COMPLETE MODULES**

Your School Management System now has **60 fully functional modules** with:
- ✅ 60 Models
- ✅ 60 Controllers  
- ✅ 60 Routes
- ✅ All CRUD Operations
- ✅ Complete Backend Ready

---

## 📋 **ALL 60 MODULES LIST**

### **Core Management (14 modules)**
1. **Users** - `/api/users`
2. **Schools** - `/api/schools`
3. **Students** - `/api/students`
4. **Teachers** - `/api/teachers`
5. **Parents** - `/api/parents`
6. **Parent-Student Relationships** - `/api/parent-student-relationships`
7. **Academic Years** - `/api/academic-years`
8. **Classes** - `/api/classes`
9. **Sections** - `/api/sections`
10. **Subjects** - `/api/subjects`
11. **Attendance** - `/api/attendance`
12. **Exams** - `/api/exams`
13. **Results** - `/api/results`
14. **Fees** - `/api/fees`

### **Financial & Administrative (11 modules)**
15. **Fee Payments** - `/api/fee-payments`
16. **Fee Structure** - `/api/fee-structures` 🆕
17. **Transport** - `/api/transports`
18. **Transport Routes** - `/api/transport-routes` 🆕
19. **Invoices** - `/api/invoices`
20. **Budget** - `/api/budgets`
21. **Expenses** - `/api/expenses`
22. **Payroll** - `/api/payrolls`
23. **Scholarships** - `/api/scholarships`
24. **Settings** - `/api/settings`
25. **Audit Logs** - `/api/audit-logs`

### **Academic Operations (11 modules)**
26. **Timetables** - `/api/timetables`
27. **Homework** - `/api/homework`
28. **Homework Submissions** - `/api/homework-submissions`
29. **Online Classes** - `/api/online-classes`
30. **Question Bank** - `/api/question-bank`
31. **Library** - `/api/library`
32. **Book Issues** - `/api/library/issues`
33. **Leave** - `/api/leaves`
34. **Subject Assignments** - `/api/subject-assignments` 🆕
35. **Grade System** - `/api/grade-systems` 🆕
36. **Academic Calendar** - `/api/academic-calendar` 🆕

### **Campus Management (11 modules)**
37. **Staff** - `/api/staff`
38. **Inventory** - `/api/inventory`
39. **Hostel** - `/api/hostels`
40. **Hostel Rooms** - `/api/hostel-rooms`
41. **Canteen** - `/api/canteen`
42. **ID Cards** - `/api/id-cards`
43. **Visitors** - `/api/visitors`
44. **Biometric Attendance** - `/api/biometric-attendance`
45. **Vehicle Tracking** - `/api/vehicle-tracking`
46. **Health Records** - `/api/health-records`
47. **Discipline** - `/api/discipline`

### **Communication & Engagement (8 modules)**
48. **Communications** - `/api/communications`
49. **Notifications** - `/api/notifications`
50. **Events** - `/api/events`
51. **Feedback** - `/api/feedback`
52. **Complaints** - `/api/complaints`
53. **Admissions** - `/api/admissions`
54. **Certificates** - `/api/certificates`
55. **Alumni** - `/api/alumni`

### **Portals & Analytics (5 modules)**
56. **Dashboard** - `/api/dashboards`
57. **Analytics** - `/api/analytics`
58. **Reports** - `/api/reports`
59. **Parent Portal** - `/api/parent-portal`
60. **Student Portal** - `/api/student-portal`

### **Additional Modules (included in models)**
- **Teacher Portal** - `/api/teacher-portal`
- **Mobile App** - `/api/mobile-app`
- **Webhooks** - `/api/webhooks`

---

## 🎯 **THE COMPLETE MASTER PROMPT**

Copy everything below and paste into your AI assistant:

```markdown
# MASTER PROMPT: Build Complete Frontend for 60-Module School Management System

## PROJECT OVERVIEW

Build a production-ready Next.js 14 frontend with TypeScript and TanStack Query v5 for a complete School Management System with 60 backend modules.

## TECH STACK

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Data Fetching**: @tanstack/react-query v5
- **HTTP Client**: axios
- **Styling**: Tailwind CSS
- **State**: TanStack Query ONLY

## BACKEND API

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: JWT (Bearer token + HTTP-only cookies)
- **Response Format**: `{ success: boolean, data: any, message?: string }`

## FOLDER STRUCTURE

Create this exact structure:

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── (modules)/
│   │       ├── users/page.tsx
│   │       ├── schools/page.tsx
│   │       ├── students/page.tsx
│   │       ├── teachers/page.tsx
│   │       ├── parents/page.tsx
│   │       ├── parent-student-relationships/page.tsx
│   │       ├── academic-years/page.tsx
│   │       ├── classes/page.tsx
│   │       ├── sections/page.tsx
│   │       ├── subjects/page.tsx
│   │       ├── subject-assignments/page.tsx         [NEW]
│   │       ├── attendance/page.tsx
│   │       ├── biometric-attendance/page.tsx
│   │       ├── exams/page.tsx
│   │       ├── results/page.tsx
│   │       ├── grade-systems/page.tsx              [NEW]
│   │       ├── fees/page.tsx
│   │       ├── fee-payments/page.tsx
│   │       ├── fee-structures/page.tsx             [NEW]
│   │       ├── transport/page.tsx
│   │       ├── transport-routes/page.tsx           [NEW]
│   │       ├── vehicle-tracking/page.tsx
│   │       ├── library/page.tsx
│   │       ├── book-issues/page.tsx
│   │       ├── timetables/page.tsx
│   │       ├── homework/page.tsx
│   │       ├── homework-submissions/page.tsx
│   │       ├── leaves/page.tsx
│   │       ├── staff/page.tsx
│   │       ├── payroll/page.tsx
│   │       ├── inventory/page.tsx
│   │       ├── communications/page.tsx
│   │       ├── notifications/page.tsx
│   │       ├── events/page.tsx
│   │       ├── academic-calendar/page.tsx          [NEW]
│   │       ├── admissions/page.tsx
│   │       ├── certificates/page.tsx
│   │       ├── scholarships/page.tsx
│   │       ├── hostels/page.tsx
│   │       ├── hostel-rooms/page.tsx
│   │       ├── canteen/page.tsx
│   │       ├── invoices/page.tsx
│   │       ├── id-cards/page.tsx
│   │       ├── visitors/page.tsx
│   │       ├── online-classes/page.tsx
│   │       ├── question-bank/page.tsx
│   │       ├── discipline/page.tsx
│   │       ├── health-records/page.tsx
│   │       ├── complaints/page.tsx
│   │       ├── feedback/page.tsx
│   │       ├── alumni/page.tsx
│   │       ├── budgets/page.tsx
│   │       ├── expenses/page.tsx
│   │       ├── settings/page.tsx
│   │       ├── audit-logs/page.tsx
│   │       ├── analytics/page.tsx
│   │       ├── dashboards/page.tsx
│   │       ├── reports/page.tsx
│   │       ├── parent-portal/page.tsx
│   │       ├── student-portal/page.tsx
│   │       ├── teacher-portal/page.tsx
│   │       ├── mobile-app/page.tsx
│   │       └── webhooks/page.tsx
│   │
│   ├── lib/
│   │   ├── api-client.ts
│   │   └── query-client.ts
│   │
│   ├── providers/
│   │   └── query-provider.tsx
│   │
│   ├── features/
│   │   ├── users/
│   │   ├── schools/
│   │   ├── students/
│   │   ├── teachers/
│   │   ├── parents/
│   │   ├── parent-student-relationships/
│   │   ├── academic-years/
│   │   ├── classes/
│   │   ├── sections/
│   │   ├── subjects/
│   │   ├── subject-assignments/              [NEW]
│   │   ├── attendance/
│   │   ├── biometric-attendance/
│   │   ├── exams/
│   │   ├── results/
│   │   ├── grade-systems/                    [NEW]
│   │   ├── fees/
│   │   ├── fee-payments/
│   │   ├── fee-structures/                   [NEW]
│   │   ├── transport/
│   │   ├── transport-routes/                 [NEW]
│   │   ├── vehicle-tracking/
│   │   ├── library/
│   │   ├── book-issues/
│   │   ├── timetables/
│   │   ├── homework/
│   │   ├── homework-submissions/
│   │   ├── leaves/
│   │   ├── staff/
│   │   ├── payroll/
│   │   ├── inventory/
│   │   ├── communications/
│   │   ├── notifications/
│   │   ├── events/
│   │   ├── academic-calendar/                [NEW]
│   │   ├── admissions/
│   │   ├── certificates/
│   │   ├── scholarships/
│   │   ├── hostels/
│   │   ├── hostel-rooms/
│   │   ├── canteen/
│   │   ├── invoices/
│   │   ├── id-cards/
│   │   ├── visitors/
│   │   ├── online-classes/
│   │   ├── question-bank/
│   │   ├── discipline/
│   │   ├── health-records/
│   │   ├── complaints/
│   │   ├── feedback/
│   │   ├── alumni/
│   │   ├── budgets/
│   │   ├── expenses/
│   │   ├── settings/
│   │   ├── audit-logs/
│   │   ├── analytics/
│   │   ├── dashboards/
│   │   ├── reports/
│   │   ├── parent-portal/
│   │   ├── student-portal/
│   │   ├── teacher-portal/
│   │   ├── mobile-app/
│   │   └── webhooks/
│   │       └── (Each module has: api/, hooks/, types/, keys/, components/)
│   │
│   └── constants/
│       └── endpoints.ts
│
├── .env.local
├── package.json
└── tsconfig.json
```

## CORE SETUP FILES

### 1. lib/api-client.ts

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 2. lib/query-client.ts

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### 3. providers/query-provider.tsx

```typescript
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 4. app/layout.tsx

```typescript
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

## CENTRALIZED ENDPOINTS

### constants/endpoints.ts

```typescript
export const ENDPOINTS = {
  // 1-14: Core Management
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
    create: '/users/register',
    login: '/users/login',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  schools: {
    list: '/schools',
    detail: (id: string) => `/schools/${id}`,
    create: '/schools',
    update: (id: string) => `/schools/${id}`,
    delete: (id: string) => `/schools/${id}`,
  },
  students: {
    list: '/students',
    detail: (id: string) => `/students/${id}`,
    create: '/students',
    update: (id: string) => `/students/${id}`,
    delete: (id: string) => `/students/${id}`,
  },
  teachers: {
    list: '/teachers',
    detail: (id: string) => `/teachers/${id}`,
    create: '/teachers',
    update: (id: string) => `/teachers/${id}`,
    delete: (id: string) => `/teachers/${id}`,
  },
  parents: {
    list: '/parents',
    detail: (id: string) => `/parents/${id}`,
    create: '/parents',
    update: (id: string) => `/parents/${id}`,
    delete: (id: string) => `/parents/${id}`,
  },
  parentStudentRelationships: {
    list: '/parent-student-relationships',
    detail: (id: string) => `/parent-student-relationships/${id}`,
    create: '/parent-student-relationships',
    update: (id: string) => `/parent-student-relationships/${id}`,
    delete: (id: string) => `/parent-student-relationships/${id}`,
  },
  academicYears: {
    list: '/academic-years',
    detail: (id: string) => `/academic-years/${id}`,
    create: '/academic-years',
    update: (id: string) => `/academic-years/${id}`,
    delete: (id: string) => `/academic-years/${id}`,
  },
  classes: {
    list: '/classes',
    detail: (id: string) => `/classes/${id}`,
    create: '/classes',
    update: (id: string) => `/classes/${id}`,
    delete: (id: string) => `/classes/${id}`,
  },
  sections: {
    list: '/sections',
    detail: (id: string) => `/sections/${id}`,
    create: '/sections',
    update: (id: string) => `/sections/${id}`,
    delete: (id: string) => `/sections/${id}`,
  },
  subjects: {
    list: '/subjects',
    detail: (id: string) => `/subjects/${id}`,
    create: '/subjects',
    update: (id: string) => `/subjects/${id}`,
    delete: (id: string) => `/subjects/${id}`,
  },
  attendance: {
    list: '/attendance',
    detail: (id: string) => `/attendance/${id}`,
    create: '/attendance',
    update: (id: string) => `/attendance/${id}`,
    delete: (id: string) => `/attendance/${id}`,
  },
  exams: {
    list: '/exams',
    detail: (id: string) => `/exams/${id}`,
    create: '/exams',
    update: (id: string) => `/exams/${id}`,
    delete: (id: string) => `/exams/${id}`,
  },
  results: {
    list: '/results',
    detail: (id: string) => `/results/${id}`,
    create: '/results',
    update: (id: string) => `/results/${id}`,
    delete: (id: string) => `/results/${id}`,
  },
  fees: {
    list: '/fees',
    detail: (id: string) => `/fees/${id}`,
    create: '/fees',
    update: (id: string) => `/fees/${id}`,
    delete: (id: string) => `/fees/${id}`,
  },

  // 15-25: Financial & Administrative
  feePayments: {
    list: '/fee-payments',
    detail: (id: string) => `/fee-payments/${id}`,
    create: '/fee-payments',
    update: (id: string) => `/fee-payments/${id}`,
    delete: (id: string) => `/fee-payments/${id}`,
  },
  feeStructures: {
    list: '/fee-structures',
    detail: (id: string) => `/fee-structures/${id}`,
    create: '/fee-structures',
    update: (id: string) => `/fee-structures/${id}`,
    delete: (id: string) => `/fee-structures/${id}`,
  },
  transport: {
    list: '/transports',
    detail: (id: string) => `/transports/${id}`,
    create: '/transports',
    update: (id: string) => `/transports/${id}`,
    delete: (id: string) => `/transports/${id}`,
  },
  transportRoutes: {
    list: '/transport-routes',
    detail: (id: string) => `/transport-routes/${id}`,
    create: '/transport-routes',
    update: (id: string) => `/transport-routes/${id}`,
    delete: (id: string) => `/transport-routes/${id}`,
  },
  invoices: {
    list: '/invoices',
    detail: (id: string) => `/invoices/${id}`,
    create: '/invoices',
    update: (id: string) => `/invoices/${id}`,
    delete: (id: string) => `/invoices/${id}`,
  },
  budgets: {
    list: '/budgets',
    detail: (id: string) => `/budgets/${id}`,
    create: '/budgets',
    update: (id: string) => `/budgets/${id}`,
    delete: (id: string) => `/budgets/${id}`,
  },
  expenses: {
    list: '/expenses',
    detail: (id: string) => `/expenses/${id}`,
    create: '/expenses',
    update: (id: string) => `/expenses/${id}`,
    delete: (id: string) => `/expenses/${id}`,
  },
  payroll: {
    list: '/payrolls',
    detail: (id: string) => `/payrolls/${id}`,
    create: '/payrolls',
    update: (id: string) => `/payrolls/${id}`,
    delete: (id: string) => `/payrolls/${id}`,
  },
  scholarships: {
    list: '/scholarships',
    detail: (id: string) => `/scholarships/${id}`,
    create: '/scholarships',
    update: (id: string) => `/scholarships/${id}`,
    delete: (id: string) => `/scholarships/${id}`,
  },
  settings: {
    list: '/settings',
    detail: (id: string) => `/settings/${id}`,
    create: '/settings',
    update: (id: string) => `/settings/${id}`,
    delete: (id: string) => `/settings/${id}`,
  },
  auditLogs: {
    list: '/audit-logs',
    detail: (id: string) => `/audit-logs/${id}`,
  },

  // 26-36: Academic Operations
  timetables: {
    list: '/timetables',
    detail: (id: string) => `/timetables/${id}`,
    create: '/timetables',
    update: (id: string) => `/timetables/${id}`,
    delete: (id: string) => `/timetables/${id}`,
  },
  homework: {
    list: '/homework',
    detail: (id: string) => `/homework/${id}`,
    create: '/homework',
    update: (id: string) => `/homework/${id}`,
    delete: (id: string) => `/homework/${id}`,
  },
  homeworkSubmissions: {
    list: '/homework-submissions',
    detail: (id: string) => `/homework-submissions/${id}`,
    create: '/homework-submissions',
    update: (id: string) => `/homework-submissions/${id}`,
    delete: (id: string) => `/homework-submissions/${id}`,
  },
  onlineClasses: {
    list: '/online-classes',
    detail: (id: string) => `/online-classes/${id}`,
    create: '/online-classes',
    update: (id: string) => `/online-classes/${id}`,
    delete: (id: string) => `/online-classes/${id}`,
  },
  questionBank: {
    list: '/question-bank',
    detail: (id: string) => `/question-bank/${id}`,
    create: '/question-bank',
    update: (id: string) => `/question-bank/${id}`,
    delete: (id: string) => `/question-bank/${id}`,
  },
  library: {
    books: {
      list: '/library/books',
      detail: (id: string) => `/library/books/${id}`,
      create: '/library/books',
      update: (id: string) => `/library/books/${id}`,
      delete: (id: string) => `/library/books/${id}`,
      issue: (id: string) => `/library/books/${id}/issue`,
      return: (id: string) => `/library/books/${id}/return`,
    },
    issues: '/library/issues',
    overdue: '/library/overdue',
  },
  bookIssues: {
    list: '/library/issues',
    overdue: '/library/overdue',
  },
  leaves: {
    list: '/leaves',
    detail: (id: string) => `/leaves/${id}`,
    create: '/leaves',
    update: (id: string) => `/leaves/${id}`,
    delete: (id: string) => `/leaves/${id}`,
  },
  subjectAssignments: {
    list: '/subject-assignments',
    detail: (id: string) => `/subject-assignments/${id}`,
    create: '/subject-assignments',
    update: (id: string) => `/subject-assignments/${id}`,
    delete: (id: string) => `/subject-assignments/${id}`,
  },
  gradeSystems: {
    list: '/grade-systems',
    detail: (id: string) => `/grade-systems/${id}`,
    create: '/grade-systems',
    update: (id: string) => `/grade-systems/${id}`,
    delete: (id: string) => `/grade-systems/${id}`,
  },
  academicCalendar: {
    list: '/academic-calendar',
    detail: (id: string) => `/academic-calendar/${id}`,
    create: '/academic-calendar',
    update: (id: string) => `/academic-calendar/${id}`,
    delete: (id: string) => `/academic-calendar/${id}`,
  },

  // 37-47: Campus Management
  staff: {
    list: '/staff',
    detail: (id: string) => `/staff/${id}`,
    create: '/staff',
    update: (id: string) => `/staff/${id}`,
    delete: (id: string) => `/staff/${id}`,
  },
  inventory: {
    list: '/inventory',
    detail: (id: string) => `/inventory/${id}`,
    create: '/inventory',
    update: (id: string) => `/inventory/${id}`,
    delete: (id: string) => `/inventory/${id}`,
  },
  hostels: {
    list: '/hostels',
    detail: (id: string) => `/hostels/${id}`,
    create: '/hostels',
    update: (id: string) => `/hostels/${id}`,
    delete: (id: string) => `/hostels/${id}`,
  },
  hostelRooms: {
    list: '/hostel-rooms',
    detail: (id: string) => `/hostel-rooms/${id}`,
    create: '/hostel-rooms',
    update: (id: string) => `/hostel-rooms/${id}`,
    delete: (id: string) => `/hostel-rooms/${id}`,
  },
  canteen: {
    list: '/canteen',
    detail: (id: string) => `/canteen/${id}`,
    create: '/canteen',
    update: (id: string) => `/canteen/${id}`,
    delete: (id: string) => `/canteen/${id}`,
  },
  idCards: {
    list: '/id-cards',
    detail: (id: string) => `/id-cards/${id}`,
    create: '/id-cards',
    update: (id: string) => `/id-cards/${id}`,
    delete: (id: string) => `/id-cards/${id}`,
  },
  visitors: {
    list: '/visitors',
    detail: (id: string) => `/visitors/${id}`,
    create: '/visitors',
    update: (id: string) => `/visitors/${id}`,
    delete: (id: string) => `/visitors/${id}`,
  },
  biometricAttendance: {
    list: '/biometric-attendance',
    detail: (id: string) => `/biometric-attendance/${id}`,
    create: '/biometric-attendance',
    update: (id: string) => `/biometric-attendance/${id}`,
    delete: (id: string) => `/biometric-attendance/${id}`,
  },
  vehicleTracking: {
    list: '/vehicle-tracking',
    detail: (id: string) => `/vehicle-tracking/${id}`,
    create: '/vehicle-tracking',
    update: (id: string) => `/vehicle-tracking/${id}`,
    delete: (id: string) => `/vehicle-tracking/${id}`,
  },
  healthRecords: {
    list: '/health-records',
    detail: (id: string) => `/health-records/${id}`,
    create: '/health-records',
    update: (id: string) => `/health-records/${id}`,
    delete: (id: string) => `/health-records/${id}`,
  },
  discipline: {
    list: '/discipline',
    detail: (id: string) => `/discipline/${id}`,
    create: '/discipline',
    update: (id: string) => `/discipline/${id}`,
    delete: (id: string) => `/discipline/${id}`,
  },

  // 48-55: Communication & Engagement
  communications: {
    list: '/communications',
    detail: (id: string) => `/communications/${id}`,
    create: '/communications',
    update: (id: string) => `/communications/${id}`,
    delete: (id: string) => `/communications/${id}`,
  },
  notifications: {
    list: '/notifications',
    detail: (id: string) => `/notifications/${id}`,
    create: '/notifications',
    markAsRead: (id: string) => `/notifications/${id}/read`,
    delete: (id: string) => `/notifications/${id}`,
  },
  events: {
    list: '/events',
    detail: (id: string) => `/events/${id}`,
    create: '/events',
    update: (id: string) => `/events/${id}`,
    delete: (id: string) => `/events/${id}`,
  },
  feedback: {
    list: '/feedback',
    detail: (id: string) => `/feedback/${id}`,
    create: '/feedback',
    update: (id: string) => `/feedback/${id}`,
    delete: (id: string) => `/feedback/${id}`,
  },
  complaints: {
    list: '/complaints',
    detail: (id: string) => `/complaints/${id}`,
    create: '/complaints',
    update: (id: string) => `/complaints/${id}`,
    delete: (id: string) => `/complaints/${id}`,
  },
  admissions: {
    list: '/admissions',
    detail: (id: string) => `/admissions/${id}`,
    create: '/admissions',
    update: (id: string) => `/admissions/${id}`,
    delete: (id: string) => `/admissions/${id}`,
  },
  certificates: {
    list: '/certificates',
    detail: (id: string) => `/certificates/${id}`,
    create: '/certificates',
    update: (id: string) => `/certificates/${id}`,
    delete: (id: string) => `/certificates/${id}`,
  },
  alumni: {
    list: '/alumni',
    detail: (id: string) => `/alumni/${id}`,
    create: '/alumni',
    update: (id: string) => `/alumni/${id}`,
    delete: (id: string) => `/alumni/${id}`,
  },

  // 56-60: Portals & Analytics
  dashboards: {
    list: '/dashboards',
    detail: (id: string) => `/dashboards/${id}`,
    create: '/dashboards',
    update: (id: string) => `/dashboards/${id}`,
  },
  analytics: {
    list: '/analytics',
    detail: (id: string) => `/analytics/${id}`,
    dashboard: '/analytics/dashboard',
  },
  reports: {
    list: '/reports',
    detail: (id: string) => `/reports/${id}`,
    create: '/reports',
    download: (id: string) => `/reports/${id}/download`,
  },
  parentPortal: {
    list: '/parent-portal',
    detail: (id: string) => `/parent-portal/${id}`,
    create: '/parent-portal',
    update: (id: string) => `/parent-portal/${id}`,
  },
  studentPortal: {
    list: '/student-portal',
    detail: (id: string) => `/student-portal/${id}`,
    create: '/student-portal',
    update: (id: string) => `/student-portal/${id}`,
  },

  // Additional Modules
  teacherPortal: {
    list: '/teacher-portal',
    detail: (id: string) => `/teacher-portal/${id}`,
    create: '/teacher-portal',
    update: (id: string) => `/teacher-portal/${id}`,
  },
  mobileApp: {
    list: '/mobile-app',
    detail: (id: string) => `/mobile-app/${id}`,
    create: '/mobile-app',
    update: (id: string) => `/mobile-app/${id}`,
  },
  webhooks: {
    list: '/webhooks',
    detail: (id: string) => `/webhooks/${id}`,
    create: '/webhooks',
    update: (id: string) => `/webhooks/${id}`,
    delete: (id: string) => `/webhooks/${id}`,
  },
} as const;
```

## PER-MODULE PATTERN (Apply to ALL 60 Modules)

For EACH module, create these 6 files:

### 1. Types File: `features/<module>/types/<module>.types.ts`

Example for Fee Structure:

```typescript
export interface FeeStructure {
  _id: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  name: string;
  feeType: 'tuition' | 'admission' | 'exam' | 'transport' | 'library' | 'lab' | 'sports' | 'annual' | 'development' | 'other';
  amount: number;
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'half-yearly' | 'annually';
  dueDate: string;
  lateFee: number;
  lateFeeApplicableAfterDays: number;
  discount: number;
  isOptional: boolean;
  description?: string;
  status: 'active' | 'inactive';
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeeStructurePayload {
  schoolId: string;
  academicYearId: string;
  classId: string;
  name: string;
  feeType: string;
  amount: number;
  frequency: string;
  dueDate: string;
  lateFee?: number;
  lateFeeApplicableAfterDays?: number;
  discount?: number;
  isOptional?: boolean;
  description?: string;
}

export interface UpdateFeeStructurePayload extends Partial<CreateFeeStructurePayload> {}

export interface FeeStructureFilters {
  schoolId?: string;
  academicYearId?: string;
  classId?: string;
  feeType?: string;
  status?: string;
  page?: number;
  limit?: number;
}
```

### 2. Query Keys: `features/<module>/keys/<module>.keys.ts`

```typescript
export const feeStructuresKeys = {
  all: ['feeStructures'] as const,
  lists: () => [...feeStructuresKeys.all, 'list'] as const,
  list: (filters: object) => [...feeStructuresKeys.lists(), filters] as const,
  details: () => [...feeStructuresKeys.all, 'detail'] as const,
  detail: (id: string) => [...feeStructuresKeys.details(), id] as const,
};
```

### 3. API Functions: `features/<module>/api/<module>.api.ts`

```typescript
import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';
import type { FeeStructure, CreateFeeStructurePayload, UpdateFeeStructurePayload, FeeStructureFilters } from '../types/feeStructures.types';

export const getFeeStructures = async (filters?: FeeStructureFilters) => {
  const { data } = await apiClient.get(ENDPOINTS.feeStructures.list, { params: filters });
  return data.data;
};

export const getFeeStructureById = async (id: string) => {
  const { data } = await apiClient.get(ENDPOINTS.feeStructures.detail(id));
  return data.data;
};

export const createFeeStructure = async (payload: CreateFeeStructurePayload) => {
  const { data } = await apiClient.post(ENDPOINTS.feeStructures.create, payload);
  return data.data;
};

export const updateFeeStructure = async ({ id, payload }: { id: string; payload: UpdateFeeStructurePayload }) => {
  const { data } = await apiClient.put(ENDPOINTS.feeStructures.update(id), payload);
  return data.data;
};

export const deleteFeeStructure = async (id: string) => {
  await apiClient.delete(ENDPOINTS.feeStructures.delete(id));
};
```

### 4. Hooks: `features/<module>/hooks/use-<module>.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFeeStructures, getFeeStructureById, createFeeStructure, updateFeeStructure, deleteFeeStructure } from '../api/feeStructures.api';
import { feeStructuresKeys } from '../keys/feeStructures.keys';

export const useFeeStructuresQuery = (filters?: any) => {
  return useQuery({
    queryKey: feeStructuresKeys.list(filters || {}),
    queryFn: () => getFeeStructures(filters),
  });
};

export const useFeeStructureQuery = (id: string) => {
  return useQuery({
    queryKey: feeStructuresKeys.detail(id),
    queryFn: () => getFeeStructureById(id),
    enabled: !!id,
  });
};

export const useCreateFeeStructureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFeeStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feeStructuresKeys.lists() });
    },
  });
};

export const useUpdateFeeStructureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeeStructure,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: feeStructuresKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: feeStructuresKeys.lists() });
    },
  });
};

export const useDeleteFeeStructureMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFeeStructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feeStructuresKeys.lists() });
    },
  });
};
```

### 5. Component: `features/<module>/components/<Module>List.tsx`

```typescript
'use client';

import { useFeeStructuresQuery, useDeleteFeeStructureMutation } from '../hooks/use-feeStructures';

export function FeeStructuresList() {
  const { data, isLoading, error } = useFeeStructuresQuery();
  const deleteItem = useDeleteFeeStructureMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Fee Structures</h1>
      {/* Add your UI here */}
    </div>
  );
}
```

### 6. Page: `app/(modules)/<module>/page.tsx`

```typescript
import { FeeStructuresList } from '@/features/feeStructures/components/FeeStructuresList';

export default function FeeStructuresPage() {
  return <FeeStructuresList />;
}
```

## NEW MODULES TYPE DEFINITIONS

### Module 56: Fee Structure

```typescript
export interface FeeStructure {
  _id: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  name: string;
  feeType: 'tuition' | 'admission' | 'exam' | 'transport' | 'library' | 'lab' | 'sports' | 'annual' | 'development' | 'other';
  amount: number;
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'half-yearly' | 'annually';
  dueDate: string;
  lateFee: number;
  lateFeeApplicableAfterDays: number;
  discount: number;
  isOptional: boolean;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

### Module 57: Subject Assignment

```typescript
export interface SubjectAssignment {
  _id: string;
  schoolId: string;
  academicYearId: string;
  teacherId: string;
  classId: string;
  sectionId: string;
  subjectId: string;
  isPrimary: boolean;
  assignedDate: string;
  remarks?: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
  updatedAt: string;
}
```

### Module 58: Transport Route

```typescript
export interface TransportRoute {
  _id: string;
  schoolId: string;
  routeName: string;
  routeCode: string;
  vehicleId?: string;
  startPoint: string;
  endPoint: string;
  stops: Array<{
    stopName: string;
    stopTime: string;
    pickupFee: number;
    sequence: number;
  }>;
  totalDistance: number;
  estimatedDuration: number;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  monthlyFee: number;
  status: 'active' | 'inactive' | 'suspended';
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Module 59: Grade System

```typescript
export interface GradeSystem {
  _id: string;
  schoolId: string;
  systemName: string;
  gradeType: 'percentage' | 'gpa' | 'cgpa' | 'letter' | 'points';
  grades: Array<{
    grade: string;
    minMarks: number;
    maxMarks: number;
    gradePoint?: number;
    description?: string;
    remarks?: 'excellent' | 'very-good' | 'good' | 'satisfactory' | 'needs-improvement' | 'fail';
  }>;
  isDefault: boolean;
  applicableFor: 'all' | 'primary' | 'secondary' | 'higher-secondary';
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

### Module 60: Academic Calendar

```typescript
export interface AcademicCalendar {
  _id: string;
  schoolId: string;
  academicYearId: string;
  title: string;
  description?: string;
  eventType: 'holiday' | 'exam' | 'vacation' | 'event' | 'parent-teacher-meeting' | 'sports-day' | 'cultural-event' | 'admission' | 'result-day' | 'other';
  startDate: string;
  endDate: string;
  isHoliday: boolean;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  color: string;
  location?: string;
  organizer?: string;
  participants: string[];
  attachments?: string[];
  reminderDays: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'postponed';
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}
```

## INSTRUCTIONS

1. Create all core setup files first
2. Create endpoints.ts with all 60 modules
3. Apply the 6-file pattern to ALL 60 modules
4. Use exact same pattern for consistency
5. Handle loading/error states in all components
6. Use TypeScript strictly (no 'any' types)

## DELIVERABLES

- ✅ 60 Complete Modules
- ✅ All with CRUD operations
- ✅ TypeScript type-safe
- ✅ TanStack Query integrated
- ✅ Consistent code structure
- ✅ Production-ready

Generate all files following this exact structure for all 60 modules.
```

---

## 🎉 **SUMMARY**

✅ **Backend**: 60 modules complete with models, controllers, routes  
✅ **Master Prompt**: Ready to generate complete frontend  
✅ **5 New Modules Added**:
   - Fee Structure
   - Subject Assignment  
   - Transport Route
   - Grade System
   - Academic Calendar

**Total**: **60 PRODUCTION-READY MODULES** 🚀

---

**Version**: 3.0.0 FINAL  
**Date**: 2026-09-05  
**Status**: ✅ COMPLETE - 60/60 MODULES

---

# 🎯 ALTERNATIVE: 30 CORE MODULE BACKEND PLAN

## FOR CLASS 1-12 SCHOOL SYSTEM ONLY

If you want a **simplified Class 1-12 school system** instead of the full 60-module enterprise system, use these **30 CORE modules** from the existing backend:

### ✅ CORE 30 MODULES (USE EXISTING BACKEND)

**Strategy**: Keep these 30 core modules, skip the remaining 30 advanced/enterprise modules

#### Core Administration (6 modules)
1. **Authentication & User** - `user.model.js`
2. **School Management** - `school.model.js`
3. **Staff Management** - `staff.model.js`
4. **Inventory & Assets** - `inventory.model.js`
5. **Reports & Analytics** - `report.model.js`, `analytics.model.js`, `dashboard.model.js`
6. **Certificates** - `certificate.model.js`

#### Student Management (4 modules)
7. **Student** - `student.model.js`
8. **Parent** - `parent.model.js`, `parent-student-relationship.model.js`
9. **Admission** - `admission.model.js`
10. **Discipline** - `discipline.model.js`

#### Academic Management (8 modules)
11. **Class** (1-12) - `class.model.js`
12. **Section** (A,B,C) - `section.model.js`
13. **Subject** - `subject.model.js`, `subjectAssignment.model.js`
14. **Academic Session** - `academicYear.model.js`, `academicCalendar.model.js`
15. **Teacher** - `teacher.model.js`
16. **Timetable** - `timetable.model.js`
17. **Homework** - `homework.model.js`, `homeworkSubmission.model.js`
18. **Attendance** - `attendance.model.js`

#### Examination (2 modules)
19. **Exam** - `exam.model.js`
20. **Result** - `result.model.js`, `gradeSystem.model.js`

#### Financial (3 modules)
21. **Fee** - `fee.model.js`, `feeStructure.model.js`
22. **Invoice** - `invoice.model.js`
23. **Leave** - `leave.model.js`

#### Facilities (2 modules)
24. **Library** - `library.model.js`, `bookIssue.model.js`
25. **Transport** - `transport.model.js`, `transportRoute.model.js`

#### Communication (3 modules)
26. **Notices** - `communication.model.js`
27. **Events** - `event.model.js`
28. **Notifications** - `notification.model.js`

#### Portals (2 modules)
29. **Parent Portal** - `parentPortal.model.js`
30. **Student/Teacher Portal** - `studentPortal.model.js`, `teacherPortal.model.js`

### ⏸️ SKIP THESE ADVANCED MODULES (for Class 1-12 system)

- ❌ Payroll, Budget, Scholarships
- ❌ Hostel, Canteen
- ❌ Alumni Management
- ❌ Biometric, Vehicle GPS
- ❌ Online Classes, Question Bank
- ❌ Health Records, Visitor Management
- ❌ ID Cards, Expenses
- ❌ Feedback, Complaints
- ❌ Audit Logs, Mobile App API
- ❌ Webhooks, Advanced Integrations

### 🎯 FRONTEND APPROACH FOR 30 MODULES

Use the same frontend pattern but with only 30 modules:

```typescript
// Remove these from endpoints.ts:
- payroll
- budgets
- scholarships
- hostels
- hostelRooms
- canteen
- alumni
- biometricAttendance
- vehicleTracking
- onlineClasses
- questionBank
- healthRecords
- visitors
- idCards
- expenses
- feedback
- complaints
- auditLogs
- mobileApp
- webhooks
```

Keep the same:
- Core setup files (api-client, query-client, providers)
- 6-file pattern per module
- TypeScript interfaces
- TanStack Query integration

**Result**: Lighter, faster, Class 1-12 focused system
