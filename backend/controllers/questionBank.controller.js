import QuestionBank from "../models/questionBank.model.js";

export const createQuestion = async (req, res) => {
  try {
    const question = await QuestionBank.create(req.body);
    await question.populate([
      { path: "schoolId", select: "name code" },
      { path: "subjectId", select: "name code" },
      { path: "classId", select: "name code" },
      { path: "createdBy", populate: { path: "userId", select: "name email" } },
    ]);
    return res.status(201).json({ success: true, message: "Question created successfully", question });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create question", error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const { schoolId, subjectId, classId, questionType, difficulty, status } = req.query;
    const filter = {};
    if (schoolId) filter.schoolId = schoolId;
    if (subjectId) filter.subjectId = subjectId;
    if (classId) filter.classId = classId;
    if (questionType) filter.questionType = questionType;
    if (difficulty) filter.difficulty = difficulty;
    if (status) filter.status = status;

    const questions = await QuestionBank.find(filter)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "createdBy", populate: { path: "userId", select: "name email" } })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: questions.length, questions });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch questions", error: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await QuestionBank.findById(req.params.id)
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "createdBy", populate: { path: "userId", select: "name email" } });
    if (!question) return res.status(404).json({ success: false, message: "Question not found" });
    return res.status(200).json({ success: true, question });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch question", error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await QuestionBank.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate({ path: "schoolId", select: "name code" })
      .populate({ path: "subjectId", select: "name code" })
      .populate({ path: "classId", select: "name code" })
      .populate({ path: "createdBy", populate: { path: "userId", select: "name email" } });
    if (!question) return res.status(404).json({ success: false, message: "Question not found" });
    return res.status(200).json({ success: true, message: "Question updated successfully", question });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update question", error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await QuestionBank.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ success: false, message: "Question not found" });
    return res.status(200).json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete question", error: error.message });
  }
};
