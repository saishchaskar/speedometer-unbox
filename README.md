# Speedometer Application

An interactive, full-stack Speedometer Application designed to monitor GPS speed and efficiently manage speed data. The project includes a React-based frontend and a Node.js backend, both containerized with Docker for seamless deployment and scalability.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Docker Images](#docker-images)
- [Endpoints](#endpoints)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Speedometer Application is a full-stack solution that provides users with:

- A user-friendly interface to visualize GPS speed data.
- Backend services to store and manage speed data in a MySQL database.
- Automatic deletion of old data for efficient database management.

Both components are containerized using Docker and available on Docker Hub for easy deployment.

---

## Features

### Frontend

- Responsive React.js interface.
- Displays real-time GPS speed data.
- Designed for modern browsers and mobile devices.

### Backend

- Node.js and Express API for handling GPS data.
- Integration with MySQL for data storage.
- Scheduled cleanup of outdated data.
- Secure CORS-enabled access.

### Dockerized

- Prebuilt Docker images for both frontend and backend.
- Easy-to-deploy containers for any environment.

---

## Technologies Used

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js, MySQL
- **Database:** MySQL
- **Docker:** Containerization
- **Hosting:** Firebase (frontend)

---

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (for local development)
- MySQL database

---

### Frontend Setup

#### Using Docker:

1. Pull the image from Docker Hub:
   ```sh
   docker pull saishchaskar/speedometer-unbox:frontend
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 saishchaskar/speedometer-unbox:frontend
   ```

#### Local Development:

1. Navigate to the frontend directory and install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```

---

### Backend Setup

#### Using Docker:

1. Pull the image from Docker Hub:
   ```sh
   docker pull saishchaskar/speedometer-unbox:backend
   ```
2. Run the container:
   ```sh
   docker run -p 3001:3001 saishchaskar/speedometer-unbox:backend
   ```

#### Local Development:

1. Install dependencies:

   ```sh
   npm install
   ```

2. Configure the MySQL database in the backend code and ensure the table schema matches the application's requirements:
   ```sql
   CREATE TABLE speed_data (
       id INT AUTO_INCREMENT PRIMARY KEY,
       speed_kph FLOAT NOT NULL,
       timestamp DATETIME NOT NULL
    );
  ```
  ```js
  const db = mysql.createConnection({
      host: 'localhost',
      user: 'your_user',
      password: 'your_password',
      database: 'speed-db',
  });
  ```

4. Start the backend server:
   ```sh
   node server.js
   ```

---

## Docker Images

- **Frontend Image:** `saishchaskar/speedometer-unbox:frontend`
- **Backend Image:** `saishchaskar/speedometer-unbox:backend`

Both images are optimized for production use.

---

## Endpoints

### Backend API

- **POST /send-gps-speed**

  - Saves GPS speed data to the database.
  - Request Body:
    ```json
    {
      "speed": 50
    }
    ```

- **GET /speed**

  - Retrieves the latest GPS speed data.
  - Response:
    ```json
    {
      "speed_kph": 50,
      "timestamp": "2024-12-11T10:00:00.000Z"
    }
    ```

---

## How It Works

1. The frontend provides an interface to view real-time speed data.
2. Users send GPS speed data to the backend via the `/send-gps-speed` endpoint.
3. The backend stores data in a MySQL database and automatically deletes records older than 10 minutes.
4. The frontend fetches the latest speed data from the backend via the `/speed` endpoint.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork this repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Stay Connected

For any queries or suggestions, feel free to open an issue or contact the repository maintainer.



