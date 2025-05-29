const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static frontend
app.use(express.static('public'));

// In-memory book storage
let books = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST add new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: "Title and author required" });
    }
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update a book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(b => b.id === bookId);

    if (book) {
        book.title = title || book.title;
        book.author = author || book.author;
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        res.json({ message: "Book deleted successfully" });
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`📚 Book API running at http://localhost:${PORT}`);
});
