const Brand = require("../models/Brand");
const Message = require("../models/Message");

exports.createBrand = async (req, res) => {

    try {

        const brand = await Brand.create({
            name: req.body.name
        });

        res.status(201).json(brand);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};

exports.getBrands = async (req, res) => {

    const brands = await Brand.find();

    res.json(brands);
};

exports.getBrandById = async (req, res) => {

    const brand = await Brand.findById(req.params.id);

    const messages = await Message.find({
        brandId: req.params.id
    });

    res.json({
        brand,
        messages
    });
};