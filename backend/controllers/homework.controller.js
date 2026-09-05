import mongoose from "mongoose";
import Homework from "../models/homework.model.js";
import HomeworkSubmission from "../models/homeworkSubmission.model.js";
import School from "../models/school.model.js";
import AcademicYear from "../models/academicYear.model.js";
import Class from "../models/class.model.js";
import Section from "../models/section.model.js";
import Subject from "../models/subject.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";

// Create Homework
export const createHomework = async (req, res) => {
  try {
    const {
      schoolId,
      academicYearId,
      classId,
      sectionId,
      subjectId,
      teacherId,
      title,
      description,
      assignedDate,
      dueDate,
      totalMarks,
      attachments,
      priority,
      status,
    } = req.body;

    // Validate School
    const school = await School.findById(schoolId);
    if (!school) {
      return res.status(404).json({
        success: false,
        message: "School not found",
      });
    }

    // Validate Academic Year
    const academicYear = await AcademicYear.findById(academicYearId);
    if (!academicYear) {
      return res.status(404).json({
        success: false,
        message: "Academic year not found",
      });
    }

    // Validate Class
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Validate Section
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Validate Subject
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // Validate Teacher
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    const homework = await Homework.create({
      schoolId,
      academicYearId,
      classId,
      sectionId,
      subjectId,
      teacherId,
      title,
      description,
      assignedDate,
      dueDate,
      totalMarks,
      attachments,
      priority,
      status,
    });

    await homework.populate([
      { path: "schoolId", select: "name code" },
      { path: "classId", select: "name code" },
      { path: "sectionId", select: "name code" },
      { path: "subjectId", select: "name code" },
      { path: "teacherId", populate: { path: "userId", select: "name email" } },
    ]);

    return res.status(201).json({
      success: true,
      message: "Homework created successfully",
      homework,
    });
  } catch (error) {
    console.error("Create Homework Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create homework",
      error: error.message,
    });
  }
};

// Get All Homework
export const getAllHomework = async (req, res) => {
  try {
    const { schoolId, classId, sectionId, subjectId, teacherId, status } =
      req.query;

    const filter = {};

    if (schoolId) {
      if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid School ID",
        });
      }
      filter.schoolId = schoolId;
    }

    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Class ID",
        });
      }
      filter.classId = classId;
    }

    if (sectionId) {
      if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Section ID",
        });
      }
      filter.sectionId = sectionId;
    }

    if (subjectId) {
      if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Subject ID",
        });
      }
      filter.subjectId = subjectId;
    }

    if (teacherId) {
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Teacher ID",
        });
      }
      filter.teacherId = teacherId;
    }

    if (status) {
      filter.status = status;
    }

    const homeworkList = await Homework.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "sectionId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name email" } })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Homework fetched successfully",
      count: homeworkList.length,
      homework: homeworkList,
    });
  } catch (error) {
    console.error("Get All Homework Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch homework",
      error: error.message,
    });
  }
};

// Get Homework By ID
export const getHomeworkById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Homework ID",
      });
    }

    const homework = await Homework.findById(id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "sectionId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "teacherId", populate: { path: "userId", select: "name email" } });

    if (!homework) {
      return res.status(404).json({
        success: false,
        message: "Homework not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Homework fetched successfully",
      homework,
    });
  } catch (error) {
    console.error("Get Homework By ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch homework",
      error: error.message,
    });
  }
};

// Update Homework
export const updateHomework = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Homework ID",
      });
    }

    const homework = await Homework.findById(id);

    if (!homework) {
      return res.status(404).json({
        success: false,
        message: "Homework not found",
      });
    }

    const updateData = req.body;

    Object.keys(updateData).forEach((key) => {
      homework[key] = updateData[key];
    });

    await homework.save();

    await homework.populate([
      { path: "schoolId", select: "name code" },
      { path: "classId", select: "name code" },
      { path: "sectionId", select: "name code" },
      { path: "subjectId", select: "name code" },
      { path: "teacherId", populate: { path: "userId", select: "name email" } },
    ]);

    return res.status(200).json({
      success: true,
      message: "Homework updated successfully",
      homework,
    });
  } catch (error) {
    console.error("Update Homework Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update homework",
      error: error.message,
    });
  }
};

// Delete Homework
export const deleteHomework = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Homework ID",
      });
    }

    const homework = await Homework.findById(id);

    if (!homework) {
      return res.status(404).json({
        success: false,
        message: "Homework not found",
      });
    }

    await Homework.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Homework deleted successfully",
    });
  } catch (error) {
    console.error("Delete Homework Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete homework",
      error: error.message,
    });
  }
};

// Submit Homework
export const submitHomework = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, submissionText, attachments } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Homework ID",
      });
    }

    const homework = await Homework.findById(id);
    if (!homework) {
      return res.status(404).json({
        success: false,
        message: "Homework not found",
      });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const existingSubmission = await HomeworkSubmission.findOne({
      homeworkId: id,
      studentId,
    });

    if (existingSubmission) {
      return res.status(409).json({
        success: false,
        message: "Homework already submitted by this student",
      });
    }

    const submittedDate = new Date();
    const isLate = submittedDate > homework.dueDate;

    const submission = await HomeworkSubmission.create({
      homeworkId: id,
      studentId,
      submittedDate,
      submissionText,
      attachments,
      status: isLate ? "late" : "submitted",
    });

    await submission.populate([
      { path: "homeworkId" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
    ]);

    return res.status(201).json({
      success: true,
      message: "Homework submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Submit Homework Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit homework",
      error: error.message,
    });
  }
};

// Grade Homework Submission
export const gradeHomeworkSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { marksObtained, feedback, gradedBy } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Submission ID",
      });
    }

    const submission = await HomeworkSubmission.findById(id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    submission.marksObtained = marksObtained;
    submission.feedback = feedback;
    submission.gradedBy = gradedBy;
    submission.gradedDate = new Date();
    submission.status = "graded";

    await submission.save();

    await submission.populate([
      { path: "homeworkId" },
      { path: "studentId", populate: { path: "userId", select: "name email" } },
      { path: "gradedBy", populate: { path: "userId", select: "name email" } },
    ]);

    return res.status(200).json({
      success: true,
      message: "Homework graded successfully",
      submission,
    });
  } catch (error) {
    console.error("Grade Homework Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to grade homework",
      error: error.message,
    });
  }
};

// Get All Submissions
export const getAllSubmissions = async (req, res) => {
  try {
    const { homeworkId, studentId, status } = req.query;

    const filter = {};

    if (homeworkId) {
      if (!mongoose.Types.ObjectId.isValid(homeworkId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Homework ID",
        });
      }
      filter.homeworkId = homeworkId;
    }

    if (studentId) {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Student ID",
        });
      }
      filter.studentId = studentId;
    }

    if (status) {
      filter.status = status;
    }

    const submissions = await HomeworkSubmission.find(filter)
      .populate({ path: "homeworkId" })
      .populate({ path: "studentId", populate: { path: "userId", select: "name email" } })
      .populate({ path: "gradedBy", populate: { path: "userId", select: "name email" } })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error("Get All Submissions Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};
