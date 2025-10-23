# 🖼 AI Image Generator Deployment on AWS

## Overview

This project deploys a full-stack application (**React frontend + FastAPI backend**) to **AWS EC2** using **Docker Compose**.
Both services run in separate containers and communicate via REST API calls.
The architecture is designed for scalability, portability, and fast deployment in a cloud environment.

---

## Stack

* **AWS EC2 (Ubuntu 24.04)**
* **Docker & Docker Compose**
* **React (Vite)** – frontend interface for prompt input and image display
* **FastAPI (Python)** – backend API that processes text prompts and generates AI-based images
* **Axios (REST API)** – connects frontend and backend for seamless communication

---

## How It Works

### 1. Containerized Architecture

* The frontend and backend are built into separate Docker containers.
* Docker Compose manages both services, allowing them to run simultaneously with a single command:

```bash
docker compose up -d --build
```

---

### 2. API Communication

* The React app sends user prompts to the FastAPI server using Axios:

```js
axios.post("http://13.55.189.3:8000/generate", { prompt });
```

* FastAPI processes the input, generates an AI image, and returns it to the client.
* The image is displayed dynamically on the frontend.

---

### 3. Deployment on AWS

* The entire stack is deployed on an **AWS EC2 instance**, running both containers persistently.
* Docker ensures consistent performance and allows easy redeployment by rebuilding containers.

---

## Result

* Both frontend and backend containers run seamlessly on **AWS EC2**
* Image generation requests are handled efficiently via REST API
* Fully portable and scalable full-stack deployment powered by **Docker Compose**

---

## Project Value

This project demonstrates:

*  **Cloud deployment using AWS EC2**
*  **Containerized full-stack architecture** (React + FastAPI)
*  **REST API integration** between frontend and backend
*  **Simple Docker Compose orchestration** for deployment and scaling

---

