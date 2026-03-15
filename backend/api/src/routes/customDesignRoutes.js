import express from "express";
import {
  createRequest,
  getCustomerRequests,
  createQuotation,
  getQuotationsByRequest,
  acceptQuotation,
  sendMessage,
  getMessagesByRequest,
} from "../controllers/customDesignController.js";

const router = express.Router();

router.post("/requests", createRequest);
router.get("/requests/customer/:customerId", getCustomerRequests);

router.post("/quotations", createQuotation);
router.get("/quotations/:requestId", getQuotationsByRequest);
router.patch("/quotations/accept/:quotationId", acceptQuotation);

router.post("/messages", sendMessage);
router.get("/messages/:requestId", getMessagesByRequest);

export default router;