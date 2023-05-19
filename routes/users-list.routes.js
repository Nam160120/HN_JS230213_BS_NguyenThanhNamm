const express = require("express");
const router = express.Router();

const fs = require("fs");

// get users
router.get("/", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/users.json"));
    res.json(data);
  } catch (error) {
    res.json({
      error,
    });
  }
});

// get users theo id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/users.json"));

    let find = data.find((e, i) => e.id === +id);

    if (find) {
      res.json(find);
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

// post user vào csdl
router.post("/", (req, res) => {
  let { name, username, email } = req.body;

  try {
    let user = {
      id: Math.floor(Math.random() * 100000),
      name,
      username,
      email,
      address: {
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        geo: {
          lat: null,
          lng: null,
        },
      },
      phone: null,
      website: null,
      company: {
        name: null,
        catchPhrase: null,
        bs: null,
      },
    };

    let data = JSON.parse(fs.readFileSync("./users-posts-api/users.json"));

    data.push(user);

    fs.writeFileSync("./users-posts-api/users.json", JSON.stringify(data));

    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// put user theo id
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { email } = req.body;
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/users.json"));

    let findIndex = data.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "User not found",
      });
    } else {
      data[findIndex] = {
        ...data[findIndex],
        email,
      };
      fs.writeFileSync("./users-posts-api/users.json", JSON.stringify(data));
      res.json({
        message: "User updated successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

// delete user

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./users-posts-api/users.json"));

    let findIndex = data.findIndex((e, i) => e.id === +id);

    if (findIndex === -1) {
      res.json({
        message: "User not found",
      });
    } else {
      data.splice(findIndex, 1);
      fs.writeFileSync("./users-posts-api/users.json", JSON.stringify(data));
      res.json({
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
