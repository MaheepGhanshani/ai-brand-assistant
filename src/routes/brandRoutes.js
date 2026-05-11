const express = require("express");

const router = express.Router();

const {
    createBrand,
    getBrands,
    getBrandById
} = require("../controllers/brandController");

router.post("/", createBrand);

router.get("/", getBrands);

router.get("/:id", getBrandById);

module.exports = router;