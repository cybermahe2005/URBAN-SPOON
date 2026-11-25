const mongoose = require('mongoose');

const tableInquirySchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: function (v) {
          // Allows standard international & domestic phone numbers: digits, spaces, parentheses, hyphens, plus
          return /^[+0-9()\s.-]{7,25}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
      validate: {
        validator: function (v) {
          // Only validate future date when creating or explicitly updating the bookingDate
          if (this.isModified && !this.isModified('bookingDate')) {
            return true;
          }
          const now = new Date(Date.now() - 5 * 60 * 1000);
          return new Date(v) >= now;
        },
        message: 'Booking date cannot be in the past',
      },
    },
    numberOfGuests: {
      type: Number,
      required: [true, 'Number of guests is required'],
      min: [1, 'Number of guests must be at least 1'],
      max: [50, 'For groups larger than 50 guests, please contact our events team directly'],
    },
    specialRequests: {
      type: String,
      trim: true,
      default: '',
      maxlength: [500, 'Special requests cannot exceed 500 characters'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// Index for high-performance sorting and query filtering
tableInquirySchema.index({ createdAt: -1 });
tableInquirySchema.index({ bookingDate: 1 });
tableInquirySchema.index({ status: 1 });

module.exports = mongoose.model('TableInquiry', tableInquirySchema);
