# MERN Movie Review App 🍿

A comprehensive web application to review movies and see reviews added by others, built using the MERN stack (MongoDB, Express.js, React, Node.js).

## 🖼️ Preview   
![Movie Review App Preview](/review.jpg)

## 🎥 Features

- **Movie Information**: Find your favorite movies using the TMDb API.
- **Add/View Reviews**: Share your thoughts and read others' opinions.
- **Responsive UI**: Enjoy interacting and adding/deleting reviews

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- MongoDB (v4+)

### Local Development

1. **Clone the repository:**

```
git clone https://github.com/affanmalik02/mern-app.git
cd mern-app
```

2. **Install dependencies for both backend and frontend**:

### Setup Server
```
cd mern-app/server
npm init  -y
npm install express mongoose cors nodemon
```

### Setup Client
```
cd mern-app/client
npm install
```

###  Setup MongoDB

update mongoose.connect URL in server/node_modules/index.js

3. **Run the application**:

### Start the server
```
cd mern-app/server
node index.js
```

### In a new terminal, start the client
```
cd mern-app/client
npm start
```

The app should now be running on `http://localhost:3000`.

## 📜 License

This project is licensed under the MIT License.
