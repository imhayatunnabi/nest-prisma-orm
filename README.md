To fully start this project, follow the steps below. These instructions cover setting up the project, installing dependencies, running the application in different modes, and testing.

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed (preferably the latest LTS version).
- Install [npm](https://www.npmjs.com/) (usually included with Node.js).
- Ensure you have [Prisma](https://www.prisma.io/) CLI installed globally (optional but recommended for database migrations and management).

### Step-by-Step Instructions

#### 1. Clone the Repository
First, clone the repository to your local machine.
```bash
git clone <repository-url>
cd <repository-directory>
```

#### 2. Create `.env` File
Create a `.env` file in the root directory of your project and add the following environment variables. Replace the placeholder values with your actual configuration.

```ini
DATABASE_URL=your_database_url
MAILERSEND_API_KEY=your_mailersend_api_key
JWT_SECRET=your_jwt_secret
```

**Example:**
```ini
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
MAILERSEND_API_KEY=your_mailersend_api_key
JWT_SECRET=your_jwt_secret
```

#### 3. Install Dependencies
Install all the required dependencies using npm.
```bash
npm install
```

#### 4. Run Database Migrations (Optional)
If you are using Prisma for database management, run the migrations.
```bash
npx prisma migrate dev
```

#### 5. Running the Application
You can run the application in different modes:

**Development Mode:**
```bash
npm run start
```

**Watch Mode (auto-restart on changes):**
```bash
npm run start:dev
```

**Production Mode:**
```bash
npm run start:prod
```

#### 6. Testing
Run the various tests provided to ensure everything is working as expected.

**Unit Tests:**
```bash
npm run test
```

**End-to-End (e2e) Tests:**
```bash
npm run test:e2e
```

**Test Coverage:**
```bash
npm run test:cov
```

#### 7. Generate JWT Secret (Optional)
If you need to generate a new JWT secret, you can use the following command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
```

### Additional Information

#### Support
Nest is an open-source project licensed under the MIT License. You can support the project through sponsorship or backing on [Open Collective](https://opencollective.com/nest#backer) or [Patreon](https://patreon.com/nestjs).

#### Stay in Touch
- **Author**: [Kamil Myśliwiec](https://kamilmysliwiec.com)
- **Website**: [NestJS](https://nestjs.com/)
- **Twitter**: [@nestframework](https://twitter.com/nestframework)

#### License
This project is licensed under the [MIT License](LICENSE).

By following these instructions, you should be able to set up and start working on your NestJS project efficiently.