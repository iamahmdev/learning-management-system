# 🚀 MASTER PROMPT: TanStack Query API Integration for School Management System

**Complete Master Prompt for 55+ Module React/Next.js Frontend Integration**

---

## 📋 TABLE OF CONTENTS
1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Core Setup Files](#core-setup-files)
4. [Per-Module Pattern](#per-module-pattern)
5. [Import Rules](#import-rules)
6. [Complete Module List with Endpoints & Fields](#complete-module-list-with-endpoints--fields)

---

## 1. TECH STACK

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Data fetching/caching**: @tanstack/react-query v5
- **HTTP client**: axios
- **State management**: TanStack Query only (no Redux/manual useEffect)
- **Base API URL**: `http://localhost:5000/api`

---

## 2. FOLDER STRUCTURE

```
frontend/
├── src/
│   ├── app/                          # Next.js routes (pages)
│   │   ├── layout.tsx
│   │   └── (modules)/
│   │       ├── users/
│   │       │   └── page.tsx
│   │       ├── schools/
│   │       │   └── page.tsx
│   │       ├── students/
│   │       │   └── page.tsx
│   │       └── ... (55+ modules)
│   │
│   ├── lib/
│   │   ├── api-client.ts             # Axios instance (baseURL, interceptors, auth)
│   │   └── query-client.ts           # QueryClient instance + defaults
│   │
│   ├── providers/
│   │   └── query-provider.tsx        # <QueryClientProvider> wrapper
│   │
│   ├── features/                     # ONE FOLDER PER MODULE
│   │   ├── users/
│   │   │   ├── api/
│   │   │   │   └── users.api.ts
│   │   │   ├── hooks/
│   │   │   │   └── use-users.ts
│   │   │   ├── types/
│   │   │   │   └── users.types.ts
│   │   │   ├── keys/
│   │   │   │   └── users.keys.ts
│   │   │   └── components/
│   │   │       └── UsersList.tsx
│   │   │
│   │   ├── schools/
│   │   │   ├── api/
│   │   │   │   └── schools.api.ts
│   │   │   ├── hooks/
│   │   │   │   └── use-schools.ts
│   │   │   ├── types/
│   │   │   │   └── schools.types.ts
│   │   │   ├── keys/
│   │   │   │   └── schools.keys.ts
│   │   │   └── components/
│   │   │       └── SchoolsList.tsx
│   │   │
│   │   └── ... (55+ module folders)
│   │
│   └── constants/
│       └── endpoints.ts               # All API endpoints (centralized)
```

---

## 3. CORE SETUP FILES (Create Once)

### 📄 lib/api-client.ts
```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // for cookies
});

// Request interceptor - attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or from cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401/errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### 📄 lib/query-client.ts
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### 📄 providers/query-provider.tsx
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

### 📄 app/layout.tsx (Root Layout)
```typescript
import { QueryProvider } from '@/providers/query-provider';

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

---

## 4. PER-MODULE PATTERN (Apply to ALL 55+ Modules)

For each module (e.g., `users`, `schools`, `students`), follow this exact structure:

### STEP 1: Types File (`features/<module>/types/<module>.types.ts`)
```typescript
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff';
  phone?: string;
  profile?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff';
  phone?: string;
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {}

export interface UserFilters {
  schoolId?: string;
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}
```

### STEP 2: Query Keys (`features/<module>/keys/<module>.keys.ts`)
```typescript
export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  list: (filters: object) => [...usersKeys.lists(), filters] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};
```

### STEP 3: API Functions (`features/<module>/api/<module>.api.ts`)
```typescript
import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';
import { User, CreateUserPayload, UpdateUserPayload, UserFilters } from '../types/users.types';

export const getUsers = async (filters?: UserFilters) => {
  const { data } = await apiClient.get<User[]>(ENDPOINTS.users.list, { params: filters });
  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await apiClient.get<User>(ENDPOINTS.users.detail(id));
  return data;
};

export const createUser = async (payload: CreateUserPayload) => {
  const { data } = await apiClient.post<User>(ENDPOINTS.users.create, payload);
  return data;
};

export const updateUser = async ({ id, payload }: { id: string; payload: UpdateUserPayload }) => {
  const { data } = await apiClient.put<User>(ENDPOINTS.users.update(id), payload);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await apiClient.delete(ENDPOINTS.users.delete(id));
  return data;
};
```

### STEP 4: Hooks (`features/<module>/hooks/use-<module>.ts`)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../api/users.api';
import { usersKeys } from '../keys/users.keys';
import type { CreateUserPayload, UpdateUserPayload, UserFilters } from '../types/users.types';

export const useUsersQuery = (filters?: UserFilters) => {
  return useQuery({
    queryKey: usersKeys.list(filters || {}),
    queryFn: () => getUsers(filters),
  });
};

export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
};
```

### STEP 5: Component (`features/<module>/components/<Module>List.tsx`)
```typescript
'use client';

import { useUsersQuery, useDeleteUserMutation } from '../hooks/use-users';

export function UsersList() {
  const { data: users, isLoading, isError, error } = useUsersQuery();
  const deleteUser = useDeleteUserMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      {users?.map((user) => (
        <div key={user._id}>
          <p>{user.name} - {user.email}</p>
          <button onClick={() => deleteUser.mutate(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### STEP 6: Page (`app/(modules)/users/page.tsx`)
```typescript
import { UsersList } from '@/features/users/components/UsersList';

export default function UsersPage() {
  return <UsersList />;
}
```

---

## 5. IMPORT RULES

- ✅ **Components** import from: `features/<module>/hooks`
- ✅ **Hooks** import from: `features/<module>/api` and `features/<module>/keys`
- ✅ **API files** import from: `lib/api-client` and `constants/endpoints`
- ❌ **NEVER** call axios/fetch directly inside a component
- ❌ **NEVER** put query keys directly inside components

---

## 6. COMPLETE MODULE LIST WITH ENDPOINTS & FIELDS

### 📄 constants/endpoints.ts
```typescript
export const ENDPOINTS = {
  // 1. USERS MODULE
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
    create: '/users/register',
    login: '/users/login',
    profile: '/users/profile',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },

  // 2. SCHOOLS MODULE
  schools: {
    list: '/schools',
    detail: (id: string) => `/schools/${id}`,
    create: '/schools',
    update: (id: string) => `/schools/${id}`,
    delete: (id: string) => `/schools/${id}`,
  },

  // 3. STUDENTS MODULE
  students: {
    list: '/students',
    detail: (id: string) => `/students/${id}`,
    create: '/students',
    update: (id: string) => `/students/${id}`,
    delete: (id: string) => `/students/${id}`,
  },

  // 4. TEACHERS MODULE
  teachers: {
    list: '/teachers',
    detail: (id: string) => `/teachers/${id}`,
    create: '/teachers',
    update: (id: string) => `/teachers/${id}`,
    delete: (id: string) => `/teachers/${id}`,
  },

  // 5. PARENTS MODULE
  parents: {
    list: '/parents',
    detail: (id: string) => `/parents/${id}`,
    create: '/parents',
    update: (id: string) => `/parents/${id}`,
    delete: (id: string) => `/parents/${id}`,
  },

  // 6. PARENT-STUDENT RELATIONSHIP MODULE
  parentStudentRelationships: {
    list: '/parent-student-relationships',
    detail: (id: string) => `/parent-student-relationships/${id}`,
    create: '/parent-student-relationships',
    update: (id: string) => `/parent-student-relationships/${id}`,
    delete: (id: string) => `/parent-student-relationships/${id}`,
  },

  // 7. ACADEMIC YEARS MODULE
  academicYears: {
    list: '/academic-years',
    detail: (id: string) => `/academic-years/${id}`,
    create: '/academic-years',
    update: (id: string) => `/academic-years/${id}`,
    delete: (id: string) => `/academic-years/${id}`,
  },

  // 8. CLASSES MODULE
  classes: {
    list: '/classes',
    detail: (id: string) => `/classes/${id}`,
    create: '/classes',
    update: (id: string) => `/classes/${id}`,
    delete: (id: string) => `/classes/${id}`,
  },

  // 9. SECTIONS MODULE
  sections: {
    list: '/sections',
    detail: (id: string) => `/sections/${id}`,
    create: '/sections',
    update: (id: string) => `/sections/${id}`,
    delete: (id: string) => `/sections/${id}`,
  },

  // 10. SUBJECTS MODULE
  subjects: {
    list: '/subjects',
    detail: (id: string) => `/subjects/${id}`,
    create: '/subjects',
    update: (id: string) => `/subjects/${id}`,
    delete: (id: string) => `/subjects/${id}`,
  },

  // 11. ATTENDANCE MODULE
  attendance: {
    list: '/attendance',
    detail: (id: string) => `/attendance/${id}`,
    create: '/attendance',
    update: (id: string) => `/attendance/${id}`,
    delete: (id: string) => `/attendance/${id}`,
  },

  // 12. BIOMETRIC ATTENDANCE MODULE
  biometricAttendance: {
    list: '/biometric-attendance',
    detail: (id: string) => `/biometric-attendance/${id}`,
    create: '/biometric-attendance',
    update: (id: string) => `/biometric-attendance/${id}`,
    delete: (id: string) => `/biometric-attendance/${id}`,
  },

  // 13. EXAMS MODULE
  exams: {
    list: '/exams',
    detail: (id: string) => `/exams/${id}`,
    create: '/exams',
    update: (id: string) => `/exams/${id}`,
    delete: (id: string) => `/exams/${id}`,
  },

  // 14. RESULTS MODULE
  results: {
    list: '/results',
    detail: (id: string) => `/results/${id}`,
    create: '/results',
    update: (id: string) => `/results/${id}`,
    delete: (id: string) => `/results/${id}`,
  },

  // 15. FEES MODULE
  fees: {
    list: '/fees',
    detail: (id: string) => `/fees/${id}`,
    create: '/fees',
    update: (id: string) => `/fees/${id}`,
    delete: (id: string) => `/fees/${id}`,
  },

  // 16. FEE PAYMENTS MODULE
  feePayments: {
    list: '/fee-payments',
    detail: (id: string) => `/fee-payments/${id}`,
    create: '/fee-payments',
    update: (id: string) => `/fee-payments/${id}`,
    delete: (id: string) => `/fee-payments/${id}`,
  },

  // 17. TRANSPORT MODULE
  transport: {
    list: '/transport',
    detail: (id: string) => `/transport/${id}`,
    create: '/transport',
    update: (id: string) => `/transport/${id}`,
    delete: (id: string) => `/transport/${id}`,
  },

  // 18. VEHICLE TRACKING MODULE
  vehicleTracking: {
    list: '/vehicle-tracking',
    detail: (id: string) => `/vehicle-tracking/${id}`,
    create: '/vehicle-tracking',
    update: (id: string) => `/vehicle-tracking/${id}`,
    delete: (id: string) => `/vehicle-tracking/${id}`,
  },

  // 19. LIBRARY MODULE
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

  // 20. BOOK ISSUES MODULE
  bookIssues: {
    list: '/library/issues',
    detail: (id: string) => `/library/issues/${id}`,
    overdue: '/library/overdue',
  },

  // 21. TIMETABLE MODULE
  timetables: {
    list: '/timetables',
    detail: (id: string) => `/timetables/${id}`,
    create: '/timetables',
    update: (id: string) => `/timetables/${id}`,
    delete: (id: string) => `/timetables/${id}`,
  },

  // 22. HOMEWORK MODULE
  homework: {
    list: '/homework',
    detail: (id: string) => `/homework/${id}`,
    create: '/homework',
    update: (id: string) => `/homework/${id}`,
    delete: (id: string) => `/homework/${id}`,
  },

  // 23. HOMEWORK SUBMISSIONS MODULE
  homeworkSubmissions: {
    list: '/homework-submissions',
    detail: (id: string) => `/homework-submissions/${id}`,
    create: '/homework-submissions',
    update: (id: string) => `/homework-submissions/${id}`,
    delete: (id: string) => `/homework-submissions/${id}`,
  },

  // 24. LEAVE MODULE
  leaves: {
    list: '/leaves',
    detail: (id: string) => `/leaves/${id}`,
    create: '/leaves',
    update: (id: string) => `/leaves/${id}`,
    delete: (id: string) => `/leaves/${id}`,
  },

  // 25. STAFF MODULE
  staff: {
    list: '/staff',
    detail: (id: string) => `/staff/${id}`,
    create: '/staff',
    update: (id: string) => `/staff/${id}`,
    delete: (id: string) => `/staff/${id}`,
  },

  // 26. PAYROLL MODULE
  payroll: {
    list: '/payroll',
    detail: (id: string) => `/payroll/${id}`,
    create: '/payroll',
    update: (id: string) => `/payroll/${id}`,
    delete: (id: string) => `/payroll/${id}`,
  },

  // 27. INVENTORY MODULE
  inventory: {
    list: '/inventory',
    detail: (id: string) => `/inventory/${id}`,
    create: '/inventory',
    update: (id: string) => `/inventory/${id}`,
    delete: (id: string) => `/inventory/${id}`,
  },

  // 28. COMMUNICATION MODULE
  communications: {
    list: '/communications',
    detail: (id: string) => `/communications/${id}`,
    create: '/communications',
    update: (id: string) => `/communications/${id}`,
    delete: (id: string) => `/communications/${id}`,
  },

  // 29. NOTIFICATIONS MODULE
  notifications: {
    list: '/notifications',
    detail: (id: string) => `/notifications/${id}`,
    create: '/notifications',
    markAsRead: (id: string) => `/notifications/${id}/read`,
    delete: (id: string) => `/notifications/${id}`,
  },

  // 30. EVENTS MODULE
  events: {
    list: '/events',
    detail: (id: string) => `/events/${id}`,
    create: '/events',
    update: (id: string) => `/events/${id}`,
    delete: (id: string) => `/events/${id}`,
  },

  // 31. ADMISSION MODULE
  admissions: {
    list: '/admissions',
    detail: (id: string) => `/admissions/${id}`,
    create: '/admissions',
    update: (id: string) => `/admissions/${id}`,
    delete: (id: string) => `/admissions/${id}`,
  },

  // 32. CERTIFICATES MODULE
  certificates: {
    list: '/certificates',
    detail: (id: string) => `/certificates/${id}`,
    create: '/certificates',
    update: (id: string) => `/certificates/${id}`,
    delete: (id: string) => `/certificates/${id}`,
  },

  // 33. SCHOLARSHIPS MODULE
  scholarships: {
    list: '/scholarships',
    detail: (id: string) => `/scholarships/${id}`,
    create: '/scholarships',
    update: (id: string) => `/scholarships/${id}`,
    delete: (id: string) => `/scholarships/${id}`,
  },

  // 34. HOSTEL MODULE
  hostels: {
    list: '/hostels',
    detail: (id: string) => `/hostels/${id}`,
    create: '/hostels',
    update: (id: string) => `/hostels/${id}`,
    delete: (id: string) => `/hostels/${id}`,
  },

  // 35. HOSTEL ROOMS MODULE
  hostelRooms: {
    list: '/hostel-rooms',
    detail: (id: string) => `/hostel-rooms/${id}`,
    create: '/hostel-rooms',
    update: (id: string) => `/hostel-rooms/${id}`,
    delete: (id: string) => `/hostel-rooms/${id}`,
  },

  // 36. CANTEEN MODULE
  canteen: {
    list: '/canteen',
    detail: (id: string) => `/canteen/${id}`,
    create: '/canteen',
    update: (id: string) => `/canteen/${id}`,
    delete: (id: string) => `/canteen/${id}`,
  },

  // 37. INVOICES MODULE
  invoices: {
    list: '/invoices',
    detail: (id: string) => `/invoices/${id}`,
    create: '/invoices',
    update: (id: string) => `/invoices/${id}`,
    delete: (id: string) => `/invoices/${id}`,
  },

  // 38. ID CARDS MODULE
  idCards: {
    list: '/id-cards',
    detail: (id: string) => `/id-cards/${id}`,
    create: '/id-cards',
    update: (id: string) => `/id-cards/${id}`,
    delete: (id: string) => `/id-cards/${id}`,
  },

  // 39. VISITORS MODULE
  visitors: {
    list: '/visitors',
    detail: (id: string) => `/visitors/${id}`,
    create: '/visitors',
    update: (id: string) => `/visitors/${id}`,
    delete: (id: string) => `/visitors/${id}`,
  },

  // 40. ONLINE CLASSES MODULE
  onlineClasses: {
    list: '/online-classes',
    detail: (id: string) => `/online-classes/${id}`,
    create: '/online-classes',
    update: (id: string) => `/online-classes/${id}`,
    delete: (id: string) => `/online-classes/${id}`,
  },

  // 41. QUESTION BANK MODULE
  questionBank: {
    list: '/question-bank',
    detail: (id: string) => `/question-bank/${id}`,
    create: '/question-bank',
    update: (id: string) => `/question-bank/${id}`,
    delete: (id: string) => `/question-bank/${id}`,
  },

  // 42. DISCIPLINE MODULE
  discipline: {
    list: '/discipline',
    detail: (id: string) => `/discipline/${id}`,
    create: '/discipline',
    update: (id: string) => `/discipline/${id}`,
    delete: (id: string) => `/discipline/${id}`,
  },

  // 43. HEALTH RECORDS MODULE
  healthRecords: {
    list: '/health-records',
    detail: (id: string) => `/health-records/${id}`,
    create: '/health-records',
    update: (id: string) => `/health-records/${id}`,
    delete: (id: string) => `/health-records/${id}`,
  },

  // 44. COMPLAINTS MODULE
  complaints: {
    list: '/complaints',
    detail: (id: string) => `/complaints/${id}`,
    create: '/complaints',
    update: (id: string) => `/complaints/${id}`,
    delete: (id: string) => `/complaints/${id}`,
  },

  // 45. FEEDBACK MODULE
  feedback: {
    list: '/feedback',
    detail: (id: string) => `/feedback/${id}`,
    create: '/feedback',
    update: (id: string) => `/feedback/${id}`,
    delete: (id: string) => `/feedback/${id}`,
  },

  // 46. ALUMNI MODULE
  alumni: {
    list: '/alumni',
    detail: (id: string) => `/alumni/${id}`,
    create: '/alumni',
    update: (id: string) => `/alumni/${id}`,
    delete: (id: string) => `/alumni/${id}`,
  },

  // 47. BUDGET MODULE
  budgets: {
    list: '/budgets',
    detail: (id: string) => `/budgets/${id}`,
    create: '/budgets',
    update: (id: string) => `/budgets/${id}`,
    delete: (id: string) => `/budgets/${id}`,
  },

  // 48. EXPENSES MODULE
  expenses: {
    list: '/expenses',
    detail: (id: string) => `/expenses/${id}`,
    create: '/expenses',
    update: (id: string) => `/expenses/${id}`,
    delete: (id: string) => `/expenses/${id}`,
  },

  // 49. SETTINGS MODULE
  settings: {
    list: '/settings',
    detail: (id: string) => `/settings/${id}`,
    create: '/settings',
    update: (id: string) => `/settings/${id}`,
    delete: (id: string) => `/settings/${id}`,
  },

  // 50. AUDIT LOG MODULE
  auditLogs: {
    list: '/audit-logs',
    detail: (id: string) => `/audit-logs/${id}`,
  },

  // 51. ANALYTICS MODULE
  analytics: {
    list: '/analytics',
    detail: (id: string) => `/analytics/${id}`,
    dashboard: '/analytics/dashboard',
  },

  // 52. DASHBOARD MODULE
  dashboard: {
    list: '/dashboards',
    detail: (id: string) => `/dashboards/${id}`,
    create: '/dashboards',
    update: (id: string) => `/dashboards/${id}`,
  },

  // 53. REPORTS MODULE
  reports: {
    list: '/reports',
    detail: (id: string) => `/reports/${id}`,
    create: '/reports',
    download: (id: string) => `/reports/${id}/download`,
  },

  // 54. PARENT PORTAL MODULE
  parentPortal: {
    list: '/parent-portal',
    detail: (id: string) => `/parent-portal/${id}`,
    create: '/parent-portal',
    update: (id: string) => `/parent-portal/${id}`,
  },

  // 55. STUDENT PORTAL MODULE
  studentPortal: {
    list: '/student-portal',
    detail: (id: string) => `/student-portal/${id}`,
    create: '/student-portal',
    update: (id: string) => `/student-portal/${id}`,
  },

  // 56. TEACHER PORTAL MODULE
  teacherPortal: {
    list: '/teacher-portal',
    detail: (id: string) => `/teacher-portal/${id}`,
    create: '/teacher-portal',
    update: (id: string) => `/teacher-portal/${id}`,
  },

  // 57. MOBILE APP MODULE
  mobileApp: {
    list: '/mobile-app',
    detail: (id: string) => `/mobile-app/${id}`,
    create: '/mobile-app',
    update: (id: string) => `/mobile-app/${id}`,
  },

  // 58. WEBHOOKS MODULE
  webhooks: {
    list: '/webhooks',
    detail: (id: string) => `/webhooks/${id}`,
    create: '/webhooks',
    update: (id: string) => `/webhooks/${id}`,
    delete: (id: string) => `/webhooks/${id}`,
  },
};
```

---

## 📚 MODULE DETAILS WITH COMPLETE FIELDS

### MODULE 1: USERS
**Endpoints**: `/users`

**Fields**:
```typescript
interface User {
  _id: string;
  name: string;                    // required, 2-100 chars
  email: string;                   // required, unique, lowercase
  password: string;                // required, min 6 chars (not returned in responses)
  role: 'admin' | 'teacher' | 'student' | 'parent' | 'staff';
  phone?: string;                  // max 30 chars
  profile?: string;                // profile picture URL
  status: 'active' | 'inactive';
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 2: SCHOOLS
**Endpoints**: `/schools`

**Fields**:
```typescript
interface School {
  _id: string;
  name: string;                    // required, 2-100 chars
  code: string;                    // required, unique, uppercase, 2-20 chars
  email: string;                   // required, unique, valid email
  phone?: string;                  // max 20 chars
  address?: {
    street?: string;               // max 150 chars
    city?: string;                 // max 50 chars
    state?: string;                // max 50 chars
    country?: string;              // max 50 chars
    postalCode?: string;           // max 20 chars
  };
  website?: string;
  logo?: string;                   // logo URL
  principal?: string;              // User ObjectId
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 3: STUDENTS
**Endpoints**: `/students`

**Fields**:
```typescript
interface Student {
  _id: string;
  userId: string;                  // required, unique, User ObjectId
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  classId: string;                 // required, Class ObjectId
  sectionId: string;               // required, Section ObjectId
  admissionNumber: string;         // required, uppercase, 2-30 chars
  rollNumber?: string;             // max 20 chars
  dateOfBirth: Date;               // required
  gender: 'male' | 'female' | 'other';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  admissionDate: Date;             // required
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 4: TEACHERS
**Endpoints**: `/teachers`

**Fields**:
```typescript
interface Teacher {
  _id: string;
  userId: string;                  // required, unique, User ObjectId
  schoolId: string;                // required, School ObjectId
  employeeId: string;              // required, uppercase, 2-30 chars
  qualification: string;           // required, 2-150 chars
  specialization?: string;         // max 150 chars
  joiningDate: Date;               // required
  employmentType: 'full-time' | 'part-time' | 'contract';
  salary?: number;                 // min 0
  status: 'active' | 'inactive' | 'on-leave';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 5: PARENTS
**Endpoints**: `/parents`

**Fields**:
```typescript
interface Parent {
  _id: string;
  userId: string;                  // required, unique, User ObjectId
  schoolId: string;                // required, School ObjectId
  relationship: 'father' | 'mother' | 'guardian' | 'grandfather' | 'grandmother' | 'other';
  occupation?: string;             // max 100 chars
  alternatePhone?: string;         // max 20 chars
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 6: PARENT-STUDENT RELATIONSHIP
**Endpoints**: `/parent-student-relationships`

**Fields**:
```typescript
interface ParentStudentRelationship {
  _id: string;
  parentId: string;                // required, Parent ObjectId
  studentId: string;               // required, Student ObjectId
  relationship: 'father' | 'mother' | 'guardian' | 'grandfather' | 'grandmother' | 'other';
  isPrimary: boolean;              // default false
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 7: ACADEMIC YEARS
**Endpoints**: `/academic-years`

**Fields**:
```typescript
interface AcademicYear {
  _id: string;
  schoolId: string;                // required, School ObjectId
  name: string;                    // required, 4-50 chars (e.g., "2023-2024")
  startDate: Date;                 // required
  endDate: Date;                   // required, must be after startDate
  isCurrent: boolean;              // default false
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 8: CLASSES
**Endpoints**: `/classes`

**Fields**:
```typescript
interface Class {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  name: string;                    // required, 1-50 chars
  code: string;                    // required, uppercase, 1-20 chars
  description?: string;            // max 500 chars
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 9: SECTIONS
**Endpoints**: `/sections`

**Fields**:
```typescript
interface Section {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  classId: string;                 // required, Class ObjectId
  name: string;                    // required, 1-50 chars (e.g., "A", "B")
  code: string;                    // required, uppercase, 1-20 chars
  roomNumber?: string;             // max 20 chars
  capacity: number;                // min 1, default 30
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 10: SUBJECTS
**Endpoints**: `/subjects`

**Fields**:
```typescript
interface Subject {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  classId: string;                 // required, Class ObjectId
  name: string;                    // required, 2-100 chars
  code: string;                    // required, uppercase, 2-20 chars
  description?: string;            // max 500 chars
  maxMarks: number;                // required, min 1, default 100
  passingMarks: number;            // required, min 0, must be <= maxMarks
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 11: ATTENDANCE
**Endpoints**: `/attendance`

**Fields**:
```typescript
interface Attendance {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  classId: string;                 // required, Class ObjectId
  sectionId: string;               // required, Section ObjectId
  studentId: string;               // required, Student ObjectId
  date: Date;                      // required
  status: 'present' | 'absent' | 'late' | 'leave';
  remarks?: string;                // max 500 chars
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 12: BIOMETRIC ATTENDANCE
**Endpoints**: `/biometric-attendance`

**Fields**:
```typescript
interface BiometricAttendance {
  _id: string;
  schoolId: string;                // required, School ObjectId
  userId: string;                  // required, User ObjectId
  userType: 'student' | 'teacher' | 'staff';
  deviceId: string;                // required
  biometricId: string;             // required
  checkInTime: Date;               // required
  checkOutTime?: Date;
  date: Date;                      // required
  location?: string;
  verificationMethod: 'fingerprint' | 'face' | 'iris' | 'rfid' | 'card';
  status: 'present' | 'late' | 'early-departure' | 'absent';
  remarks?: string;                // max 500 chars
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 13: EXAMS
**Endpoints**: `/exams`

**Fields**:
```typescript
interface Exam {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  name: string;                    // required, 2-100 chars
  code: string;                    // required, uppercase, 2-30 chars
  description?: string;            // max 500 chars
  examType: 'monthly' | 'midterm' | 'final' | 'annual' | 'quiz' | 'assignment' | 'other';
  startDate: Date;                 // required
  endDate: Date;                   // required, must be >= startDate
  totalMarks: number;              // required, min 1
  passingMarks: number;            // required, min 0, must be <= totalMarks
  status: 'draft' | 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;               // required, User ObjectId
  updatedBy?: string;              // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 14: RESULTS
**Endpoints**: `/results`

**Fields**:
```typescript
interface Result {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  examId: string;                  // required, Exam ObjectId
  studentId: string;               // required, Student ObjectId
  subjectId: string;               // required, Subject ObjectId
  marksObtained: number;           // required, min 0
  totalMarks: number;              // required, min 1
  grade?: string;                  // uppercase, max 5 chars
  percentage: number;              // calculated, 0-100
  remarks?: string;                // max 500 chars
  status: 'pass' | 'fail' | 'absent';
  createdBy: string;               // required, User ObjectId
  updatedBy?: string;              // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 15: FEES
**Endpoints**: `/fees`

**Fields**:
```typescript
interface Fee {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  studentId: string;               // required, Student ObjectId
  feeType: 'tuition' | 'admission' | 'exam' | 'transport' | 'library' | 'lab' | 'sports' | 'other';
  amount: number;                  // required, min 0
  paidAmount: number;              // default 0, min 0
  dueDate: Date;                   // required
  paymentDate?: Date;
  paymentMethod?: 'cash' | 'bank' | 'online' | 'card' | 'other';
  transactionId?: string;          // max 100 chars
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  remarks?: string;                // max 500 chars
  createdBy: string;               // required, User ObjectId
  updatedBy?: string;              // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 16: FEE PAYMENTS
**Endpoints**: `/fee-payments`

**Fields**: (Similar to Fees module - use Fee interface)

---

### MODULE 17: TRANSPORT
**Endpoints**: `/transport`

**Fields**:
```typescript
interface Transport {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  vehicleNumber: string;           // required, uppercase, max 50 chars
  vehicleType: 'bus' | 'van' | 'coaster' | 'car' | 'other';
  routeName: string;               // required, max 150 chars
  driverName: string;              // required, max 100 chars
  driverPhone: string;             // required, max 20 chars
  pickupTime: string;              // required, HH:mm format
  dropoffTime: string;             // required, HH:mm format, must be > pickupTime
  monthlyFee: number;              // default 0, min 0
  capacity: number;                // required, min 1
  status: 'active' | 'inactive' | 'maintenance';
  remarks?: string;                // max 500 chars
  createdBy: string;               // required, User ObjectId
  updatedBy?: string;              // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 18: VEHICLE TRACKING
**Endpoints**: `/vehicle-tracking`

**Fields**:
```typescript
interface VehicleTracking {
  _id: string;
  schoolId: string;                // required, School ObjectId
  vehicleId: string;               // required, Transport ObjectId
  timestamp: Date;                 // required, default now
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  speed?: number;                  // min 0
  heading?: number;                // 0-360 degrees
  address?: string;
  status: 'moving' | 'stopped' | 'idle' | 'breakdown';
  driverId?: string;               // Staff ObjectId
  odometer?: number;               // min 0
  fuelLevel?: number;              // 0-100
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 19: LIBRARY
**Endpoints**: `/library/books`, `/library/issues`, `/library/overdue`

**Fields**:
```typescript
interface LibraryBook {
  _id: string;
  schoolId: string;                // required, School ObjectId
  bookTitle: string;               // required, 2-200 chars
  bookCode: string;                // required, uppercase, 2-50 chars
  isbn?: string;                   // max 20 chars
  author: string;                  // required, max 150 chars
  publisher?: string;              // max 150 chars
  category: 'fiction' | 'non-fiction' | 'science' | 'mathematics' | 'history' | 'geography' | 'literature' | 'language' | 'computer' | 'reference' | 'magazine' | 'other';
  language?: string;               // default "English", max 50 chars
  edition?: string;                // max 50 chars
  publicationYear?: number;        // min 1800, max current year + 1
  pages?: number;                  // min 1
  price: number;                   // default 0, min 0
  totalCopies: number;             // required, min 1, default 1
  availableCopies: number;         // required, min 0, default 1
  issuedCopies: number;            // default 0, min 0
  shelfLocation?: string;          // max 100 chars
  description?: string;            // max 1000 chars
  coverImage?: string;             // URL
  status: 'available' | 'out-of-stock' | 'discontinued';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 20: BOOK ISSUES
**Endpoints**: `/library/issues`, `/library/overdue`

**Fields**:
```typescript
interface BookIssue {
  _id: string;
  schoolId: string;                // required, School ObjectId
  bookId: string;                  // required, Library ObjectId
  studentId: string;               // required, Student ObjectId
  issueDate: Date;                 // required
  dueDate: Date;                   // required
  returnDate?: Date;
  status: 'issued' | 'returned' | 'overdue';
  condition: 'good' | 'damaged' | 'lost';
  fineAmount: number;              // default 0, min 0
  remarks?: string;                // max 500 chars
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 21: TIMETABLE
**Endpoints**: `/timetables`

**Fields**:
```typescript
interface Timetable {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  classId: string;                 // required, Class ObjectId
  sectionId: string;               // required, Section ObjectId
  subjectId: string;               // required, Subject ObjectId
  teacherId: string;               // required, Teacher ObjectId
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;               // required, HH:mm format
  endTime: string;                 // required, HH:mm format, must be > startTime
  room?: string;                   // max 100 chars
  status: 'active' | 'inactive';
  remarks?: string;                // max 500 chars
  createdBy: string;               // required, User ObjectId
  updatedBy?: string;              // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 22: HOMEWORK
**Endpoints**: `/homework`

**Fields**:
```typescript
interface Homework {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  classId: string;                 // required, Class ObjectId
  sectionId: string;               // required, Section ObjectId
  subjectId: string;               // required, Subject ObjectId
  teacherId: string;               // required, Teacher ObjectId
  title: string;                   // required, 3-200 chars
  description: string;             // required, max 2000 chars
  assignedDate: Date;              // required, default now
  dueDate: Date;                   // required, must be > assignedDate
  totalMarks: number;              // min 1, default 100
  attachments?: string[];          // array of URLs
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 23: HOMEWORK SUBMISSIONS
**Endpoints**: `/homework-submissions`

**Fields**:
```typescript
interface HomeworkSubmission {
  _id: string;
  homeworkId: string;              // required, Homework ObjectId
  studentId: string;               // required, Student ObjectId
  submittedDate: Date;             // default now
  submissionText?: string;         // max 5000 chars
  attachments?: string[];          // array of URLs
  marksObtained?: number;          // min 0
  feedback?: string;               // max 1000 chars
  status: 'submitted' | 'graded' | 'late' | 'not-submitted';
  gradedBy?: string;               // Teacher ObjectId
  gradedDate?: Date;
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 24: LEAVE
**Endpoints**: `/leaves`

**Fields**:
```typescript
interface Leave {
  _id: string;
  schoolId: string;                // required, School ObjectId
  userId: string;                  // required, User ObjectId
  userType: 'student' | 'teacher' | 'staff';
  leaveType: 'sick' | 'casual' | 'emergency' | 'vacation' | 'maternity' | 'other';
  startDate: Date;                 // required
  endDate: Date;                   // required, must be >= startDate
  totalDays: number;               // required, min 1
  reason: string;                  // required, max 1000 chars
  attachments?: string[];          // array of URLs
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: string;             // User ObjectId
  approvedDate?: Date;
  rejectionReason?: string;        // max 500 chars
  remarks?: string;                // max 500 chars
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 25: STAFF
**Endpoints**: `/staff`

**Fields**:
```typescript
interface Staff {
  _id: string;
  userId: string;                  // required, unique, User ObjectId
  schoolId: string;                // required, School ObjectId
  employeeId: string;              // required, uppercase, 2-30 chars
  department: 'administration' | 'accounts' | 'library' | 'laboratory' | 'sports' | 'transport' | 'security' | 'housekeeping' | 'it' | 'hr' | 'other';
  designation: string;             // required, max 100 chars
  dateOfJoining: Date;             // required
  dateOfBirth: Date;               // required
  gender: 'male' | 'female' | 'other';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
  qualification?: string;          // max 200 chars
  experience?: number;             // min 0, default 0
  salary?: number;                 // min 0, default 0
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  emergencyContact?: {
    name?: string;
    phone?: string;
    relation?: string;
  };
  status: 'active' | 'inactive' | 'resigned' | 'terminated';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 26: PAYROLL
**Endpoints**: `/payroll`

**Fields**:
```typescript
interface Payroll {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  employeeId: string;              // required, User ObjectId
  salaryMonth: string;             // required, YYYY-MM format
  basicSalary: number;             // required, min 0
  allowances: number;              // default 0, min 0
  deductions: number;              // default 0, min 0
  netSalary: number;               // calculated: basicSalary + allowances - deductions
  paymentDate?: Date;
  paymentMethod?: 'cash' | 'bank' | 'online' | 'card' | 'other';
  transactionId?: string;          // max 100 chars
  status: 'pending' | 'paid' | 'cancelled';
  remarks?: string;                // max 500 chars
  createdBy: string;               // required, User ObjectId
  updatedBy?: string;              // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 27: INVENTORY
**Endpoints**: `/inventory`

**Fields**:
```typescript
interface Inventory {
  _id: string;
  schoolId: string;                // required, School ObjectId
  itemName: string;                // required, max 200 chars
  itemCode: string;                // required, uppercase, max 50 chars
  category: 'furniture' | 'electronics' | 'stationery' | 'sports-equipment' | 'laboratory-equipment' | 'books' | 'cleaning-supplies' | 'other';
  quantity: number;                // required, min 0, default 0
  unitPrice: number;               // default 0, min 0
  totalValue: number;              // calculated: quantity * unitPrice
  supplier?: string;               // max 200 chars
  purchaseDate?: Date;
  warrantyExpiry?: Date;
  location?: string;               // max 200 chars
  condition: 'new' | 'good' | 'fair' | 'poor' | 'damaged';
  status: 'available' | 'in-use' | 'under-maintenance' | 'disposed';
  description?: string;            // max 1000 chars
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 28: COMMUNICATION
**Endpoints**: `/communications`

**Fields**:
```typescript
interface Communication {
  _id: string;
  schoolId: string;                // required, School ObjectId
  title: string;                   // required, max 200 chars
  message: string;                 // required, max 5000 chars
  communicationType: 'notice' | 'circular' | 'announcement' | 'alert' | 'newsletter';
  targetAudience: 'all' | 'students' | 'parents' | 'teachers' | 'staff' | 'specific';
  specificRecipients?: string[];   // array of User ObjectIds
  classIds?: string[];             // array of Class ObjectIds
  sectionIds?: string[];           // array of Section ObjectIds
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: string[];          // array of URLs
  publishDate: Date;               // default now
  expiryDate?: Date;
  status: 'draft' | 'published' | 'archived';
  createdBy: string;               // required, User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 29: NOTIFICATIONS
**Endpoints**: `/notifications`

**Fields**:
```typescript
interface Notification {
  _id: string;
  schoolId: string;                // required, School ObjectId
  userId: string;                  // required, User ObjectId
  title: string;                   // required, max 200 chars
  message: string;                 // required, max 1000 chars
  type: 'info' | 'warning' | 'success' | 'error' | 'reminder' | 'announcement';
  category: 'academic' | 'attendance' | 'exam' | 'fee' | 'library' | 'transport' | 'event' | 'general';
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;                 // default false
  readAt?: Date;
  link?: string;                   // URL
  metadata?: any;                  // flexible JSON
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 30: EVENTS
**Endpoints**: `/events`

**Fields**:
```typescript
interface Event {
  _id: string;
  schoolId: string;                // required, School ObjectId
  title: string;                   // required, max 200 chars
  description?: string;            // max 2000 chars
  eventType: 'academic' | 'cultural' | 'sports' | 'holiday' | 'exam' | 'parent-meeting' | 'workshop' | 'other';
  startDate: Date;                 // required
  endDate: Date;                   // required, must be >= startDate
  startTime?: string;              // HH:mm format
  endTime?: string;                // HH:mm format
  venue?: string;                  // max 200 chars
  organizer?: string;              // max 200 chars
  targetAudience: 'all' | 'students' | 'parents' | 'teachers' | 'staff' | 'specific';
  classIds?: string[];             // array of Class ObjectIds
  attachments?: string[];          // array of URLs
  isHoliday: boolean;              // default false
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;               // required, User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 31: ADMISSIONS
**Endpoints**: `/admissions`

**Fields**:
```typescript
interface Admission {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  applicationNumber: string;       // required, unique, uppercase
  studentName: string;             // required, max 100 chars
  dateOfBirth: Date;               // required
  gender: 'male' | 'female' | 'other';
  classAppliedFor: string;         // required, Class ObjectId
  fatherName?: string;             // max 100 chars
  motherName?: string;             // max 100 chars
  guardianPhone: string;           // required
  guardianEmail?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  previousSchool?: string;
  applicationDate: Date;           // default now
  status: 'pending' | 'approved' | 'rejected' | 'waitlisted' | 'admitted';
  remarks?: string;                // max 500 chars
  documents?: string[];            // array of URLs
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 32: CERTIFICATES
**Endpoints**: `/certificates`

**Fields**:
```typescript
interface Certificate {
  _id: string;
  schoolId: string;                // required, School ObjectId
  studentId: string;               // required, Student ObjectId
  certificateType: 'character' | 'transfer' | 'bonafide' | 'completion' | 'achievement' | 'participation' | 'other';
  certificateNumber: string;       // required, unique, uppercase
  issueDate: Date;                 // required, default now
  purpose?: string;                // max 200 chars
  content?: string;                // max 2000 chars
  status: 'draft' | 'issued' | 'revoked';
  issuedBy: string;                // required, User ObjectId
  attachmentUrl?: string;          // URL
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 33: SCHOLARSHIPS
**Endpoints**: `/scholarships`

**Fields**:
```typescript
interface Scholarship {
  _id: string;
  schoolId: string;                // required, School ObjectId
  studentId: string;               // required, Student ObjectId
  scholarshipName: string;         // required, max 200 chars
  scholarshipType: 'merit' | 'need-based' | 'sports' | 'special' | 'government' | 'other';
  amount: number;                  // required, min 0
  percentage?: number;             // 0-100
  academicYearId: string;          // required, AcademicYear ObjectId
  criteria?: string;               // max 500 chars
  startDate: Date;                 // required
  endDate: Date;                   // required
  status: 'active' | 'expired' | 'revoked';
  approvedBy: string;              // required, User ObjectId
  remarks?: string;                // max 500 chars
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 34: HOSTELS
**Endpoints**: `/hostels`

**Fields**:
```typescript
interface Hostel {
  _id: string;
  schoolId: string;                // required, School ObjectId
  hostelName: string;              // required, max 100 chars
  hostelType: 'boys' | 'girls' | 'mixed';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  totalRooms: number;              // required, min 1
  totalBeds: number;               // required, min 1
  occupiedBeds: number;            // default 0, min 0
  warden?: string;                 // Staff ObjectId
  contactPhone?: string;
  facilities?: string[];           // array of strings
  rules?: string;                  // max 2000 chars
  status: 'active' | 'inactive' | 'under-maintenance';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 35: HOSTEL ROOMS
**Endpoints**: `/hostel-rooms`

**Fields**:
```typescript
interface HostelRoom {
  _id: string;
  hostelId: string;                // required, Hostel ObjectId
  roomNumber: string;              // required
  floor: number;                   // required
  capacity: number;                // required, min 1
  occupiedBeds: number;            // default 0, min 0
  students?: string[];             // array of Student ObjectIds
  roomType: 'single' | 'double' | 'triple' | 'dormitory';
  facilities?: string[];           // array of strings
  status: 'available' | 'full' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 36: CANTEEN
**Endpoints**: `/canteen`

**Fields**:
```typescript
interface Canteen {
  _id: string;
  schoolId: string;                // required, School ObjectId
  itemName: string;                // required, max 100 chars
  itemCode: string;                // required, uppercase
  category: 'breakfast' | 'lunch' | 'snacks' | 'beverages' | 'dinner' | 'other';
  price: number;                   // required, min 0
  description?: string;            // max 500 chars
  isVegetarian: boolean;           // default true
  availability: 'always' | 'weekdays' | 'weekends' | 'special';
  status: 'available' | 'unavailable' | 'out-of-stock';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 37: INVOICES
**Endpoints**: `/invoices`

**Fields**:
```typescript
interface Invoice {
  _id: string;
  schoolId: string;                // required, School ObjectId
  studentId: string;               // required, Student ObjectId
  invoiceNumber: string;           // required, unique, uppercase
  invoiceDate: Date;               // required, default now
  dueDate: Date;                   // required
  items: Array<{
    description: string;           // required
    quantity: number;              // required, min 1
    unitPrice: number;             // required, min 0
    totalPrice: number;            // required, min 0
  }>;
  subtotal: number;                // required, min 0
  tax: number;                     // default 0, min 0
  discount: number;                // default 0, min 0
  totalAmount: number;             // required, min 0
  paidAmount: number;              // default 0, min 0
  balanceAmount: number;           // calculated: totalAmount - paidAmount
  status: 'draft' | 'sent' | 'paid' | 'partially-paid' | 'overdue' | 'cancelled';
  paymentMethod?: 'cash' | 'cheque' | 'bank-transfer' | 'card' | 'upi' | 'other';
  paymentDate?: Date;
  transactionId?: string;
  notes?: string;                  // max 1000 chars
  createdBy: string;               // required, User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 38: ID CARDS
**Endpoints**: `/id-cards`

**Fields**:
```typescript
interface IDCard {
  _id: string;
  schoolId: string;                // required, School ObjectId
  userId: string;                  // required, User ObjectId
  userType: 'student' | 'teacher' | 'staff';
  cardNumber: string;              // required, unique, uppercase
  issueDate: Date;                 // required, default now
  expiryDate: Date;                // required
  cardTemplate: 'standard' | 'premium' | 'custom';
  qrCode?: string;
  barcode?: string;
  status: 'active' | 'expired' | 'lost' | 'damaged' | 'revoked';
  issuedBy: string;                // required, User ObjectId
  remarks?: string;                // max 500 chars
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 39: VISITORS
**Endpoints**: `/visitors`

**Fields**:
```typescript
interface Visitor {
  _id: string;
  schoolId: string;                // required, School ObjectId
  visitorName: string;             // required, max 100 chars
  visitorPhone: string;            // required
  visitorEmail?: string;
  idProof?: string;
  purpose: 'meeting' | 'admission-inquiry' | 'parent-meeting' | 'vendor' | 'official' | 'other';
  personToMeet?: string;           // User ObjectId
  visitDate: Date;                 // required, default now
  checkInTime: Date;               // required, default now
  checkOutTime?: Date;
  vehicleNumber?: string;          // uppercase
  remarks?: string;                // max 500 chars
  status: 'checked-in' | 'checked-out' | 'rejected';
  approvedBy?: string;             // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 40: ONLINE CLASSES
**Endpoints**: `/online-classes`

**Fields**:
```typescript
interface OnlineClass {
  _id: string;
  schoolId: string;                // required, School ObjectId
  classId: string;                 // required, Class ObjectId
  sectionId: string;               // required, Section ObjectId
  subjectId: string;               // required, Subject ObjectId
  teacherId: string;               // required, Teacher ObjectId
  title: string;                   // required, max 200 chars
  description?: string;            // max 1000 chars
  scheduledDate: Date;             // required
  startTime: string;               // required
  duration: number;                // required, min 15
  meetingLink?: string;
  meetingId?: string;
  password?: string;
  platform: 'zoom' | 'google-meet' | 'microsoft-teams' | 'other';
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  recording?: {
    url?: string;
    duration?: number;
  };
  attendance?: Array<{
    studentId: string;
    joinedAt?: Date;
    leftAt?: Date;
    duration?: number;
  }>;
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 41: QUESTION BANK
**Endpoints**: `/question-bank`

**Fields**:
```typescript
interface QuestionBank {
  _id: string;
  schoolId: string;                // required, School ObjectId
  subjectId: string;               // required, Subject ObjectId
  classId: string;                 // required, Class ObjectId
  question: string;                // required, max 2000 chars
  questionType: 'mcq' | 'true-false' | 'short-answer' | 'long-answer' | 'fill-blank';
  options?: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswer?: string;
  marks: number;                   // required, min 1
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;                  // max 200 chars
  explanation?: string;            // max 1000 chars
  createdBy: string;               // required, Teacher ObjectId
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 42: DISCIPLINE
**Endpoints**: `/discipline`

**Fields**:
```typescript
interface Discipline {
  _id: string;
  schoolId: string;                // required, School ObjectId
  studentId: string;               // required, Student ObjectId
  incidentDate: Date;              // required
  incidentType: 'late-arrival' | 'absence' | 'misbehavior' | 'violation' | 'fighting' | 'bullying' | 'other';
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  description: string;             // required, max 1000 chars
  action: 'warning' | 'detention' | 'suspension' | 'expulsion' | 'counseling' | 'parent-meeting' | 'other';
  actionDate: Date;                // default now
  reportedBy: string;              // required, User ObjectId
  remarks?: string;                // max 500 chars
  status: 'open' | 'resolved' | 'escalated';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 43: HEALTH RECORDS
**Endpoints**: `/health-records`

**Fields**:
```typescript
interface HealthRecord {
  _id: string;
  schoolId: string;                // required, School ObjectId
  studentId: string;               // required, Student ObjectId
  recordType: 'checkup' | 'illness' | 'injury' | 'allergy' | 'vaccination' | 'medication' | 'other';
  date: Date;                      // required, default now
  description: string;             // required, max 1000 chars
  symptoms?: string;               // max 500 chars
  diagnosis?: string;              // max 500 chars
  treatment?: string;              // max 500 chars
  prescription?: string;           // max 500 chars
  doctorName?: string;             // max 100 chars
  followUpDate?: Date;
  documents?: string[];            // array of URLs
  recordedBy: string;              // required, User ObjectId
  status: 'active' | 'resolved' | 'followup-required';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 44: COMPLAINTS
**Endpoints**: `/complaints`

**Fields**:
```typescript
interface Complaint {
  _id: string;
  schoolId: string;                // required, School ObjectId
  complaintNumber: string;         // required, unique, uppercase
  submittedBy: string;             // required, User ObjectId
  category: 'academic' | 'infrastructure' | 'staff' | 'transport' | 'fee' | 'harassment' | 'other';
  subject: string;                 // required, max 200 chars
  description: string;             // required, max 2000 chars
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: string[];          // array of URLs
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed' | 'rejected';
  assignedTo?: string;             // User ObjectId
  resolution?: string;             // max 1000 chars
  resolvedDate?: Date;
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 45: FEEDBACK
**Endpoints**: `/feedback`

**Fields**:
```typescript
interface Feedback {
  _id: string;
  schoolId: string;                // required, School ObjectId
  submittedBy: string;             // required, User ObjectId
  feedbackType: 'suggestion' | 'appreciation' | 'concern' | 'improvement' | 'other';
  category: 'academic' | 'infrastructure' | 'staff' | 'transport' | 'fee' | 'events' | 'other';
  subject: string;                 // required, max 200 chars
  message: string;                 // required, max 2000 chars
  rating?: number;                 // 1-5
  isAnonymous: boolean;            // default false
  status: 'pending' | 'reviewed' | 'acknowledged';
  response?: string;               // max 1000 chars
  respondedBy?: string;            // User ObjectId
  respondedDate?: Date;
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 46: ALUMNI
**Endpoints**: `/alumni`

**Fields**:
```typescript
interface Alumni {
  _id: string;
  schoolId: string;                // required, School ObjectId
  userId: string;                  // required, unique, User ObjectId
  studentId?: string;              // Student ObjectId
  admissionNumber?: string;        // uppercase
  passoutYear: number;             // required
  lastClass?: string;              // Class ObjectId
  currentOccupation?: string;      // max 200 chars
  company?: string;                // max 200 chars
  designation?: string;            // max 100 chars
  higherEducation?: string;        // max 200 chars
  achievements?: Array<{
    title?: string;
    description?: string;
    year?: number;
  }>;
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  isVerified: boolean;             // default false
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 47: BUDGETS
**Endpoints**: `/budgets`

**Fields**:
```typescript
interface Budget {
  _id: string;
  schoolId: string;                // required, School ObjectId
  title: string;                   // required, max 200 chars
  category: 'salary' | 'maintenance' | 'utilities' | 'supplies' | 'transport' | 'equipment' | 'marketing' | 'other';
  fiscalYear: string;              // required
  allocatedAmount: number;         // required, min 0
  spentAmount: number;             // default 0, min 0
  remainingAmount: number;         // calculated: allocatedAmount - spentAmount
  startDate: Date;                 // required
  endDate: Date;                   // required
  status: 'active' | 'completed' | 'exceeded';
  createdBy: string;               // required, User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 48: EXPENSES
**Endpoints**: `/expenses`

**Fields**:
```typescript
interface Expense {
  _id: string;
  schoolId: string;                // required, School ObjectId
  expenseCategory: 'salary' | 'maintenance' | 'utilities' | 'supplies' | 'transport' | 'rent' | 'equipment' | 'marketing' | 'other';
  title: string;                   // required, max 200 chars
  description?: string;            // max 1000 chars
  amount: number;                  // required, min 0
  expenseDate: Date;               // required
  paymentMethod: 'cash' | 'cheque' | 'bank-transfer' | 'card' | 'upi' | 'other';
  referenceNumber?: string;
  vendorName?: string;             // max 200 chars
  vendorContact?: string;
  invoiceNumber?: string;
  attachments?: string[];          // array of URLs
  approvedBy?: string;             // User ObjectId
  paidBy: string;                  // required, User ObjectId
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 49: SETTINGS
**Endpoints**: `/settings`

**Fields**:
```typescript
interface Setting {
  _id: string;
  schoolId: string;                // required, School ObjectId
  category: 'general' | 'academic' | 'attendance' | 'exam' | 'fee' | 'notification' | 'security' | 'other';
  key: string;                     // required
  value: any;                      // required, flexible JSON
  description?: string;            // max 500 chars
  isPublic: boolean;               // default false
  updatedBy?: string;              // User ObjectId
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 50: AUDIT LOGS
**Endpoints**: `/audit-logs`

**Fields**:
```typescript
interface AuditLog {
  _id: string;
  schoolId?: string;               // School ObjectId
  userId: string;                  // required, User ObjectId
  action: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout' | 'approve' | 'reject' | 'other';
  module: string;                  // required
  resourceType?: string;
  resourceId?: string;             // ObjectId
  details?: any;                   // flexible JSON
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;                 // default now
}
```

---

### MODULE 51: ANALYTICS
**Endpoints**: `/analytics`, `/analytics/dashboard`

**Fields**:
```typescript
interface Analytics {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  date: Date;                      // required
  metrics: {
    totalStudents?: number;
    totalTeachers?: number;
    totalStaff?: number;
    presentStudents?: number;
    absentStudents?: number;
    attendanceRate?: number;
    feeCollectionRate?: number;
    outstandingFees?: number;
    admissionsReceived?: number;
    admissionsApproved?: number;
    libraryBooksIssued?: number;
    homeworkSubmitted?: number;
    eventsScheduled?: number;
  };
  performance?: {
    averageScore?: number;
    passPercentage?: number;
    topPerformers?: number;
  };
  financial?: {
    totalRevenue?: number;
    totalExpenses?: number;
    netIncome?: number;
  };
  calculatedAt: Date;              // default now
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 52: DASHBOARDS
**Endpoints**: `/dashboards`

**Fields**:
```typescript
interface Dashboard {
  _id: string;
  userId: string;                  // required, User ObjectId
  schoolId: string;                // required, School ObjectId
  userRole: 'admin' | 'super_admin' | 'principal' | 'teacher' | 'student' | 'parent' | 'accountant' | 'librarian' | 'staff';
  widgets?: Array<{
    widgetId?: string;
    name?: string;
    type?: string;
    position?: { x?: number; y?: number };
    size?: { width?: number; height?: number };
    isVisible?: boolean;
    settings?: any;
  }>;
  quickLinks?: Array<{
    name?: string;
    url?: string;
    icon?: string;
    order?: number;
  }>;
  recentActivities?: Array<{
    activity?: string;
    timestamp?: Date;
    module?: string;
  }>;
  preferences?: {
    defaultView?: string;
    theme?: 'light' | 'dark';
    notifications?: boolean;
    autoRefresh?: boolean;
    refreshInterval?: number;
  };
  lastAccessed: Date;              // default now
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 53: REPORTS
**Endpoints**: `/reports`, `/reports/:id/download`

**Fields**:
```typescript
interface Report {
  _id: string;
  schoolId: string;                // required, School ObjectId
  academicYearId: string;          // required, AcademicYear ObjectId
  generatedBy: string;             // required, User ObjectId
  reportType: 'attendance' | 'fee' | 'result' | 'student' | 'teacher' | 'exam' | 'library' | 'transport' | 'admission' | 'expense' | 'budget' | 'payroll' | 'custom';
  title: string;                   // required
  description?: string;
  filters?: any;                   // flexible JSON
  dateRange?: {
    startDate?: Date;
    endDate?: Date;
  };
  data?: any;                      // flexible JSON
  fileUrl?: string;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  status: 'generating' | 'completed' | 'failed';
  downloadCount: number;           // default 0
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 54: PARENT PORTAL
**Endpoints**: `/parent-portal`

**Fields**:
```typescript
interface ParentPortal {
  _id: string;
  parentId: string;                // required, Parent ObjectId
  schoolId: string;                // required, School ObjectId
  lastLogin: Date;                 // default now
  preferences?: {
    notifications?: boolean;
    emailAlerts?: boolean;
    smsAlerts?: boolean;
  };
  accessibleStudents?: string[];   // array of Student ObjectIds
  portalAccess?: {
    attendance?: boolean;
    results?: boolean;
    fees?: boolean;
    homework?: boolean;
    library?: boolean;
    timetable?: boolean;
    events?: boolean;
  };
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 55: STUDENT PORTAL
**Endpoints**: `/student-portal`

**Fields**:
```typescript
interface StudentPortal {
  _id: string;
  studentId: string;               // required, unique, Student ObjectId
  schoolId: string;                // required, School ObjectId
  lastLogin: Date;                 // default now
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: boolean;
  };
  portalAccess?: {
    attendance?: boolean;
    results?: boolean;
    homework?: boolean;
    library?: boolean;
    timetable?: boolean;
    onlineClasses?: boolean;
    events?: boolean;
    fees?: boolean;
  };
  activityLog?: Array<{
    action?: string;
    timestamp?: Date;
    module?: string;
  }>;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 56: TEACHER PORTAL
**Endpoints**: `/teacher-portal`

**Fields**:
```typescript
interface TeacherPortal {
  _id: string;
  teacherId: string;               // required, unique, Teacher ObjectId
  schoolId: string;                // required, School ObjectId
  lastLogin: Date;                 // default now
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
    defaultView?: 'dashboard' | 'classes' | 'attendance';
  };
  portalAccess?: {
    attendance?: boolean;
    grading?: boolean;
    homework?: boolean;
    timetable?: boolean;
    onlineClasses?: boolean;
    studentRecords?: boolean;
    reports?: boolean;
  };
  assignedClasses?: Array<{
    classId?: string;              // Class ObjectId
    sectionId?: string;            // Section ObjectId
    subjectId?: string;            // Subject ObjectId
  }>;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 57: MOBILE APP
**Endpoints**: `/mobile-app`

**Fields**:
```typescript
interface MobileApp {
  _id: string;
  userId: string;                  // required, User ObjectId
  schoolId: string;                // required, School ObjectId
  deviceInfo: {
    deviceId: string;              // required
    deviceType: 'ios' | 'android'; // required
    deviceModel?: string;
    osVersion?: string;
    appVersion?: string;
  };
  fcmToken?: string;
  settings?: {
    pushNotifications?: boolean;
    emailNotifications?: boolean;
    smsNotifications?: boolean;
    language?: string;
    theme?: 'light' | 'dark' | 'auto';
  };
  lastActive: Date;                // default now
  installDate: Date;               // default now
  status: 'active' | 'inactive' | 'blocked';
  createdAt: string;
  updatedAt: string;
}
```

---

### MODULE 58: WEBHOOKS
**Endpoints**: `/webhooks`

**Fields**:
```typescript
interface Webhook {
  _id: string;
  schoolId: string;                // required, School ObjectId
  name: string;                    // required
  url: string;                     // required
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Map<string, string>;
  events?: Array<'student.created' | 'student.updated' | 'attendance.marked' | 'fee.paid' | 'result.published' | 'homework.assigned' | 'exam.scheduled' | 'leave.requested' | 'admission.submitted' | 'parent.registered'>;
  secret: string;                  // required
  retryPolicy?: {
    maxRetries?: number;           // default 3
    retryDelay?: number;           // default 5000
  };
  isActive: boolean;               // default true
  lastTriggered?: Date;
  successCount: number;            // default 0
  failureCount: number;            // default 0
  status: 'active' | 'inactive' | 'failed';
  createdAt: string;
  updatedAt: string;
}
```

---

## 🎯 SUMMARY

This master prompt provides:

✅ **Complete Tech Stack** - Next.js 14, TypeScript, TanStack Query v5, Axios  
✅ **Folder Structure** - Consistent feature-based organization  
✅ **Core Setup** - api-client, query-client, query-provider  
✅ **6-Step Per-Module Pattern** - Types → Keys → API → Hooks → Components → Pages  
✅ **55+ Modules** - All endpoints centralized in constants/endpoints.ts  
✅ **Complete Field Definitions** - Every model with TypeScript interfaces  
✅ **Import Rules** - Clear separation of concerns  

**Next Steps:**
1. Create the core setup files (lib/, providers/, constants/)
2. Apply the 6-step pattern to each module starting with `users`
3. Replicate for all 55+ modules
4. Test each module's CRUD operations

---

**Generated for:** School Learning Management System  
**Total Modules:** 58 (55+ feature modules + 3 portal modules)  
**Date:** 2026-09-05  
**Version:** 1.0.0
