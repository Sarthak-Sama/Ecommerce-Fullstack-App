const productModel = require("../models/product.model");
const shopModel = require("../models/shop.model");

module.exports.createProduct = async (req, res) => {
    try {
        const {name, description, category, discount, price} = req.body;


        if(!name || !description || !category || !price){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const shop = await shopModel.findOne({ owner: req.user._id });
        if (!shop) {
            return res.status(400).json({
                message: "Seller shop not found"
            });
        }

        const product = await productModel.create({
            name, description, category, discount: discount || 0, price, seller: shop
        })

        const images = req.files.map(file=>file.publicUrl).filter(url=>url ? true : false);
        
        product.images = images; 
        await product.save();

        await shopModel.updateOne(
            {_id: shop._id}, 
            {$push: {products: product._id}}
        )

        res.status(201).json({
            message: "Product created successfully",
            product
        })
        
    } catch (error) {
        // res.status(500).json(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id; // Get the product ID from the request parameters
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isActive = false; // Mark the product as inactive
        await product.save();

        res.status(200).json({ message: "Product blacklisted successfully" }); 
    } catch (error) {
        next(error);
    }
}

module.exports.getWomensWear = async (req, res, next) => {
    try {

        const products = await productModel.find({category:"womenswear"})
        res.status(200).json({
            products
        })

    } catch (error) {
        next(error);
        
    };
};

module.exports.getMensWear = async (req, res, next) => {
    try {

        const products = await productModel.find({category:"menswear"})
        res.status(200).json({
            products
        })

    } catch (error) {
        next(error);
        
    };
};

module.exports.getKidsWear = async (req, res, next) => {
    try {

        const products = await productModel.find({category:"kidswear"})
        res.status(200).json({
            products
        })

    } catch (error) {
        next(error);
        
    };
};

module.exports.getProductById = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id);
        
        res.status(200).json({
            product
        })
    } catch (error) {
        next(error)
    }
}
