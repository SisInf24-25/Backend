const pool = require('../services/db');

const BookModel = {
    async createBook(guest_id, guests_number, house_id, date_in, date_out) {
        const book  = await pool.query(
            `INSERT INTO house (guest_id, guests_number, house_id, date_in, date_out) 
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *`,
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
        return house.rows[0]
    }
};

module.exports = BookModel;