import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
}

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

db.connect();



app.get('/', async (req, res) => {
    try {
        const response = await db.query("Select * from notes");
        console.log(response.rows);
        res.json(response);
    } catch (error) {
        console.error("Error:", error);
    }
});

app.post('/add', async (req, res) => {
    try {
        const { title, content } = req.body;
        console.log(`title: ${title} + content: ${content}`);
        const newNote = await db.query(
            'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        res.json(newNote.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.post('/delete', async (req, res) => {
    try {
        const {id} = req.body;
        const newNote = await db.query(
            'DELETE FROM notes WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(newNote.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`);
});




