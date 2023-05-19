const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usersRoutes = require("./routes/users-list.routes");
const postsRoutes = require("./routes/posts.routes");

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/posts", postsRoutes);

// bonus
app.get("/api/v1/:userId/posts", (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(404).json({
      message: "Posts not found",
    });
  } else {
    fs.readFile("./users-posts-api/posts.json", (err, data) => {
      if (err) throw err;
      const posts = JSON.parse(data);
      const post = posts.filter((post) => post.userId === parseInt(userId));
      res.status(200).json(post);
    });
  }
});

app.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
