const express = require("express");
const app = express();
const compression = require("compression");

require("dotenv").config();
require("./Models/db");
const bodyParser = require("body-parser");
const cors = require("cors");

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
const EmailerRoutes = require("./Routes/Emailer.js");
const RepairRoutes = require("./Routes/Repair.js");
const EnquiryRoutes = require("./Routes/Enquiry.js");
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", AuthRouter);
app.use("/api/categories", categoryRoutes);
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
app.use("/api/emailer", EmailerRoutes);
app.use("/api/repair", RepairRoutes);
app.use("/api/enquiry", EnquiryRoutes);
app.use("/api", attributeRoutes);
app.listen(PORT, () => {
  console.log(`http://147.93.108.82:5000/ server is running on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is working fine on port 5000 🚀");
});
