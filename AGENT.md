# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js/Express backend application named "sheep-backend" (eSheetBook backend). It's a TypeScript-based REST API with MongoDB for data persistence, featuring JWT authentication with refresh token support, email OTP verification, and role-based access control.

## Development Commands

## Architecture

### Server Structure
The application uses a class-based Express server (`app.ts`) with the following initialization order:
1. **Middlewares**: CORS, JSON parsing, cookie parser, static files, Morgan logging, rate limiting
2. **Routes**: API routes mounted at `/api/v1`
3. **Error Handling & Security**: Error middleware, Helmet, mongo-sanitize, HPP protection

### Directory Organization

**Controllers** (`/controllers`):
- Controllers are organized by domain with a main controller file and subdirectory for individual operations
- Example: `AuthController.ts` exports functions, with implementations in `Auth/LoginController.ts`, `Auth/SendOTPController.ts`, etc.
- Each controller subdirectory contains focused, single-responsibility controller files

**Routes** (`/routes`):
- Route definitions mapping HTTP endpoints to controllers
- Example: `AuthRoutes.ts` defines `/api/v1/auth/*` endpoints

**Models** (`/models`):
- Mongoose schemas with TypeScript typing
- `User.ts`: Includes password hashing pre-save hook and `comparePassword` method
- `Token.ts`: Manages refresh tokens for JWT authentication

**Middleware** (`/middleware`):
- `authentication.ts`: Core authentication logic
  - `authenticateUser`: Validates JWT access/refresh tokens (supports both header and cookie-based auth)
  - `authorizePermission`: Role-based access control
  - `checkVerifiedEmail`: Email verification enforcement (skipped in DEV environment)
- `error-handler.ts`: Centralized error handling

**Utils** (`/utils`):
- `jwt.ts`: Token creation and validation utilities
- `checkPersmission.ts`: Permission checking logic
- `createTokenUser.ts`: Token payload creation
- `emailService.ts`: Email sending functionality for OTP

**Errors** (`/errors`):
- Custom error classes extending base error: `BadRequestError`, `UnauthenticatedError`, `NotFoundError`, `CustomAPIError`

**Types** (`/types`):
- TypeScript type definitions organized in `commons/` and `models/` subdirectories

**Enums** (`/enums`):
- `Role.ts`: User role definitions
- `StatusCodes.ts`: HTTP status code constants

### Database Connection
MongoDB connection logic is in `/db/index.ts`:
- Supports different connection strategies based on `MONGO_DB_POSITION` (DOCKER vs GCP)
- DEV environment has special Docker connection string for local testing
- PROD environment uses standard MongoDB connection with auth

### Authentication Flow
1. **Registration**: `POST /api/v1/auth/userRegister` - Creates user with hashed password
2. **Login**: `POST /api/v1/auth/login` - Returns access/refresh tokens (cookie or header based)
3. **Token Refresh**: `GET /api/v1/auth/refreshToken` - Uses refresh token to get new access token
4. **OTP Email Verification**:
   - `POST /api/v1/auth/sendOTP` - Sends OTP to email
   - `POST /api/v1/auth/bindOTPEmail` - Verifies OTP and marks email as verified
5. **Password Reset**:
   - `POST /api/v1/auth/forgetPasswordEmailOTP` - Sends OTP for password reset
   - `POST /api/v1/auth/changePasswordWithOTP` - Changes password with valid OTP

### Static File Serving
- `/system` route serves from `public/system` - for general website assets
- `/C` route serves from `public/C` - for SPA (Single Page Application)

### Security Features
- Rate limiting: 100 requests per 15 minutes per IP
- Helmet for security headers
- Mongo sanitization against injection attacks
- HPP protection against parameter pollution
- Bcrypt password hashing with salt rounds of 10
- JWT with access/refresh token pattern
- OTP-based email verification with attempt limiting and blocking mechanism

## Key Implementation Notes

