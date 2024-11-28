const pool = require('../services/db');

const UserModel = {
    async createHouse(title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                        max_guests, city, address, lat, long, conditions, description, is_public) {
        const house  = await pool.query(
            `INSERT INTO house (title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                                max_guests, city, address, lat, long, conditions, description, public, active) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'true') 
                    RETURNING *`,
            [title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                max_guests, city, address, lat, long, conditions, description, is_public]
        );
        return house.rows[0];
    },

    async modifyHouse(house_id, title, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                        max_guests, city, address, lat, long, conditions, description, is_public) {
        const house  = await pool.query(
            `UPDATE house SET title = $2, price = $3, n_wc = $4, n_rooms = $5, n_single_beds = $6, n_double_beds = $7,
                                max_guests = $8, city = $9, address = $10, lat = $11, long = $12, conditions = $13,
                                description = $14, public = $15
                    WHERE id = $1 
                    RETURNING *`, 
            [house_id, title, price, n_wc, n_rooms, n_single_beds, n_double_beds, max_guests, city, address, 
                lat, long, conditions, description, is_public]
        );
        return house.rows[0];
    },

    async deleteHouse(house_id) {
        await pool.query(
            `DELETE FROM house WHERE id = $1`, [house_id]
        );
    },

    async getHouseById(house_id) {
        const house = await pool.query(
            `SELECT * FROM house WHERE id = $1 and active = true`, [house_id]
        );
        return house.rows[0]
    },

    async getHouses() {
        const houses = await pool.query(
            `SELECT h.*, u.username AS owner_username, JSON_AGG(
                                                                    JSON_BUILD_OBJECT(
                                                                        'date_in', b.date_in, 
                                                                        'date_out', b.date_out
                                                                    )
                                                                ) AS reservations
                FROM house h 
                        LEFT JOIN users u ON h.owner_id = u.id 
                        LEFT JOIN book b ON b.house_id = h.id
                WHERE h.public = true AND h.active = true
                GROUP BY h.id`
        );
        return houses.rows
    },

    async getHousesByCity(city) {
        const houses = await pool.query(
            `SELECT h.*, u.username AS owner_username 
            FROM house h LEFT JOIN users u ON h.owner_id = u.id 
            WHERE h.city = $1 and h.public = true and h.active = true`, [city]
        );

        return houses.rows
    },

    async getHousesOfOwner(owner_id) {
        const houses = await pool.query(
            `SELECT h.*, JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'date_in', b.date_in, 
                                'date_out', b.date_out
                            )
                        ) AS reservations
                FROM house h
                LEFT JOIN book b ON b.house_id = h.id
                WHERE h.active = true AND h.owner_id = $1
                GROUP BY h.id`, [owner_id]
        );

        return houses.rows
    }
};

module.exports = UserModel;