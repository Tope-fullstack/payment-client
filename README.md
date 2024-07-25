# React Payment Form Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Usage](#usage)
7. [Components](#components)
8. [API Integration](#api-integration)
9. [License](#license)

## Introduction

This is a React application that provides a payment form for handling transactions using Paystack. It includes form validation using Zod and integrates Paystack's inline payment solution.

## Requirements

- Node.js 14 or higher
- npm or yarn

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Tope-fullstack/payment-frontend.git
    cd payment-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

## Environment Configuration

Create a `.env` file in the root directory and configure your environment variables:

```dotenv
VITE_SERVER_URL=http://localhost:8000/api
VITE_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

## Running the Application

Run the following command to start the local development server:

```bash
npm start
# or
yarn start
```

Your application will be accessible at `http://localhost:3000`.

## Usage

### PaymentForm Component

The `PaymentForm` component is the main component for handling payments. It includes form validation and integrates Paystack's inline payment solution.

### Components

#### PaymentForm

- **Description:** This component renders the payment form and handles the payment process.
- **Dependencies:**
  - `react-hook-form` for form handling
  - `@hookform/resolvers/zod` for Zod validation
  - `@paystack/inline-js` for Paystack integration
  - `axios` for API requests
  - `react-toastify` for notifications
  - `react-router-dom` for navigation

## API Integration

The frontend interacts with a Laravel backend to handle payment transactions. Ensure that the backend is set up and running as per the [Laravel API Documentation](../laravel/README.md).

## License

This project is licensed under the MIT License.