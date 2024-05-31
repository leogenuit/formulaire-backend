require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Mailgun = require("mailgun.js");
const formData = require("form-data");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "leo genuit",
  key: process.env.API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { firstname, lastname, email, message } = req.body;
    const mailData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: process.env.EMAIL,
      subject: "Formulaire JS",
      text: message,
    };
    const response = await mg.messages.create(process.env.DOMAIN, mailData);
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
