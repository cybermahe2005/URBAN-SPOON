require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../config/db');
const Admin = require('../models/Admin');
const TableInquiry = require('../models/TableInquiry');

const seedData = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await connectDB();

    console.log('[Seed] Clearing existing table inquiries and admin accounts...');
    await Admin.deleteMany({});
    await TableInquiry.deleteMany({});

    // 1. Create Default Admin
    const defaultAdmin = await Admin.create({
      name: 'Chef Alexandre Laurent',
      email: 'admin@urbanspoon.com',
      password: 'admin123', // Will be hashed automatically by pre-save hook
      role: 'admin',
    });
    console.log(`[Seed] Created default admin: ${defaultAdmin.email} (Password: admin123)`);

    // 2. Create Sample Inquiries
    const now = new Date();
    const sampleInquiries = [
      {
        customerName: 'Eleanor Vance',
        phoneNumber: '+1 (555) 234-5678',
        bookingDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
        numberOfGuests: 2,
        specialRequests: 'Window table preferred for anniversary celebration with candle setup.',
        status: 'Pending',
        createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      },
      {
        customerName: 'Marcus Sterling',
        phoneNumber: '+1 (555) 876-5432',
        bookingDate: new Date(now.getTime() + 48 * 60 * 60 * 1000), // In 2 days
        numberOfGuests: 4,
        specialRequests: 'One guest is strictly gluten-free and dairy allergic.',
        status: 'Confirmed',
        createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      },
      {
        customerName: 'Sophia Rodriguez',
        phoneNumber: '+1 (555) 345-6789',
        bookingDate: new Date(now.getTime() + 72 * 60 * 60 * 1000), // In 3 days
        numberOfGuests: 6,
        specialRequests: 'Executive business dinner. Quiet corner booth requested.',
        status: 'Confirmed',
        createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      },
      {
        customerName: 'James Chen',
        phoneNumber: '+1 (555) 901-2345',
        bookingDate: new Date(now.getTime() + 12 * 60 * 60 * 1000), // Tonight
        numberOfGuests: 2,
        specialRequests: 'Celebrating a birthday, would appreciate dessert sparkler.',
        status: 'Pending',
        createdAt: new Date(now.getTime() - 30 * 60 * 1000),
      },
      {
        customerName: 'Aria Montgomery',
        phoneNumber: '+1 (555) 432-1098',
        bookingDate: new Date(now.getTime() + 96 * 60 * 60 * 1000),
        numberOfGuests: 8,
        specialRequests: 'Family gathering. High chair needed for a toddler.',
        status: 'Cancelled',
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
      {
        customerName: 'Liam O\'Connor',
        phoneNumber: '+1 (555) 678-9123',
        bookingDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        numberOfGuests: 3,
        specialRequests: 'Wine pairing recommendation with tasting menu.',
        status: 'Pending',
        createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
      },
    ];

    await TableInquiry.insertMany(sampleInquiries);
    console.log(`[Seed] Successfully inserted ${sampleInquiries.length} sample table inquiries!`);

    console.log('[Seed] Database initialization and seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error seeding database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedData();
}

module.exports = { seedData };
