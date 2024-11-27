const HouseModel = require("../models/houseModel");

exports.createHouse = async (req, res) => {
    const { title, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
        max_guests, city, address, lat, long, conditions, description, is_public } = req.body;

    if (!title || !price || !n_wc || !n_rooms || !n_single_beds || !n_double_beds || 
        !max_guests || !city || !address || !lat || !long || !conditions || is_public === undefined) {
        return res.status(400).json({ 
            error: "Missing fields" 
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

exports.deleteHouse = async (req, res) => {
    const { house_id } = req.body;

    // Comprobar que la petición incluye los campos necesarios
    if (!title) {
        return res.status(400).json({ 
            error: "Missing fields" 
        });
    }

    try {
        
        const house = HouseModel.getHouseById(house_id);
        // Comprobar si la casa existe
        if (!house) {
            return res.status(409).json({ 
                error: "House doesn't exist"
            });
        }
        // Comprobar si la casa pertenece al usuario
        if (house.owner_id != req.session.user.user_id) {
            //Editar
            return res.status(403).json({ 
                error: "Owner doesn't match"
            });
        }

        // Eliminar casa
        await HouseModel.deleteHouse(house_id);
        return res.status(200);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

exports.modifyHouse = async (req, res) => {
    const { house_id, title, price, n_wc, n_rooms, n_single_beds, n_double_beds, 
        max_guests, city, address, lat, long, conditions, description, is_public } = req.body;

    if (!house_id || !title || !price || !n_wc || !n_rooms || !n_single_beds || !n_double_beds || 
        !max_guests || !city || !address || !lat || !long || !conditions || is_public === undefined) {
        return res.status(400).json({ 
            error: "Missing fields" 
        });
    }

    try {
        
        var house = await HouseModel.getHouseById(house_id);
        // Comprobar si la casa existe
        if (!house) {
            return res.status(409).json({ 
                error: "House doesn't exist"
            });
        }
        // Comprobar si la casa pertenece al usuario
        if (house.owner_id != req.session.user.user_id) {
            console.log(house.owner_id)
            console.log(req.session.user.user_id)
            //Editar
            return res.status(403).json({ 
                error: "Owner doesn't match"
            });
        }

        // Modificar casa
        house = await HouseModel.modifyHouse(house_id, title, req.session.user.user_id, price, n_wc,
                                                n_rooms, n_single_beds, n_double_beds, max_guests, city,
                                                address, lat, long, conditions, description, is_public);
        res.status(200).json({
            house: house
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

exports.getHouses = async (req, res) => {
    try {

        const houses = HouseModel.getHouses();
        res.status(200).json({
            houses: houses
        });

    }  catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
