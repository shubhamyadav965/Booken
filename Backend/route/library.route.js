import express from "express";
import {
  addToLibrary,
  getUserLibrary,
} from "../controller/library.controller.js";

const router = express.Router();

router.post("/", addToLibrary);
router.get("/:userId", getUserLibrary);

export default router;
