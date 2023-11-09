# Brew Mates

## Description

Brew Mates is more than just a dating app; it's your personalized cupid in the digital age. With a sleek and user-friendly interface, it's designed to make finding your special someone a delightful journey. Create a profile that truly reflects the best version of you, and let our smart matching algorithm do the rest. From shared interests to compatibility scores, we've got the science of love covered. Swipe, chat, and discover meaningful connections with SparkConnection. Your next great love story is just a click away!

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Routes](#Routes)
- [Dependencies](#Dependencies)
- [License](#License)

## Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone <https://github.com/akshayvpdev/brew-mates.git>

   ```

2. Install the project dependencies using npm:

   ```bash
   npm install

   ```

3. Set up environment variables by creating a .env file and configuring it with your specific settings.

   ```.env
   DB_URL=your-database-url
   DB_NAME=your-database-name
   PORT=3006

   NODE_ENV=development (or production, staging, etc.)
   JWT_ACCESS_SECRET=your-access-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   JWT_ACCESS_EXPIRES_IN=30m (e.g., 15m, 1h, 1d for time duration)
   JWT_REFRESH_EXPIRES_IN=7d (e.g., 15m, 1h, 1d for time duration)
   JWT_COOKIE_EXPIRES_IN=7d (e.g., 15m, 1h, 1d for time duration)

   EMAIL_HOST=your-smtp-email-host
   EMAIL_PORT=your-smtp-port
   EMAIL_USERNAME=your-smtp-username
   EMAIL_PASSWORD=your-smtp-password

   ```

4. Start the application in development mode:

   ```bash
   npm run dev
   ```

## Usage

Once the project is set up, you can start using it to handle user authentication and related functionalities. Here's how you can interact with the system:

- Signup: Register new users by making a POST request to the /signup route.

- Login: Authenticate users by making a POST request to the /login route. This will provide a JSON Web Token (JWT) for further authentication.

- Logout: End a user's session by making a POST request to the /logout route.

- Forgot Password: If a user forgets their password, they can request a password reset by making a POST request to the /forgotPassword route. This will send an email with a reset link.

- Reset Password: Users can reset their password by following the link sent in the reset email and making a POST request to the /resetPassword route.

- Update Password: Authenticated users can update their password by making a POST request to the /updateMyPassword route.

- Refresh Token: If a JWT token expires, you can refresh it by making a POST request to the /refreshToken route. This will provide a new JWT token.

Here's how you can interact with the user controlls like

- get users have similar interest and other criteria

- get and update profile: Retrieve and update user profile information .

- update user location: a middleware to update user location at certain time interval

- get near users: a middleware to get users near the location of current user

## Routes

- /auth/signup (POST) - User registration.
- /auth/login (POST) - User authentication and JWT generation.
- /auth/logout (GET) - User logout.
- /auth/forgot-password (POST) - Request a password reset email.
- /auth/reset-password (PATCH) - Reset the user's password.
- /auth/update-password (PATCH) - Update the user's password.
- /auth/refresh-token (POST) - Refresh an expired JWT token.

- /profile (GET) - get user profile
- /profile (PATCH) - update user information
- /profile/updateLocation (PATCH) - update user location
- /profile/sameInterestPeople (GET) - get users have similar interest like the current user
- /profile/nearMe (GET) - get user near current user location

## Dependencies

This project relies on the following dependencies:

- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Parse cookies in the request.
- [cors](https://www.npmjs.com/package/cors) - Enable Cross-Origin Resource Sharing (CORS).
- [crypto](https://nodejs.org/api/crypto.html) - Cryptographic functions.
- [dotenv](https://www.npmjs.com/package/dotenv) - Load environment variables from a .env file.
- [express](https://expressjs.com/) - Web application framework.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Create and verify JWT tokens.
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling.
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware.
- [nodemailer](https://www.npmjs.com/package/nodemailer) - Send emails for password reset.
- [nodemon](https://www.npmjs.com/package/nodemon) - Automatically restart the server during development.

## License

This project is licensed under the ISC License. See the LICENSE file for details.
