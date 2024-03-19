require("dotenv/config");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Database connection successful.");
  });

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty."],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: String,
  country: {
    type: String,
    required: true,
    default: "Indonesia",
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const CustomerTest = new Customer({
  name: "Falah",
  email: "falah@gmail.com",
  phoneNumber: "08764567",
});

CustomerTest.save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });

app.listen(PORT, () => {
  console.log(`APP running on port : ${PORT}`);
});
