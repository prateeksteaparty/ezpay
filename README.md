# EzPay

Welcome to **EzPay**! This project provides a secure and user-friendly platform for transferring money, managing user accounts, and viewing transaction details. It includes both frontend and backend components to offer a seamless payment experience.

## Features

- **User Authentication**: Signup and Signin functionalities to securely access user accounts.
- **Account Management**: Option to update user credentials.
- **Balance Management**: Users can view their current balance and transfer money.
- **Search and Add Friends**: Ability to search for friends and transfer money easily.

## Project Structure

The project is divided into two main parts:

### Backend
- Built with **Node.js** and **Express.js**, it handles API routes, user authentication, and database operations.

### Frontend
- Built with **React** and **Vite**, it provides a modern, responsive interface for interacting with the application.

## Getting Started

### Prerequisites
Before getting started, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Vite**

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/ezpay.git
    cd ezpay
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    npm install
    ```

3. Install frontend dependencies:

    ```bash
    cd ../frontend
    npm install
    ```

### Running the Project

#### Backend
1. Configure environment variables:
   - Create a `.env` file in the backend directory and add your configurations (e.g., database connection string, JWT secret).

2. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

   The backend server will run on `http://localhost:3000`.

#### Frontend
1. Start the frontend server:

    ```bash
    cd ../frontend
    npm run dev
    ```

   The frontend will be available at `http://localhost:5173`.

## Testing

- **Backend Testing**: You can use tools like **Postman** to test the API routes and validate the backend functionality.
- **Frontend Testing**: Access the frontend by navigating to `http://localhost:5173` in your browser.

## Contributing

We welcome contributions to the project! If you have any ideas or suggestions, please feel free to open an issue or submit a pull request.

## Contact

If you have any questions or need further assistance, feel free to reach out.
