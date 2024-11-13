const pool = require('../services/db');

const UserModel = {
    async createHouse(title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                        max_guests, city, address, lat, long, conditions, description, is_public) {
        const house  = await pool.query(
            `INSERT INTO house (title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                                max_guests, city, address, location, conditions, description, public, active) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, ST_SetSRID(ST_MakePoint($11, $12), 4326), 
                            $13, $14, $15, 'true') RETURNING *`,
            [title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                max_guests, city, address, lat, long, conditions, description, is_public]
        );
        return house.rows[0];
    },

    async modifyHouse(title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                        max_guests, city, address, lat, long, conditions, description, is_public) {
        const house  = await pool.query(
            `INSERT INTO house (title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
                                max_guests, city, address, location, conditions, description) 
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
                                ST_SetSRID(ST_MakePoint($11, $12), 4326), $13, $14, $15 'true') 
                                RETURNING`,
        [title, owner_id, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
        max_guests, city, address, lat, long, conditions, description, is_public]
        );
        return house.rows[0];
        },

    async getHousesByLoc(lat, long, radius) {
        const houses = await pool.query(
            `SELECT * FROM house 
            WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)`, 
            [lat, long, radius]
        );
        return houses.rows;
    }
};

module.exports = UserModel;