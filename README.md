# Backend of Account Manager and Payment Manager

This project consists of two backend services: the Account Manager and the Payment Manager. These services handle user registration, login, account management, and transaction processing.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rpahlevy/be-assessment.git
cd be-assessment
```

2. Install the dependencies

```bash
npm ci
```

3. Set up environment variables:
Copy the .env.example file and rename it into .env. Then change the values:
```bash
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=app_db

SUPABASE_URL=
SUPABASE_ANON_KEY=
```

## Running the Project

### Using Docker

1. Make sure you have docker and docker compose installed and accessible from the terminal.

2. Run below command to build docker image
```bash
docker-compose build
```

3. Then run below command to start up the docker image generated earlier (along with the DB)
```bash
docker-compose up
```
The application will be available at `http://localhost:3000`.

### Without Docker

1. Ensure that you have a Postgres database running and update the database information in the .env file. Additionally, add new environment that has DATABASE_URL information:
```sql
export DATABASE_URL=postgres://username:password@localhost/dbname
```
Because this environment is not available without docker-compose. Remember to chance it accordingly.

2. Initialize the database:
```bash
npx prisma migrate dev --name init
```

3. To start the project, run:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## Swagger Documentation
Swagger documentation is available at `http://localhost:3000/docs`. The documentation includes all the API endpoints and their respective request/response schemas.



# Take home assignment


## Description:
Build 2 Backend services which manages user’s accounts and transactions (send/withdraw). 

In Account Manager service, we have:
- User: Login with Id/Password
- Payment Account: One user can have multiple accounts like credit, debit, loan...
- Payment History: Records of transactions

In Payment Manager service, we have:
- Transaction: Include basic information like amount, timestamp, toAddress, status...
- We have a core transaction process function, that will be executed by `/send` or `/withdraw` API:

```js
function processTransaction(transaction) {
    return new Promise((resolve, reject) => {
        console.log('Transaction processing started for:', transaction);

        // Simulate long running process
        setTimeout(() => {
            // After 30 seconds, we assume the transaction is processed successfully
            console.log('transaction processed for:', transaction);
            resolve(transaction);
        }, 30000); // 30 seconds
    });
}

// Example usage
let transaction = { amount: 100, currency: 'USD' }; // Sample transaction input
processTransaction(transaction)
    .then((processedTransaction) => {
        console.log('transaction processing completed for:', processedTransaction);
    })
    .catch((error) => {
        console.error('transaction processing failed:', error);
    });
```

Features:
- Users need to register/log in and then be able to call APIs.
- APIs for 2 operations send/withdraw. Account statements will be updated after the transaction is successful.
- APIs to retrieve all accounts and transactions per account of the user.
- Write Swagger docs for implemented APIs (Optional)
- Auto Debit/Recurring Payments: Users should be able to set up recurring payments. These payments will automatically be processed at specified intervals. (Optional)

### Tech-stack:
- Recommend using authentication 3rd party: Supertokens, Supabase...
- `NodeJs/Golang` for API server (`Fastify/Gin` framework is the best choices)
- `PostgreSQL/MongoDB` for Database. Recommend using `Prisma` for ORM.
- `Docker` for containerization. Recommend using `docker-compose` for running containers.
 
## Target:
- Good document/README to describe your implementation.
- Make sure app functionality works as expected. Run and test it well.
- Containerized and run the app using Docker.
- Using `docker-compose` or any automation script to run the app with single command is a plus.
- Job schedulers utilization is a plus
