# Notes Keeper App

## Description

The Notes Keeper App is a web application that allows users to create, view, and manage their notes.
It is built using React for the frontend and Express.js for the backend, with PostgreSQL as the database.
The app supports creating, reading, updating, and deleting notes.

## Features

- Add new notes with a title and content.
- View all notes.
- Delete notes.
- Server-side validation to ensure notes are properly formatted.

## Technologies Used

- Frontend: React, Axios, Material UI
- Backend: Express.js, Node.js, pgAdmin 
- Database: PostgreSQL
- Other: Cors, Body-Parser

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- PostgreSQL

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/notes-keeper-app.git
   cd notes-keeper-app

2. Install frontend dependencies:

   ```sh
   Copy code
   cd frontend
   npm install

3. Install backend dependencies:

   ```sh
   Copy code
   cd ../backend
   npm install

4.Set up PostgreSQL database:

 -> Create a PostgreSQL database.

 -> Run the following SQL script to create the necessary tables and constraints:

    
    CREATE TABLE notes (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    
    CREATE TRIGGER update_updated_at
    BEFORE UPDATE ON notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

5. Configure environment variables:

    ```sh
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/your-database-name

