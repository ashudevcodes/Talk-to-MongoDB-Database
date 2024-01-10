## Connecting to the Database

1. **Replace a `.env.sample` file in `.env` file**
2. **Replacing placeholders with your actual values:**

```
PORT= "8000"
MONGO_URI= "mongodb://your_mongo_uri"  # Replace with your MongoDB connection string
CORS_ORIGIN=*
ACCESS_TOKEN_SEC="use and fuzzy string value"
ACCESS_TOKEN_EXP=1d
REFRESH_TOKAN="use and fuzzy string value"
REFRESH_TOKAN_EXP=10d
CLOUDINARY_CLOUD_NAME=your_cloud_name  # Replace with your Cloudinary cloud name
CLOUDINARY_API_KEY=your_api_key  # Replace with your Cloudinary API key
CLOUDINARY_API_SEC=your_api_secret  # Replace with your Cloudinary API secret
```

3. **Install dependencies (if applicable):**
   - If your project uses a package manager like npm or yarn, run the appropriate command to install required dependencies (e.g., `npm install`).

4. **Start your application:**
   - Use the command or script that starts your application like `npm run dev` or `npm run start`, ensuring it reads from the `.env` file to configure environment variables.

## Testing User Registration with Postman

1. **Send a POST request to `http://localhost:8080/api/v1/user/register`.**
2. **Set the request body to form-data with the following fields:**
   - `fullname`: User's full name
   - `avatar`: User's avatar image (if applicable)
   - `password`: User's password
   - `email`: User's email address
   - `username`: User's username
3. **Send the request.**

**Upon successful registration, the user data, including the avatar image (if provided), should be stored in the MongoDB database, and the avatar image should be uploaded to Cloudinary. You will only get the URL of that image in your database**

