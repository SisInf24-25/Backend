const pool = require('../services/db');

const BookModel = {
    async createBook(guest_id, guests_number, house_id, date_in, date_out) {
        const book  = await pool.query(
            `INSERT INTO book (guest_id, guests_number, house_id, date_in, date_out) 
                    VALUES ($1, $2, $3, $4, $5)`,
            [guest_id, guests_number, house_id, date_in, date_out]
        );
        return book.rows[0];
    },

    async modifyBook() {
        const book  = await pool.query(
            `UPDATE house SET 
                    WHERE
                    RETURNING *`, 
            []
        );
        return book.rows[0];
    },

    async deleteBook(book_id) {
        await pool.query(
            `DELETE FROM book WHERE id = $1`, [book_id]
        );
    },

    async getBookById(book_id) {
        const house = await pool.query(
            `SELECT * FROM book WHERE id = $1`, [book_id]
        );
        return house.rows[0];
    },

    async getBooksOfOwner(owner_id) {
        const books = await pool.query(
            `SELECT b.*, h.id AS house_id, h.title AS house_titleu.username AS owner_username, JSON_AGG(
                                                                    JSON_BUILD_OBJECT(
                                                                        'date_in', b.date_in, 
                                                                        'date_out', b.date_out
                                                                    )
                                                                ) AS reservations
                FROM book b 
                        LEFT JOIN house h ON b.house_id = h.id 
                        LEFT JOIN users u ON b.guest_id = u.id
                WHERE h.owner_id = $1`, 
                [owner_id]
        );
        return house.books;
    }
};

module.exports = BookModel;