export const validateInquiryForm = (values) => {
  const errors = {};

  // Customer Name Validation
  if (!values.customerName || !values.customerName.trim()) {
    errors.customerName = 'Please enter your full name.';
  } else if (values.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters.';
  } else if (values.customerName.trim().length > 100) {
    errors.customerName = 'Name cannot exceed 100 characters.';
  }

  // Phone Number Validation
  const phoneRegex = /^[+0-9()\s.-]{7,25}$/;
  if (!values.phoneNumber || !values.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required so our team can confirm availability.';
  } else if (!phoneRegex.test(values.phoneNumber.trim())) {
    errors.phoneNumber = 'Please enter a valid phone number (e.g. +44 131 496 2345 or 07911 123456).';
  }

  // Booking Date Validation
  if (!values.bookingDate) {
    errors.bookingDate = 'Please select a preferred date and time.';
  } else {
    const selectedDate = new Date(values.bookingDate);
    const now = new Date(Date.now() - 5 * 60 * 1000); // 5 min buffer
    if (isNaN(selectedDate.getTime())) {
      errors.bookingDate = 'Invalid date selected.';
    } else if (selectedDate < now) {
      errors.bookingDate = 'Booking date and time cannot be in the past.';
    }
  }

  // Number of Guests Validation
  const guests = Number(values.numberOfGuests);
  if (!values.numberOfGuests) {
    errors.numberOfGuests = 'Please specify the number of guests.';
  } else if (isNaN(guests) || guests < 1 || !Number.isInteger(guests)) {
    errors.numberOfGuests = 'Guests must be a positive whole number (minimum 1).';
  } else if (guests > 50) {
    errors.numberOfGuests = 'For parties larger than 50, please call our events concierge directly.';
  }

  // Special Requests Validation
  if (values.specialRequests && values.specialRequests.length > 500) {
    errors.specialRequests = 'Special requests must be under 500 characters.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
