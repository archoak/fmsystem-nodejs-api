const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
// 引入 users.js
const users = require("./routes/api/users")
// 引入 profile.js
const profile = require("./routes/api/profile")

// DB config
const db = require("./config/keys").mongoURI;


// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// connect to mongodb
mongoose.connect(db)
        .then(()=>console.log("mongodb connected"))
        .catch(err=>console.log(err))

//passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

//使用 routes
app.use("/api/users",users);
app.use("/api/profile",profile)




// app.get("/",(req,res) => {
//   res.send("nihao server")
// })
const port = process.env.PORT || 5000;

app.listen(port,() => {
  console.log(`Server running on port ${port}`);
})
