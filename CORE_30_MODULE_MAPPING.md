# 🎯 CORE 30 MODULE MAPPING - Existing 60 to Core 30

**Date**: September 5, 2026  
**Status**: Backend Refinement Phase

---

## 📊 MAPPING OVERVIEW

**Existing Backend**: 60+ modules  
**Target Core**: 30 modules  
**Strategy**: Keep core, skip advanced enterprise modules

---

## ✅ CORE 30 MODULES (KEEP & FIX)

### 1. ✅ Authentication & User Management
**Existing Files**: `user.model.js`, `user.controller.js`, `user.routes.js`  
**Status**: ✅ KEEP - Core authentication module  
**Action**: Verify JWT, roles (admin, teacher, student, parent, staff)

### 2. ✅ School Management
**Existing Files**: `school.model.js`, `school.controller.js`, `school.routes.js`  
**Status**: ✅ KEEP - Core school info  
**Action**: Verify CRUD operations

### 3. ✅ Student Management
**Existing Files**: `student.model.js`, `student.controller.js`, `student.routes.js`  
**Status**: ✅ KEEP - Essential for Class 1-12  
**Action**: Verify relationships with parent, class, section

### 4. ✅ Parent Management
**Existing Files**: `parent.model.js`, `parent.controller.js`, `parent.routes.js`  
**Status**: ✅ KEEP - Core parent module  
**Related**: `parent-student-relationship.model.js` ✅ KEEP  
**Action**: Verify parent-student relationships

### 5. ✅ Teacher Management
**Existing Files**: `teacher.model.js`, `teacher.controller.js`, `teacher.routes.js`  
**Status**: ✅ KEEP - Essential teaching staff  
**Action**: Verify subject/class assignments

### 6. ✅ Staff Management
**Existing Files**: `staff.model.js`, `staff.controller.js`, `staff.routes.js`  
**Status**: ✅ KEEP - Non-teaching staff (librarian, accountant, etc.)  
**Action**: Keep basic staff features, skip advanced HR

### 7. ✅ Class Management
**Existing Files**: `class.model.js`, `class.controller.js`, `class.routes.js`  
**Status**: ✅ KEEP - Handles Class 1-12 as records  
**Action**: Verify class records support Class 1-12

### 8. ✅ Section Management
**Existing Files**: `section.model.js`, `section.controller.js`, `section.routes.js`  
**Status**: ✅ KEEP - Class divisions (A, B, C, etc.)  
**Action**: Verify section-class relationship

### 9. ✅ Subject Management
**Existing Files**: `subject.model.js`, `subject.controller.js`, `subject.routes.js`  
**Status**: ✅ KEEP - School subjects  
**Related**: `subjectAssignment.model.js` ✅ KEEP (teacher-subject mapping)  
**Action**: Verify subject assignments

### 10. ✅ Academic Session/Year Management
**Existing Files**: `academicYear.model.js`, `academicYear.controller.js`, `academicYear.routes.js`  
**Status**: ✅ KEEP - Academic sessions (2025-2026, etc.)  
**Related**: `academicCalendar.model.js` ✅ KEEP (events/holidays)  
**Action**: Verify session management

### 11. ✅ Admission & Enrollment Management
**Existing Files**: `admission.model.js`, `admission.controller.js`, `admission.routes.js`  
**Status**: ✅ KEEP - Student admissions  
**Action**: Verify application workflow, approval/rejection

### 12. ✅ Attendance Management
**Existing Files**: `attendance.model.js`, `attendance.controller.js`, `attendance.routes.js`  
**Status**: ✅ KEEP - Student/teacher attendance  
**Action**: Verify daily attendance, prevent duplicates

### 13. ✅ Timetable Management
**Existing Files**: `timetable.model.js`, `timetable.controller.js`, `timetable.routes.js`  
**Status**: ✅ KEEP - Class/teacher timetables  
**Action**: Verify timetable grid functionality

