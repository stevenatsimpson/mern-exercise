This is a basic MERN application with inspiration from several existing applications, the features of it are to demonstrate the following:
- The ability to create an authentication system without relying on a library to completely handle it such as Auth0
- Creating a login system 
- Creating a CRUD DB 

The tools used are:
- Express [Handle backend, routing]
- Dotenv [Env variables]
- Mongoose [MongoDB handler]
- Bcryptjs [Hash passwords] 
- Jsonwebtoken [For storing passwords]
- Cookie-parser [Passwords stored in cookies]
- Toast [Error handling]
- Redux-Toolkit [State handling]

Functionality of this project:
- Create users by hitting the register button (with validation to be unable to access registering while logged in)
- Able to populate form and page with user details (bcrypt employed to keep the password safe and JWT cookie used to store the user's session)
- Update existing user info (a page only accessible once logged in)
- Delete an existing user as well as logout (which deletes the JWT cookie storing your session)

Coded along to https://www.youtube.com/watch?v=R4AhvYORZRY
