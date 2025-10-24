# MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com/
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

## Step 2: Get Your Connection String
1. In your MongoDB Atlas dashboard, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `pixelegant`

## Step 3: Create .env File
Create a file called `.env` in your `backend` folder with:

```
MONGODB_URL=mongodb+srv://username:password@cluster0.mongodb.net/pixelegant?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_secure_at_least_32_characters
ADMIN_EMAIL=admin@pixelegant.com
ADMIN_PASSWORD=admin123
PORT=6000
```

## Step 4: Database User Setup
1. In MongoDB Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Create a user with username and password
4. Give it "Read and write to any database" permissions

## Step 5: Network Access
1. Go to "Network Access" in MongoDB Atlas
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development

## Step 6: Test Connection
Run your backend server and check if it connects successfully.