### 14. ✅ Exam Management
**Existing Files**: `exam.model.js`, `exam.controller.js`, `exam.routes.js`  
**Status**: ✅ KEEP - Exam scheduling  
**Action**: Verify exam creation, schedules

### 15. ✅ Result & Grading Management
**Existing Files**: `result.model.js`, `result.controller.js`, `result.routes.js`  
**Status**: ✅ KEEP - Student results  
**Related**: `gradeSystem.model.js` ✅ KEEP (grading scales)  
**Action**: Verify result entry, calculations

### 16. ✅ Homework & Assignment Management
**Existing Files**: `homework.model.js`, `homework.controller.js`, `homework.routes.js`  
**Status**: ✅ KEEP - Homework assignments  
**Related**: `homeworkSubmission.model.js` ✅ KEEP (submissions)  
**Action**: Verify homework workflow

### 17. ✅ Fee Management
**Existing Files**: `fee.model.js`, `fee.controller.js`, `fee.routes.js`  
**Status**: ✅ KEEP - Student fees  
**Related**: `feeStructure.model.js` ✅ KEEP (fee types/amounts)  
**Action**: Verify fee tracking

### 18. ✅ Fee Invoice & Receipt Management
**Existing Files**: `invoice.model.js`, `invoice.controller.js`, `invoice.routes.js`  
**Status**: ✅ KEEP - Fee invoices & receipts  
**Action**: Verify invoice/receipt generation, payments

### 19. ✅ Leave Management
**Existing Files**: `leave.model.js`, `leave.controller.js`, `leave.routes.js`  
**Status**: ✅ KEEP - Leave applications  
**Action**: Verify leave approval workflow

### 20. ✅ Library Management
**Existing Files**: `library.model.js`, `library.controller.js`, `library.routes.js`  
**Status**: ✅ KEEP - Library books  
**Related**: `bookIssue.model.js` ✅ KEEP (book issue/return)  
**Action**: Verify book management, issue/return

### 21. ✅ Transport Management
**Existing Files**: `transport.model.js`, `transport.controller.js`, `transport.routes.js`  
**Status**: ✅ KEEP - School transport  
**Related**: `transportRoute.model.js` ✅ KEEP (routes/stops)  
**Action**: Verify vehicle, driver, route management

### 22. ✅ Notice & Announcement Management
**Existing Files**: `communication.model.js`, `communication.controller.js`, `communication.routes.js`  
**Status**: ✅ KEEP - School notices  
**Action**: Verify announcement creation, audience targeting

### 23. ✅ Event Management
**Existing Files**: `event.model.js`, `event.controller.js`, `event.routes.js`  
**Status**: ✅ KEEP - School events  
**Action**: Verify event calendar functionality

### 24. ✅ Communication & Notification Management
**Existing Files**: `notification.model.js`, `notification.controller.js`, `notification.routes.js`  
**Status**: ✅ KEEP - User notifications  
**Action**: Verify notification system, read/unread status

### 25. ✅ Reports & Analytics
**Existing Files**: `report.model.js`, `report.controller.js`, `report.routes.js`  
**Status**: ✅ KEEP - School reports  
**Related**: `analytics.model.js` ✅ KEEP, `dashboard.model.js` ✅ KEEP  
**Action**: Verify report generation

### 26. ✅ Certificate & Document Management
**Existing Files**: `certificate.model.js`, `certificate.controller.js`, `certificate.routes.js`  
**Status**: ✅ KEEP - Student certificates  
**Action**: Verify certificate generation, verification

### 27. ✅ Inventory & Asset Management
**Existing Files**: `inventory.model.js`, `inventory.controller.js`, `inventory.routes.js`  
**Status**: ✅ KEEP - School assets  
**Action**: Verify asset tracking

### 28. ✅ Discipline & Behavior Management
**Existing Files**: `discipline.model.js`, `discipline.controller.js`, `discipline.routes.js`  
**Status**: ✅ KEEP - Student discipline  
**Action**: Verify incident tracking

