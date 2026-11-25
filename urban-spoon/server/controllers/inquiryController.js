const mongoose = require('mongoose');
const TableInquiry = require('../models/TableInquiry');

// @desc    Create a new table inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res, next) => {
  try {
    const { customerName, phoneNumber, bookingDate, numberOfGuests, specialRequests } = req.body;

    // Validate booking date is not in the past
    const requestedDate = new Date(bookingDate);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking date format',
      });
    }

    const now = new Date(Date.now() - 5 * 60 * 1000); // 5 min buffer
    if (requestedDate < now) {
      return res.status(400).json({
        success: false,
        message: 'Booking date and time cannot be in the past',
      });
    }

    const inquiry = await TableInquiry.create({
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      bookingDate: requestedDate,
      numberOfGuests: Number(numberOfGuests),
      specialRequests: specialRequests ? specialRequests.trim() : '',
      status: 'Pending',
    });

    res.status(201).json({
      success: true,
      message: 'Table booking inquiry submitted successfully. Our team will contact you shortly to confirm.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries with optional filter, search, pagination, and summary counts
// @route   GET /api/inquiries
// @access  Private (Admin)
const getAllInquiries = async (req, res, next) => {
  try {
    const { status, search, date, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filter by status if provided (and not 'All')
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search by customer name or phone number
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ customerName: searchRegex }, { phoneNumber: searchRegex }];
    }

    // Filter by booking date (matches same calendar day)
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      if (!isNaN(startOfDay.getTime())) {
        query.bookingDate = { $gte: startOfDay, $lte: endOfDay };
      }
    }

    const currentPage = Math.max(1, parseInt(page, 10));
    const itemsPerPage = Math.max(1, parseInt(limit, 10));
    const skip = (currentPage - 1) * itemsPerPage;

    // Fetch records in descending order
    const [inquiries, totalCount, totalAll, totalPending, totalConfirmed, totalCancelled] = await Promise.all([
      TableInquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(itemsPerPage),
      TableInquiry.countDocuments(query),
      TableInquiry.countDocuments({}),
      TableInquiry.countDocuments({ status: 'Pending' }),
      TableInquiry.countDocuments({ status: 'Confirmed' }),
      TableInquiry.countDocuments({ status: 'Cancelled' }),
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

    res.json({
      success: true,
      count: inquiries.length,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage,
        limit: itemsPerPage,
      },
      stats: {
        total: totalAll,
        pending: totalPending,
        confirmed: totalConfirmed,
        cancelled: totalCancelled,
      },
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inquiry statistics summary
// @route   GET /api/inquiries/stats/summary
// @access  Private (Admin)
const getInquiryStats = async (req, res, next) => {
  try {
    const [total, pending, confirmed, cancelled] = await Promise.all([
      TableInquiry.countDocuments({}),
      TableInquiry.countDocuments({ status: 'Pending' }),
      TableInquiry.countDocuments({ status: 'Confirmed' }),
      TableInquiry.countDocuments({ status: 'Cancelled' }),
    ]);

    res.json({
      success: true,
      data: {
        total,
        pending,
        confirmed,
        cancelled,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get individual inquiry by ID
// @route   GET /api/inquiries/:id
// @access  Private (Admin)
const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ObjectId format',
      });
    }

    const inquiry = await TableInquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Table inquiry not found',
      });
    }

    res.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update inquiry status
// @route   PATCH /api/inquiries/:id/status
// @access  Private (Admin)
const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ObjectId format',
      });
    }

    const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updatedInquiry = await TableInquiry.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({
        success: false,
        message: 'Table inquiry not found',
      });
    }

    res.json({
      success: true,
      message: `Inquiry status updated to '${status}' successfully`,
      data: updatedInquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ObjectId format',
      });
    }

    const inquiry = await TableInquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Table inquiry not found',
      });
    }

    await TableInquiry.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Table inquiry deleted successfully',
      data: { id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getAllInquiries,
  getInquiryStats,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};
