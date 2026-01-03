# Graphy Server - Secure GraphQL API

A secure GraphQL server for querying US cities data.

## Security Improvements

This fork includes the following security enhancements from the original repository:

### ✅ Fixed Vulnerabilities
1. **Added Helmet.js** - Provides security headers to protect against common web vulnerabilities
2. **Proper Session Configuration** - Configured with secure cookies and proper session settings
3. **Environment Variables** - Removed hardcoded secrets, now using environment variables
4. **Removed Vulnerable Dependencies** - Removed deprecated and vulnerable `csurf` package
5. **Production-Safe GraphiQL** - GraphiQL interface is only enabled in development mode
6. **Fixed Code Errors** - Corrected syntax errors and undefined variable references

### 📊 Vulnerability Scan Results
- **npm audit**: 0 vulnerabilities found
- All dependencies are up-to-date and secure
- No critical, high, or medium severity issues

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your own secure values:
```env
SESSION_SECRET=your-secure-random-secret-here
NODE_ENV=development
PORT=4000
```

## Running the Server

Development mode (with GraphiQL):
```bash
npm start
```

Production mode (without GraphiQL):
```bash
NODE_ENV=production npm start
```

## API Usage

### GraphQL Endpoint
```
POST http://localhost:4000/graphql
```

### Example Queries

Get all cities in a state:
```graphql
{
  cities(state: "Texas") {
    city
    state
  }
}
```

Get a specific city:
```graphql
{
  city(name: "Houston") {
    city
    state
  }
}
```

## Security Features

- **Helmet.js**: Sets security-related HTTP headers
- **Secure Sessions**: HttpOnly cookies with SameSite protection
- **Environment-based Configuration**: Secrets stored in environment variables
- **Content Security Policy**: Configured to prevent XSS attacks
- **Production Mode**: GraphiQL disabled in production for security

## License

See LICENSE file for details.