### 29. ✅ Parent Portal
**Existing Files**: `parentPortal.model.js`, `parentPortal.controller.js`, `parentPortal.routes.js`  
**Status**: ✅ KEEP - Parent dashboard  
**Action**: Verify parent can see only their children

### 30. ✅ Student & Teacher Portal
**Existing Files**: 
- `studentPortal.model.js`, `studentPortal.controller.js`, `studentPortal.routes.js` ✅ KEEP
- `teacherPortal.model.js`, `teacherPortal.controller.js`, `teacherPortal.routes.js` ✅ KEEP  
**Status**: ✅ KEEP - Role-specific portals  
**Action**: Verify portal access, role-based features

---

## ⏸️ ADVANCED MODULES (SKIP FOR NOW)

### 31. ⏸️ Payroll Management
**Existing Files**: `payroll.model.js`  
**Status**: ⏸️ SKIP - Advanced HR feature  
**Action**: Keep code but don't actively develop

### 32. ⏸️ Budget Management
**Existing Files**: `budget.model.js`  
**Status**: ⏸️ SKIP - Advanced finance  
**Action**: Keep code but don't actively develop

### 33. ⏸️ Scholarship & Financial Aid
**Existing Files**: `scholarship.model.js`  
**Status**: ⏸️ SKIP - Advanced feature  
**Action**: Keep code but don't actively develop

### 34. ⏸️ Hostel Management
**Existing Files**: `hostel.model.js`, `hostelRoom.model.js`  
**Status**: ⏸️ SKIP - Not needed for all schools  
**Action**: Keep code but don't actively develop

### 35. ⏸️ Canteen Management
**Existing Files**: `canteen.model.js`  
**Status**: ⏸️ SKIP - Advanced feature  
**Action**: Keep code but don't actively develop

### 36. ⏸️ Alumni Management
**Existing Files**: `alumni.model.js`  
**Status**: ⏸️ SKIP - Nice-to-have feature  
**Action**: Keep code but don't actively develop

### 37. ⏸️ Biometric Attendance
**Existing Files**: `biometricAttendance.model.js`  
**Status**: ⏸️ SKIP - Advanced hardware integration  
**Action**: Keep code but don't actively develop

### 38. ⏸️ Vehicle Tracking / GPS
**Existing Files**: `vehicleTracking.model.js`  
**Status**: ⏸️ SKIP - Advanced transport feature  
**Action**: Keep code but don't actively develop

### 39. ⏸️ Online Classes / Virtual Classroom
**Existing Files**: `onlineClass.model.js`  
**Status**: ⏸️ SKIP - Advanced feature  
**Action**: Keep code but don't actively develop

### 40. ⏸️ Question Bank
**Existing Files**: `questionBank.model.js`  
**Status**: ⏸️ SKIP - Advanced exam feature  
**Action**: Keep code but don't actively develop

### 41. ⏸️ Health Records
**Existing Files**: `healthRecord.model.js`  
**Status**: ⏸️ SKIP - Advanced feature  
**Action**: Keep code but don't actively develop

### 42. ⏸️ Visitor Management
**Existing Files**: `visitor.model.js`  
**Status**: ⏸️ SKIP - Advanced security feature  
**Action**: Keep code but don't actively develop

### 43. ⏸️ ID Card Management
**Existing Files**: `idCard.model.js`  
**Status**: ⏸️ SKIP - Advanced feature  
**Action**: Keep code but don't actively develop

### 44. ⏸️ Expense Management
**Existing Files**: `expense.model.js`  
**Status**: ⏸️ SKIP - Advanced accounting  
**Action**: Keep code but don't actively develop

### 45. ⏸️ Feedback & Complaints
**Existing Files**: `feedback.model.js`, `complaint.model.js`  
**Status**: ⏸️ SKIP - Nice-to-have features  
**Action**: Keep code but don't actively develop

### 46. ⏸️ Audit Logs
**Existing Files**: `auditLog.model.js`  
**Status**: ⏸️ SKIP - Advanced monitoring  
**Action**: Keep code but don't actively develop

