const router = require("express").Router();
const admin = require("firebase-admin");
let data = [];

router.get("/", (req, res) => {
  return res.send("Inside the user router");
});

router.get("/jwtVerification", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "Token Not Found" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res
        .status(500)
        .json({ succes: false, msg: "Unauthorized access" });
    }
    return res.status(200).json({ success: true, data: decodedValue });
  } catch (err) {
    return res.send({
      succes: false,
      msg: `Error in extracting the token : ${err}`,
    });
  }
});

const listAllUsers = async (nextPageToken) => {
  admin
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUserResult) => {
      listUserResult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (listUserResult.pageToken) {
        listAllUsers(listUserResult.pageToken);
      }
    })
    .catch((err) => console.log(err));
};

listAllUsers();

router.get("/all", async (req, res) => {
  try {
    return res.status(200).send({ success: true, data: data });
  } catch (err) {
    return res.send({
      succes: false,
      msg: `Error in extracting the token : ${err}`,
    });
  }
});

module.exports = router;
