import { Router } from "express";
import * as uploadController from "../controller/upload.controller";
import multer from "multer";
import { storage } from "../helpers/cloudinary.helper";

const router = Router();

const upload = multer({ storage: storage });

router.post(
  "/image", 
  upload.single("file"),
  uploadController.imagePost
)

export default router;
