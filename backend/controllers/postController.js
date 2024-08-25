// controllers/postController.js
const db = require('../database');

exports.getAllPosts = (req, res) => {
    const sql = 'SELECT * FROM posts';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ posts: rows });
    });
};

exports.getPostById = (req, res) => {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ post: row });
    });
};

exports.createPost = (req, res) => {
    const { title, content } = req.body;
    const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    const params = [title, content];
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ post: { id: this.lastID, title, content } });
    });
};

exports.updatePost = (req, res) => {
    const { title, content } = req.body;
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    const params = [title, content, req.params.id];
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Post updated successfully' });
    });
};

exports.deletePost = (req, res) => {
    const sql = 'DELETE FROM posts WHERE id = ?';
    const params = [req.params.id];
    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Post deleted successfully' });
    });
};