- All async errors are handled via `express-async-errors` package - no need for try-catch in route handlers
- Trust proxy is enabled for proper IP detection behind proxies
- Morgan logging includes Taiwan timezone timestamps and request payload
- Password hashing happens automatically via Mongoose pre-save hook
- Email verification can be skipped in DEV environment (see `checkVerifiedEmail` middleware)
- TypeScript strict mode is enabled
- Build output goes to `/dist` directory with source maps

## API Versioning
All routes are currently under `/api/v1` prefix. When adding new routes, follow the pattern in `app.ts`:
```typescript
this.app.use(`${v1}/resourceName`, ResourceRoutes)
```

## Project Structure

### Root Directory Structure
```
s_node/
├── controllers/          # Business logic layer
├── routes/               # Route definitions
├── models/               # Mongoose data models
├── middleware/           # Middleware functions
├── utils/                # Utility functions
├── errors/               # Custom error classes
├── enums/                # Enumeration constants
├── types/                # TypeScript type definitions
├── db/                   # Database connection configuration
├── public/               # Static files
│   ├── system/          # General website assets
│   └── C/               # SPA (Single Page Application) assets
├── logs/                 # Application logs
│   ├── access/          # Access logs
│   └── error/           # Error logs
├── dist/                 # TypeScript compilation output
├── postman/              # API test collections
└── .claude/              # Claude Code configuration
```

### Controllers (`/controllers` - 37 TypeScript files)

Domain-driven design structure with main controller and subdirectories:

**Authentication** (`Auth/`)
- `AuthController.ts` - Main controller exporting all auth functions
- `Auth/LoginController.ts` - Login logic
- `Auth/UserRegisterController.ts` - User registration
- `Auth/SendOTPController.ts` - Send OTP email
- `Auth/bindOTPEmailController.ts` - Bind OTP to email
- `Auth/ForgetPasswordEmailOTPController.ts` - Forgot password flow
- `Auth/ChangePasswordWithOTPController.ts` - Reset password with OTP
- `Auth/RefreshTokenController.ts` - Refresh JWT tokens
- `Auth/LogoutController.ts` - Logout logic
- `Auth/CheckValidTokenController.ts` - Token validation

**User Management** (`User/`)
- `UserController.ts` - Main controller exporting all user functions
- `User/ShowCurrentUserController.ts` - Get current user info
- `User/EditUserInfoController.ts` - Edit user information
- `User/UpdatePasswordController.ts` - Update password
- `User/GetAllUsersController.ts` - Get all users (admin)
- `User/ChangeUserAccessController.ts` - Change user access permissions
- `User/EditUserDistrictAndRoleController.ts` - Edit user district and role

**File Management** (`File/`)
- `FileController.ts` - Main controller exporting all file functions
- `File/CreateFileController.ts` - Create file
- `File/GetFileController.ts` - Get file
- `File/EditFileController.ts` - Edit file
- `File/DeleteFileController.ts` - Delete file

**Sheet Management** (`Sheet/`)
- `SheetController.ts` - Main controller exporting all sheet functions
- `Sheet/CreateSheetController.ts` - Create sheet
- `Sheet/GetAllSheetController.ts` - Get all sheets
- `Sheet/GetSheetFromFIleController.ts` - Get sheets from file
- `Sheet/EditSheetController.ts` - Edit sheet
- `Sheet/DeleteSheetController.ts` - Delete sheet

**Development Tools** (`Dev/`)
- `DevController.ts` - Main controller exporting dev functions
- `Dev/CheckIpController.ts` - Check IP address
- `Dev/GetDevEnvController.ts` - Get development environment info

### Models (`/models` - Mongoose Schemas)
- `User.ts` - User model with password hashing and comparison methods
- `Token.ts` - JWT refresh token management
- `File.ts` - File data model
- `Sheet.ts` - Sheet data model
- `Register.ts` - Registration data model

### Types (`/types`)
```
types/
├── commons/
│   ├── UserTypes.ts      # User-related types
│   └── ApiTypes.ts       # API response types
├── models/
│   ├── IUser.ts          # User interface
│   ├── IFile.ts          # File interface
│   ├── ISheet.ts         # Sheet interface
│   └── IRegister.ts      # Register interface
└── index.ts              # Unified export
```

