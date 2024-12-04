const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//Database Connection with MongoDB

try {
  mongoose.connect(
    "mongodb+srv://admin:12345@cluster0.qq732.mongodb.net/e-commerce"
  );
  console.log("* MongoDB Connection Successful *");
} catch (error) {
  console.error("Error in DB : ", error);
}

//API Creation
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Image Storage System

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Schema for Creating products

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1); //This will give me last product in array
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Product Saved");
  res.json({
    success: 1,
    name: req.body.name,
  });
});

//Creating API for deleting Products

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product Removed");
  res.json({
    success: 1,
    name: req.body.name,
  });
});

//Creating API for getting all products (display product in frontend)

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

//Schema creating for User Model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating Endpoint for Registering User

app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });

  if (check) {
    return res
      .status(300)
      .json({ success: false, error: "Existing User with same email address" });
  }

  let cart = {};
  for (let index = 0; index < 300; index++) {
    cart[index] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token: token,
  });
});

//creating endpoint for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Wrong Password" });
    }
  } else {
    res.json({ success: false, error: "User Not Found" });
  }
});

// creating endpoint for newcollection data
//error : /newcollectiond
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log(newcollection)
  console.log("NewCollection Fetched");
  res.send(newcollection) 
});
//creating endpoint for popular in women collection
app.get("/popularinwoman", async (req, res) => {
  let products = await Product.find({ category: "woman" });
  let popular_in_woman = products.slice(0, 4);
  console.log("popular in woman fetched");
  res.send(popular_in_woman);
});

// creating middleware to fetch
const fetchUser = async (req, res ,next) => {
  const token = req.header('auth-token')?.trim() ;
  console.log(token)
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      console.log("I am here 2")
      const data = jwt.verify(token, "secret_ecom");
      console.log(data)
      req.user = data.user;
      console.log(req.user)
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticate using a valid token" });
    }
  }
};

//creating endpoint for adding products in cartdata
// app.post("/addtocart", fetchUser, async (req, res) => {
//   console.log(req.body,req.user);
//   console.log("Added", req.body.itemId);
//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData });
//   res.send({message:"Added Successfully"});
// });

app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    console.log(req.body, req.user);
    console.log("Added", req.body.itemId);

    // Find user and update cart in a single operation
    const result = await Users.findOneAndUpdate(
      { _id: req.user.id },
      { $inc: { [`cartData.${req.body.itemId}`]: 1 } }, // Increment item quantity
      { new: true, useFindAndModify: false } // Return the updated document
    );

    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "Added Successfully", cartData: result.cartData });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//creating endpoint for removing products in cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData });
  res.send("removed");
});

//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
