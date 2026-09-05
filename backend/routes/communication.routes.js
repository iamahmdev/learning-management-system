import express from "express";
import { createCommunication, getAllCommunications, getCommunicationById, updateCommunication, deleteCommunication } from "../controllers/communication.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { createCommunicationValidation, updateCommunicationValidation, communicationIdValidation } from "../validations/communication.validation.js";

const router = express.Router();

router.post("/", isAuthenticated, createCommunicationValidation, validate, createCommunication);
router.get("/", isAuthenticated, getAllCommunications);
router.get("/:id", isAuthenticated, communicationIdValidation, validate, getCommunicationById);
router.put("/:id", isAuthenticated, updateCommunicationValidation, validate, updateCommunication);
router.delete("/:id", isAuthenticated, communicationIdValidation, validate, deleteCommunication);

export default router;
