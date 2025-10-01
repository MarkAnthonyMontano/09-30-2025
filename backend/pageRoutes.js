const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// ---------------- MySQL Connections ----------------

// Admission DB → holds page_table + page_access
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admission',
});

// Enrollment DB → holds user_accounts
const db3 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enrollment',
});

// ---------------- Pages CRUD ----------------

// Create a new page
router.post('/pages', (req, res) => {
    const { page_description, page_group } = req.body;

    db.query(
        'INSERT INTO page_table (page_description, page_group) VALUES (?, ?)',
        [page_description, page_group],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, page_description, page_group });
        }
    );
});

// Get all pages
router.get('/pages', (req, res) => {
    db.query('SELECT * FROM page_table', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// ---------------- Page Access ----------------

// Get all page access records for a person
router.get('/page_access/:personId', (req, res) => {
    const personId = parseInt(req.params.personId, 10);

    const query = `
        SELECT pa.page_id, pa.page_privilege, pt.page_description, pt.page_group
        FROM page_table pt
        LEFT JOIN page_access pa ON pa.page_id = pt.id AND pa.user_id = ?
    `;

    db.query(query, [personId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Admission DB error' });
        res.json(results);
    });
});

// Update or insert page access (toggle) for a person
router.put('/page_access/:personId/:pageId', (req, res) => {
    const personId = parseInt(req.params.personId, 10);
    const pageId = parseInt(req.params.pageId, 10);
    const { page_privilege } = req.body; // 0 = allow, 1 = deny

    const updateQuery = 'UPDATE page_access SET page_privilege = ? WHERE user_id = ? AND page_id = ?';
    db.query(updateQuery, [page_privilege, personId, pageId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (result.affectedRows === 0) {
            // No record exists → insert new
            const insertQuery = 'INSERT INTO page_access (user_id, page_id, page_privilege) VALUES (?, ?, ?)';
            db.query(insertQuery, [personId, pageId, page_privilege], (insertErr, insertResult) => {
                if (insertErr) return res.status(500).json({ error: 'Insert error' });
                return res.json({ success: true, inserted: true, id: insertResult.insertId });
            });
        } else {
            // Record updated
            return res.json({ success: true, updated: true });
        }
    });
});

// Check if a person has access to a specific page
// ✅ KEEP THIS ONE
router.get('/page_access/:userId/:pageId', (req, res) => {
    const userId = parseInt(req.params.userId, 10); // this is user_accounts.id
    const pageId = parseInt(req.params.pageId, 10);

    // Step 1: Get person_id from enrollment.user_accounts
    db3.query('SELECT person_id FROM user_accounts WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB3 error' });
        if (results.length === 0) return res.json({ hasAccess: false });

        const personId = results[0].person_id;

        // Step 2: Check admission.page_access using person_id
        db.query(
            'SELECT page_privilege FROM page_access WHERE user_id = ? AND page_id = ? LIMIT 1',
            [personId, pageId],
            (err2, results2) => {
                if (err2) return res.status(500).json({ error: 'Admission DB error' });

                if (results2.length === 0) return res.json({ hasAccess: false });

                const privilege = results2[0].page_privilege;
                const hasAccess = privilege === 0; // 0 = allowed, 1 = denied
                return res.json({ hasAccess });
            }
        );
    });
});


// ---------------- Export Router ----------------
module.exports = router;
