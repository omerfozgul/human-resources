# Human Resources Management System

This is a simple Human Resources Management System for managing job candidates. The system uses Java (Spring Boot) for the backend and Angular (Ionic) for the frontend.

## Features

- Add, view, edit, and delete candidates
- Filter candidates by position, military status, and notice period
- Upload and store CVs
- Responsive and mobile-friendly user interface
- Form validation

## Project Structure

The project has two main parts:

- **human-resources-backend** - REST API with Java Spring Boot
- **human-resources-frontend** - User interface built with Angular and Ionic

## Technologies

### Backend

- Spring Boot
- H2 Database (for development)

### Frontend

- Angular
- Ionic Framework

## Setup and Running

### Requirements

- Java 8 or higher
- Node.js and npm
- Angular CLI
- Ionic CLI

### Running the Backend

1. Go to the backend folder:
```
cd human-resources-backend/
```

2. Build the project with Maven:
```
./mvnw clean install
```

3. Start the Spring Boot application:
```
./mvnw spring-boot:run
```

The application will run at `http://localhost:8080` by default.

### Running the Frontend

1. Go to the frontend folder:
```
cd human-resources-frontend/
```

2. Install the required packages:
```
npm install
```

3. Start the application:
```
ionic serve
```

The application will run at `http://localhost:8100` by default.

## Database Configuration

The project uses H2 in-memory database. Database settings are in the `application.yml` file:

You can access the H2 Console at `http://localhost:8080/h2-console`.

## API Endpoints

### Candidate Operations

| Method | Endpoint | Description |
|-------|----------|----------|
| GET   | /api/candidates | List all candidates |
| GET   | /api/candidates/{id} | Get a specific candidate |
| POST  | /api/candidates | Add a new candidate |
| PUT   | /api/candidates/{id} | Update an existing candidate |
| DELETE| /api/candidates/{id} | Delete a candidate |
| POST  | /api/candidates/{id}/cv | Upload a candidate's CV |
| GET   | /api/candidates/test_data | Create test data |
| GET   | /api/candidates/ping | Check if the backend server is running

## Sample Candidate Data

The system starts with 10 test candidates with the following fields:

- id: Unique identifier
- firstName: First name
- lastName: Last name
- position: Applied position
- militaryStatus: Military status (Completed/Exempted/Deferred)
- noticePeriod: Notice period (No Notice/2 Weeks/1 Month/2 Months)
- phone: Phone number
- email: Email address
- cv: CV filename

## Notes

- CV files are stored in the "uploads" folder on the backend
- The frontend can filter by position, military status, and notice period
- Form validation is implemented both on the frontend (Angular Reactive Forms) and backend (Jakarta Validation)
