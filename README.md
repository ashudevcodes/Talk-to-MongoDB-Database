**MongoDB Talker: Simplify Portfolio Interaction**

Imagine your portfolio website is a welcoming shop, but the Contact Me button is a locked door. People peek in, love your work, but can't get through! That's where MongoDB Talker comes in.

Think of it as a friendly greeter who unlocks the door, takes messages, and stores them safely in a digital notebook. No more lost leads or unanswered inquiries! Visitors can easily reach you, and you can build real connections with potential clients, collaborators, and even new friends.

It's like magic, but with code! MongoDB Talker is a free tool for anyone who wants their portfolio's Contact Me button to actually work. No more ghosting, just genuine conversations and exciting opportunities.

So, open your shop door wide and let the connections flow! With MongoDB Talker, your portfolio won't just be pretty, it'll be welcoming and full of possibilities.

**Features:**
- **MongoDB Integration:** The project comes with pre-written code that establishes a connection with MongoDB, making it easy to store form data.

**How It Works:**

1. Clone the repository. `git clone https://github.com/ashudevcodes/Talk-to-MongoDB-Database/tree/contectme/functionality`
2. Customize MongoDB connection details according to your setup.


## Connecting to the Database
1. **Create a directory named "server" within your project directory. `mkdir server`**
2. **Goto the directory `cd server`**
3. **Replace a `.env.sample` file in `.env` file**
4. **Replacing placeholders with your actual values:**

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

3. **Install dependencies:**
   - If your project uses a package manager like npm or yarn, run the appropriate command to install required dependencies (e.g., `npm install`).

4. **Start your application:**
   - Use the command or script that starts your application like `npm run dev` or `npm run start`, ensuring it reads from the `.env` file to configure environment variables.

## Testing User Registration with Postman

1. **Send a POST request to `http://localhost:8080/api/v1/user/register`.**
2. **Set the request body to form-data with the following fields:**
   - `fullname`: User's full name
   - `email`: User's email address
   - `name`: User's name
   - `message`: User's message

3. **Send the request.**
4. **User message will store in to database**

Enhance your portfolio website's user experience by using MongoDB Talker.
