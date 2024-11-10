const pool = require('../services/db');
const bcrypt = require("bcrypt");

const UserModel = {
    async createUser(name, lastname, username, mail, number, password, type) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user_id  = await pool.query(
            `INSERT INTO users (nombre, lastname, username, mail, number, password, type, active) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, 'true') RETURNING id`,
            [name, lastname, username, mail, number, hashedPassword, type]
        );
        return user_id.rows[0].id;
    },

    async getUserById(user_id) {
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);
        return user.rows[0];
    },

    async getUserByUsername(username) {
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        return user.rows[0];
    },

    async getUserByMail(mail) {
        const user = await pool.query("SELECT * FROM users WHERE mail = $1", [mail]);
        return user.rows[0];
    },

    async bannUser(userId) {
        await pool.query("UPDATE user SET active = false WHERE id = $1", [userId]);
    }

};

module.exports = UserModel;