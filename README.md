# NexusJobs - Full Stack Job Portal

A modern, responsive, full-stack Job Portal built with a beautiful dark-mode React frontend and a robust Spring Boot backend. 

## 🛠 Tech Stack
-   **Frontend:** ReactJS, Vite, Vanilla CSS 
-   **Routing & HTTP:** React Router DOM, Axios
-   **Backend:** Spring Boot, Spring Data JPA, Spring Web
-   **Database:** H2 In-Memory Database (MySQL ready via properties)

## 🎨 Design System
The frontend utilizes a custom CSS design system featuring:
-   **Premium Dark Aesthetic:** Deep slate background with contrasting surface layers.
-   **Dynamic Animations:** Smooth fade-ins, card elevation on hover, and neon primary color glows (`#3b82f6` glowing shadows).
-   **Glassmorphism Effects & Depth:** Multiple shadow layers to create distinct hierarchy between background, cards, and interactive elements.

## 🚀 How to Run

### Backend
Navigate to the `backend` directory and start the Spring Boot application using Maven Wrapper:
```bash
cd backend
./mvnw spring-boot:run
```
*(The server will start on port 8080. Four dummy jobs are automatically seeded for testing.)*

### Frontend
Navigate to the `frontend` directory, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
*(The UI will run on `http://localhost:5173`. Open this URL in your browser.)*

## 🗄️ Database
By default, the backend runs with an **H2 In-Memory Database**, meaning you don't need any complex setup. You can view the data live by navigating to:
-   **URL:** `http://localhost:8080/h2-console`
-   **JDBC URL:** `jdbc:h2:mem:jobportaldb`
-   **Username:** `sa` (no password)

*Note: If you want to use MySQL instead, uncomment the block in `backend/src/main/resources/application.properties`.*
