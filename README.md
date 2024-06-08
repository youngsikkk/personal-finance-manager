Key Features
User Authentication

Sign Up: Users can create an account by providing an email and password.
Sign In: Users can log in using their credentials.
JWT-based authentication to secure API endpoints.
Income and Expense Management

Add, view, and filter transactions.
Categorize transactions as income or expense.
Track transaction history.
Budget Management

Set budgets for different categories.
Receive email notifications when budgets are exceeded.
Financial Reporting

Generate monthly, quarterly, and yearly financial reports.
Visualize income and expense statistics using charts.
Categories and Tags

Add and manage categories and tags for better organization.
Filter transactions by categories and tags.
Responsive Design

Optimized for various screen sizes, including mobile devices.
Technologies Used
Frontend: React, Next.js, Material-UI, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JWT (JSON Web Tokens)
Email Notifications: Nodemailer
Charts: Chart.js, React-Chartjs-2
PDF Generation: pdf-lib
Project Structure
The project follows a modular structure with separate directories for components, pages, models, and utilities. Below is an overview of the key directories and files:

/components: Contains reusable React components such as forms, transaction lists, and navigation bars.
/models: Mongoose models for MongoDB collections, including User, Transaction, Category, and Budget.
/pages: Next.js pages for different routes, including authentication and financial management pages.
/utils: Utility functions for database connection, authentication, and email notifications.
/styles: CSS and styling files.