### 47. ⏸️ Settings Management
**Existing Files**: `setting.model.js`  
**Status**: ⏸️ SKIP - Can be simplified  
**Action**: Keep code but don't actively develop

### 48. ⏸️ Mobile App API
**Existing Files**: `mobileApp.model.js`  
**Status**: ⏸️ SKIP - Advanced feature  
**Action**: Keep code but don't actively develop

### 49. ⏸️ Webhook Integration
**Existing Files**: `webhook.model.js`  
**Status**: ⏸️ SKIP - Advanced integration  
**Action**: Keep code but don't actively develop

---

## 📋 ACTION PLAN

### Phase 1: Inspection ✅
- [x] List all existing 60+ modules
- [x] Map to 30 core modules
- [x] Identify which to keep, skip

### Phase 2: Verification (NEXT)
- [ ] Test all 30 core module APIs
- [ ] Verify models have correct fields
- [ ] Verify relationships work
- [ ] Verify validation exists
- [ ] Check authentication works
- [ ] Check authorization works

### Phase 3: Fix & Complete
- [ ] Fix any broken core modules
- [ ] Complete incomplete features
- [ ] Add missing validations
- [ ] Fix relationship issues

### Phase 4: Documentation
- [ ] Document API endpoints
- [ ] Create Postman collection
- [ ] Update README

### Phase 5: Testing
- [ ] Test all CRUD operations
- [ ] Test search/filter/pagination
- [ ] Test authentication
- [ ] Test authorization
- [ ] Test relationships

---

## 🎯 CORE 30 MODULE SUMMARY

| # | Module | Existing File | Status |
|---|--------|--------------|--------|
| 1 | Authentication & User | user.model.js | ✅ KEEP |
| 2 | School | school.model.js | ✅ KEEP |
| 3 | Student | student.model.js | ✅ KEEP |
| 4 | Parent | parent.model.js | ✅ KEEP |
| 5 | Teacher | teacher.model.js | ✅ KEEP |
| 6 | Staff | staff.model.js | ✅ KEEP |
| 7 | Class | class.model.js | ✅ KEEP |
| 8 | Section | section.model.js | ✅ KEEP |
| 9 | Subject | subject.model.js | ✅ KEEP |
| 10 | Academic Session | academicYear.model.js | ✅ KEEP |
| 11 | Admission | admission.model.js | ✅ KEEP |
| 12 | Attendance | attendance.model.js | ✅ KEEP |
| 13 | Timetable | timetable.model.js | ✅ KEEP |
| 14 | Exam | exam.model.js | ✅ KEEP |
| 15 | Result | result.model.js | ✅ KEEP |
| 16 | Homework | homework.model.js | ✅ KEEP |
| 17 | Fee | fee.model.js | ✅ KEEP |
| 18 | Invoice | invoice.model.js | ✅ KEEP |
| 19 | Leave | leave.model.js | ✅ KEEP |
| 20 | Library | library.model.js | ✅ KEEP |
| 21 | Transport | transport.model.js | ✅ KEEP |
| 22 | Communication | communication.model.js | ✅ KEEP |
| 23 | Event | event.model.js | ✅ KEEP |
| 24 | Notification | notification.model.js | ✅ KEEP |
| 25 | Reports | report.model.js | ✅ KEEP |
| 26 | Certificate | certificate.model.js | ✅ KEEP |
| 27 | Inventory | inventory.model.js | ✅ KEEP |
| 28 | Discipline | discipline.model.js | ✅ KEEP |
| 29 | Parent Portal | parentPortal.model.js | ✅ KEEP |
| 30 | Student/Teacher Portal | studentPortal.model.js | ✅ KEEP |

---

## 📊 STATISTICS

- **Total Existing Modules**: 62 models
- **Core Modules to Keep**: 30 modules
- **Advanced Modules to Skip**: 32 modules
- **Strategy**: Preserve code, focus on core 30

---

**Next Step**: Verify and test all 30 core modules' APIs

**Status**: ✅ Mapping Complete - Ready for Testing Phase
