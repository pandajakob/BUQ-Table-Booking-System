# BUQ table booking system

**BUQ** is a simple table booking software designed to help restaurants manage table reservations efficiently. Built with React, BUQ offers an intuitive user experience for both customers and administrators. As a beginner-level project, the software is currently in development and serves as a learning project

## Features

### User End

Book a Table: Users can book a table by choosing a date. The system dynamically fetches all available times for the selected date.

Booking Path: To book a table, users follow the path:
```
.../book/:restaurantID
```
View Confirmation: After booking, the result is displayed on the screen for the user.

### Admin End

  - Manage Reservations: Administrators can view and manage bookings.

  - Restaurant-Specific Reservations: Each booking is associated with a unique restaurant ID for efficient management.
