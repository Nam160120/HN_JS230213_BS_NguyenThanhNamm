const express = require("express");
const router = express.Router();

const fs = require("fs");

// get posts
router.get("/", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/posts.json"));
    res.json(data);
  } catch (error) {
    res.json({
      error,
    });
  }
});

// get post theo id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/posts.json"));

    let find = data.find((e, i) => e.id === +id);

    if (find) {
      res.json(find);
    } else {
      res.json({
        message: "Posts not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

// post post vào csdl
router.post("/", (req, res) => {
  let { title, body } = req.body;

  try {
    let post = {
        userId: Math.floor(Math.random() * 10),
        id: Math.floor(Math.random() * 100000),
        title,
        body,
    };

    let data = JSON.parse(fs.readFileSync("./users-posts-api/posts.json"));

    data.push(post);

    fs.writeFileSync("./users-posts-api/posts.json", JSON.stringify(data));

    res.json({
      message: "Post created successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// put post theo id
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/posts.json"));

    let findIndex = data.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "Post not found",
      });
    } else {
      data[findIndex] = {
        ...data[findIndex],
        title,
        body,
      };
      fs.writeFileSync("./users-posts-api/posts.json", JSON.stringify(data));
      res.json({
        message: "Post updated successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

// delete post

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/posts.json"));

    let findIndex = data.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "Post not found",
      });
    } else {
      data.splice(findIndex, 1);
      fs.writeFileSync("./users-posts-api/posts.json", JSON.stringify(data));
      res.json({
        message: "Post deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
