const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

require("dotenv").config();
const connectDB = require("./config/mongodb");
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const shopRoutes = require("./routes/shop.routes");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/shop", shopRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
