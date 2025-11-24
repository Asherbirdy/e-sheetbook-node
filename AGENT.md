# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js/Express backend application named "sheep-backend" (eSheetBook backend). It's a TypeScript-based REST API with MongoDB for data persistence, featuring JWT authentication with refresh token support, email OTP verification, and role-based access control.

## Development Commands

## Project Structure

```
.
├── AGENT.md                          # AI assistant guidance documentation
├── CLAUDE.md                         # Claude-specific instructions
├── GEMINI.md                         # Gemini-specific instructions
├── README.md                         # Project documentation
├── Dockerfile                        # Docker container configuration
├── docker-compose.yml                # Docker compose for development
├── docker-compose.test.yml           # Docker compose for testing
├── docker-compose.prod.yml           # Docker compose for production
├── ecosystem.config.js               # PM2 process manager configuration
├── package.json                      # Node.js dependencies and scripts
├── pnpm-lock.yaml                    # PNPM lock file
├── tsconfig.json                     # TypeScript configuration
├── tslint.json                       # TSLint configuration
│
├── app.ts                            # Main application entry point
├── config.ts                         # Environment configuration
│
├── controllers/                      # Request handlers
│   ├── Auth/                         # Authentication controllers
│   │   ├── LoginController.ts
│   │   ├── UserRegisterController.ts
│   │   ├── SendOTPController.ts
│   │   ├── bindOTPEmailController.ts
│   │   ├── ForgetPasswordEmailOTPController.ts
│   │   ├── ChangePasswordWithOTPController.ts
│   │   ├── RefreshTokenController.ts
│   │   ├── LogoutController.ts
│   │   └── CheckValidTokenController.ts
│   ├── User/                         # User management controllers
│   │   ├── ShowCurrentUserController.ts
│   │   ├── GetAllUsersController.ts
│   │   ├── EditUserInfoController.ts
│   │   ├── UpdatePasswordController.ts
│   │   ├── ChangeUserAccessController.ts
│   │   └── EditUserDistrictAndRoleController.ts
│   ├── File/                         # File management controllers
│   │   ├── CreateFileController.ts
│   │   ├── GetFileController.ts
│   │   ├── EditFileController.ts
│   │   └── DeleteFileController.ts
│   ├── Sheet/                        # Sheet management controllers
│   │   ├── CreateSheetController.ts
│   │   ├── GetAllSheetController.ts
│   │   ├── GetSheetFromFIleController.ts
│   │   ├── EditSheetController.ts
│   │   └── DeleteSheetController.ts
│   ├── Survey/                       # Survey management controllers
│   │   └── CreateSurveyController.ts
│   ├── Dev/                          # Development utilities controllers
│   │   ├── CheckIpController.ts
│   │   └── GetDevEnvController.ts
│   └── index.ts                      # Controller exports
│
├── routes/                           # API route definitions
│   ├── AuthRoutes.ts                 # /api/v1/auth/*
│   ├── UserRoutes.ts                 # /api/v1/users/*
│   ├── FileRoutes.ts                 # /api/v1/file/*
│   ├── SheetRoutes.ts                # /api/v1/sheet/*
│   ├── SurveyRoutes.ts               # /api/v1/survey/*
│   └── DevRoutes.ts                  # /api/v1/dev/*
│
├── models/                           # MongoDB schemas
│   ├── User.ts                       # User model with password hashing
│   ├── Token.ts                      # Refresh token model
│   ├── File.ts                       # File model
│   ├── Sheet.ts                      # Sheet model
│   ├── Survey.ts                     # Survey model
│   ├── SurveyOption.ts               # Survey option model (boolean/quantity)
│   └── Register.ts                   # Registration model
│
├── middleware/                       # Express middlewares
│   ├── authentication.ts             # JWT auth & role-based access control
│   ├── error-handler.ts              # Centralized error handling
│   └── index.ts                      # Middleware exports
│
├── utils/                            # Utility functions
│   ├── jwt.ts                        # JWT token utilities
│   ├── createTokenUser.ts            # Token payload creation
│   ├── checkPersmission.ts           # Permission checking
│   ├── emailService.ts               # Email/OTP service
│   └── index.ts                      # Utils exports
│
├── errors/                           # Custom error classes
│   ├── custom-api.ts                 # Base custom error
│   ├── bad-request.ts                # 400 Bad Request
│   ├── unauthenticated.ts            # 401 Unauthorized
│   ├── not-found.ts                  # 404 Not Found
│   └── index.ts                      # Error exports
│
├── enums/                            # TypeScript enums
│   ├── Role.ts                       # User roles (ADMIN, USER, etc.)
│   ├── StatusCodes.ts                # HTTP status codes
│   └── index.ts                      # Enum exports
│
├── types/                            # TypeScript type definitions
│   ├── commons/                      # Common types
│   │   ├── ApiTypes.ts               # API request/response types
│   │   └── UserTypes.ts              # User-related types
│   ├── models/                       # Model interface types
│   │   ├── IUser.ts
│   │   ├── IFile.ts
│   │   ├── ISheet.ts
│   │   └── IRegister.ts
│   └── index.ts                      # Type exports
│
├── db/                               # Database connection
│   └── index.ts                      # MongoDB connection logic
│
├── docs/                             # Documentation files
├── logs/                             # Application logs
│   ├── access/                       # Access logs
│   └── error/                        # Error logs
│
├── public/                           # Static files
│   ├── system/                       # General website assets
│   └── C/                            # SPA assets
│
└── postman/                          # API testing
    └── e-sheetbook.postman_collection.json
```

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
- `Survey.ts`: Survey model with options reference to SurveyOption
- `SurveyOption.ts`: Survey option model supporting two types:
  - `BOOLEAN`: Yes/No options (e.g., "不訂餐")
  - `QUANTITY`: Quantity-based options (e.g., "雞腿便當", "排骨便當")
- `Sheet.ts`: Sheet model for managing sheets
- `File.ts`: File model for file management
- `Register.ts`: Registration tracking model


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