### Configuration Files

**Root Configuration:**
- `config.ts` - Environment variable loading and configuration management
- `tsconfig.json` - TypeScript compilation settings
- `tslint.json` - Code linting settings
- `.eslintrc` - ESLint rules

**Environment Files:**
- `.env.sample` - Environment variable template
- `.env.dev` - Development environment
- `.env.dev_fe` - Frontend development environment
- `.env.personal` - Personal development environment
- `.env.test` - Test environment
- `.env.test.sample` - Test environment template

**Required Environment Variables:**
```
PORT=2500
ENVIRONMENT=DEV|PROD
MONGO_URL=mongodb://...
MONGO_DB_POSITION=DOCKER|GCP
MONGO_DB_NAME=...
JWT_SECRET=...
AUTH_TOKEN=COOKIES|HEADER
EMAIL_SERVICE_USER=...
EMAIL_SERVICE_PASS=...
```

### Build and Deployment

**Package Management:**
- `package.json` - NPM dependencies and scripts
- `pnpm-lock.yaml` - pnpm lock file

**Build Scripts:**
```json
{
  "scripts": {
    "dev": "tsc-watch --onsuccess \"node -r dotenv/config dist/app.js dotenv_config_path=.env.dev\"",
    "dev-fe": "tsc-watch ...",
    "dev-personal": "tsc-watch ...",
    "build": "tsc && npm run copy-package",
    "copy-package": "copyfiles package.json pnpm-lock.yaml ...",
    "start": "node dist/app.js",
    "deploy:prod": "npm run build && pm2 start ecosystem.config.js --only prod"
  }
}
```

**Docker Deployment:**
- `Dockerfile` - Docker image build configuration
- `docker-compose.yml` - Local development Docker orchestration
- `docker-compose.prod.yml` - Production configuration
- `docker-compose.test.yml` - Test environment configuration
- `.dockerignore` - Docker ignore file

**PM2 Deployment:**
- `ecosystem.config.js` - PM2 cluster mode configuration
  - Runs 2 instances
  - Auto-restart and monitoring
  - Log rotation by date
  - Memory limit: 1GB

### Testing

**Postman Collections:**
- `postman/e-sheetbook.postman_collection.json` - Complete API test collection

**Test Configuration:**
- `docker-compose.test.yml` - Test environment Docker configuration

### Key Dependencies

**Core Framework:**
- `express@4.21.1` - Web framework
- `mongoose@8.8.3` - MongoDB ORM
- `typescript@4.9.5` - Type support

**Authentication/Security:**
- `jsonwebtoken@9.0.2` - JWT tokens
- `bcryptjs@2.4.3` - Password hashing
- `helmet@4.6.0` - Security headers
- `express-mongo-sanitize@2.2.0` - NoSQL injection protection
- `hpp@0.2.3` - Parameter pollution protection

**Utilities:**
- `nodemailer@6.9.16` - Email service
- `morgan@1.10.0` - HTTP logging
- `validator@13.12.0` - Data validation
- `dayjs@1.11.13` - Date handling
- `uuid@10.0.0` - ID generation

**Development Tools:**
- `tsc-watch@6.2.1` - TypeScript watch compilation
- `jest@28.1.3` - Testing framework
- `eslint@8.57.1` - Code linting

### Project Features

✓ **TypeScript Strict Mode** - Full type checking
✓ **Automatic Async Error Handling** - Using `express-async-errors`
✓ **Centralized Error Management** - Unified error classes and handler middleware
✓ **Role-Based Access Control (RBAC)** - Permission based on user roles
✓ **Email Verification System** - OTP verification with retry limits
✓ **Multi-Environment Support** - DEV, PROD, personal development
✓ **Docker and PM2 Deployment** - Containerization and process management
✓ **Detailed Logging System** - Access and error logs with daily rotation
