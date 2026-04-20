# NexusJobs - Full Stack Job Portal

NexusJobs is a full-stack job portal built with a React + Vite frontend and a Spring Boot backend. It supports role-based workflows for employees, recruiters, and administrators.

## Tech Stack

- **Frontend:** ReactJS 18, Vite, Vanilla CSS
- **Routing and HTTP:** React Router DOM, Axios
- **Backend:** Java 17, Spring Boot, Spring WebMVC, Spring Data JPA, Lombok
- **Database:** MySQL
- **Build Tools:** Maven, npm

## Features

- Role-based login and routing for Employee, Recruiter, and Admin users.
- Employees can browse jobs, search listings, apply for jobs, and track applications.
- Recruiters can create job posts, manage their listings, view applicants, and update application status.
- Admins can view all users, jobs, and applications.
- MySQL persistence through Spring Data JPA repositories.
- Responsive dark-mode UI with dashboards, forms, modals, and search.

## Database Configuration

The backend uses MySQL with the following active configuration in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobportaldb?useSSL=false&serverTimezone=UTC&createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=<your-mysql-password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

Before starting the backend, make sure MySQL Server is running and update the password in `application.properties` to match your local MySQL account. The database `jobportaldb` will be created automatically if it does not already exist.

## How to Run

### Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Demo Credentials

The backend seeds demo users and jobs when the database is empty.

```text
Admin: admin@nexus.in / admin123
Recruiter: hr@techmahindra.com / hr123
Employee: amit@gmail.com / emp123
```

## Main API Endpoints

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/users

GET    /api/jobs
GET    /api/jobs?search={keyword}
GET    /api/jobs?recruiterId={id}
POST   /api/jobs
GET    /api/jobs/{id}
DELETE /api/jobs/{id}

POST   /api/applications
GET    /api/applications
GET    /api/applications/job/{jobId}
GET    /api/applications/employee/{employeeId}
PUT    /api/applications/{id}/status
```

## Verification

Backend verification:

```bash
cd backend
mvn test
```

Frontend verification:

```bash
cd frontend
npm run build
```

## Project Structure

```text
Job-Portal/
  backend/
    src/main/java/com/jobportal/backend/
      config/
      controller/
      entity/
      repository/
    src/main/resources/application.properties
    pom.xml
  frontend/
    src/
      components/
      pages/
      App.jsx
      AuthContext.jsx
    package.json
```
