const express = require("express");
const app = express();

require("dotenv").config();
require("./Models/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const __dirname1 = path.resolve();

const AuthRouter = require("./Routes/AuthRouter.js");
const categoryRoutes = require("./Routes/Category");
const attributeRoutes = require("./Routes/Attribute");
const quotationRoutes = require("./Routes/Quotation");
const addressRoutes = require("./Routes/Address");
const productRoutes = require("./Routes/ProductRoute.js");
const productscard = require("./Routes/CartRoutes.js");
const whichlist = require("./Routes/WishlistRoutes.js");
const orderproduct = require("./Routes/OrderRoutes.js");
const reviewRoutes = require("./Routes/ReviewRoutes.js");
const blogroutes = require("./Routes/BlogRoutes.js");
const annularroutes = require("./Routes/AnnularRoutes.js");
const dewaltroutes = require("./Routes/DewaltRoutes.js");
const safetyroutes = require("./Routes/SafetyRoutes.js");
const weldingroutes = require("./Routes/WeldingRoutes.js");
const brandroutes = require("./Routes/BrandRoutes.js");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", AuthRouter);
app.use("/api/categories", categoryRoutes);
app.use("/api", attributeRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/addToCart", productscard);
app.use("/api/whichlist", whichlist);
app.use("/api/order", orderproduct); 
app.use("/api/reviews", reviewRoutes);
app.use("/api/allblogs", blogroutes);
app.use("/api/annular", annularroutes);
app.use("/api/dewalt", dewaltroutes);
app.use("/api/safety", safetyroutes);
app.use("/api/welding", weldingroutes);
app.use("/api/brand", brandroutes);

app.use(express.static(path.join(__dirname1, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
});


app.get("/mohafiz", (req, res) => {
  res.send("hello mohafiz this is your world ");
});
app.listen(PORT, () => {
  console.log(`http://147.93.108.82:5000/ server is running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is working fine on port 5000 🚀");
});