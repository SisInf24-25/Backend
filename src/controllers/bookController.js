const BookModel = require("../models/bookModel");

exports.createBook = async (req, res) => {
    const { guests_number, house_id, date_in, date_out } = req.body;

    if (!guests_number || !house_id || !date_in || !date_out) {
        return res.status(400).json({ 
            error: "Missing fields" 
        });
    }

    try {
        const book = await BookModel.createBook(req.session.user.user_id, guests_number, 
                                                    house_id, date_in, date_out);
        res.status(200).json({
            book: book
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
