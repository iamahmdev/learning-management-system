import express from "express";
import { createDiscipline, getAllDisciplines, getDisciplineById, updateDiscipline, deleteDiscipline } from "../controllers/discipline.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createDiscipline);
router.get("/", isAuthenticated, getAllDisciplines);
router.get("/:id", isAuthenticated, getDisciplineById);
router.put("/:id", isAuthenticated, updateDiscipline);
router.delete("/:id", isAuthenticated, deleteDiscipline);

export default router;
