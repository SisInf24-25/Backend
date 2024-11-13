const HouseModel = require("../models/houseModel");

exports.createHouse = async (req, res) => {
    const { title, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
        max_guests, city, address, lat, long, conditions, description, is_public } = req.body;

    console.log(req.body);

    if (!title || !price || !n_wc || !n_rooms || !n_single_beds || !n_double_beds || 
        !max_guests || !city || !address || !lat || !long || !conditions || is_public === undefined) {
        return res.status(400).json({ 
            error: "Empty fields" 
        });
    }

    try {
        const house = await HouseModel.createHouse(title, req.session.user.user_id, price, n_wc, n_rooms, 
                                                    n_single_beds, n_double_beds, max_guests, city, address, 
                                                    lat, long, conditions, description, is_public);
        res.status(200).json({
            house: house
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
