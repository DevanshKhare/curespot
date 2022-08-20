const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Data = require("../models/data");
const fetchuser = require("../middleware/fetchuser");

router.get("/", async (req, res) => {
  res.send("hello");
});

router.get("/fetchallusers", async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//fetbyphone
router.get("/fetchbyuid", async (req, res) => {
  try {
    if (req.query.uid && req.query.uid.length == 8) {
      const data = await User.findOne({ uid: req.query.uid });
      if (data) {
        res.json(data);
      } else {
        res.json({ error: "user does not exist" });
      }
    } else {
      res.json({ error: "enter valid uid" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.get("/completedata", async (req, res) => {
  try {
    if (req.query.uid && req.query.uid.length == 8) {
      const data = await Data.findOne({ uid: req.query.uid });
      if (data) {
        res.json(data);
      } else {
        res.json({ error: "user does not exist" });
      }
    } else {
      res.json({ error: "enter valid uid" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      age,
      phone,
      uid,
      gender,
      image,
      city,
      diabetes,
      bloodpressure,
    } = req.body;
    const newUser = new User({
      name,
      age,
      phone,
      uid,
      gender,
      image,
      city,
      diabetes,
      bloodpressure,
    });
    const saveUser = await newUser.save();
    res.json({ code: "0" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.post("/adddata", async (req, res) => {
  try {
    const {
      uid,
      name,
      age,
      gender,
      phone,
      city,
      height,
      weight,
      hand_temperature,
      head_temperature,
      pulse,
      oxygen,
      bmi,
      bmi_scale,
      bmr,
      body_fat,
      body_fat_index,
      lean_muscle_mass,
      symptoms,
      predicted_prognosis,
      prescription_done,
      medicines,
      diagnosis,
      remarks,
    } = req.body;
    const newData = new Data({
      uid,
      name,
      age,
      gender,
      phone,
      city,
      height,
      weight,
      hand_temperature,
      head_temperature,
      pulse,
      oxygen,
      bmi,
      bmi_scale,
      bmr,
      body_fat,
      body_fat_index,
      lean_muscle_mass,
      symptoms,
      predicted_prognosis,
      prescription_done,
      medicines,
      diagnosis,
      remarks,
    });
    const saveData = await newData.save();
    res.json({ code: "0" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

router.patch("/uploadprescription", async (req, res) => {
  const { uid } = req.body.uid;
  // console.log(req.body);
  const query = { remarks: req.body.remarks.prescriptionData };
  try {
    if (uid && uid.length == 8) {
      console.log(uid);
      const users = await User.findOne({ uid });
      if (users) {
        const updateData = await Data.updateOne({ uid }, query);
        console.log(updateData);
        res.json(updateData);
      } else {
        res.json({ error: "user not found" });
      }
    } else {
      res.json({ error: "enter a valid phone number" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/uploaddiagnosis", async (req, res) => {
  const { uid } = req.body.uid;
  // console.log(req.body.diagnosis);
  const query = { diagnosis: req.body.diagnosis.diagnosisData };
  try {
    if (uid && uid.length == 8) {
      const users = await User.findOne({ uid });
      if (users) {
        const updateData = await Data.updateOne({ uid }, query);
        console.log(updateData);
        res.json(updateData);
      } else {
        res.json({ error: "user not found" });
      }
    } else {
      res.json({ error: "enter a valid phone number" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/uploadMedicine", async (req, res) => {
  const { uid } = req.body.uid;
  const query = { medicines: req.body.medicines.medicineData, prescription_done: req.body.prescription_done };
  try {
    if (uid && uid.length == 8) {
      const users = await User.findOne({ uid });
      if (users) {
        const updateData = await Data.updateOne({ uid }, query);
        console.log(updateData);
        res.json(updateData);
      } else {
        res.json({ error: "user not found" });
      }
    } else {
      res.json({ error: "enter a valid phone number" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
