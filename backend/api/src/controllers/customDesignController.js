import CustomDesignRequest from "../models/CustomDesignRequest.js";
import Quotation from "../models/Quotation.js";
import Message from "../models/Message.js";

export const createRequest = async (req, res) => {
  try {
    const request = await CustomDesignRequest.create(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Failed to create request", error: error.message });
  }
};

export const getCustomerRequests = async (req, res) => {
  try {
    const requests = await CustomDesignRequest.find({ customerId: req.params.customerId }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
};

export const createQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.create(req.body);

    await CustomDesignRequest.findByIdAndUpdate(req.body.requestId, {
      status: "quoted",
    });

    res.status(201).json(quotation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create quotation", error: error.message });
  }
};

export const getQuotationsByRequest = async (req, res) => {
  try {
    const quotations = await Quotation.find({ requestId: req.params.requestId }).sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quotations", error: error.message });
  }
};

export const acceptQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findByIdAndUpdate(
      req.params.quotationId,
      { status: "accepted" },
      { new: true }
    );

    await Quotation.updateMany(
      { requestId: quotation.requestId, _id: { $ne: quotation._id } },
      { status: "rejected" }
    );

    await CustomDesignRequest.findByIdAndUpdate(quotation.requestId, {
      status: "in_progress",
      assignedDesignerId: quotation.designerId,
    });

    res.json(quotation);
  } catch (error) {
    res.status(500).json({ message: "Failed to accept quotation", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

export const getMessagesByRequest = async (req, res) => {
  try {
    const messages = await Message.find({ requestId: req.params.requestId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};