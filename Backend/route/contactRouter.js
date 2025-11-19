// route/contactRouter.js
import express from "express";
import { submitContact , getAllContacts} from "../controller/contactController.js";
import { validateContact } from "../Middleware/contactValidator.js";

const router = express.Router();

router.post("/addcontact", ...validateContact, submitContact);
router.get("/getallcontacts", getAllContacts);

export default router;