const mongoose = require("mongoose");

const [, , password, name, number] = process.argv;

if (!password) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const url = `mongodb+srv://fullstack:${password}@cluster0.scikr.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name,
  number,
});

if (!(name && number)) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((each) => {
      console.log(`${each.name} ${each.number}`);
    });
    mongoose.connection.close();
  });
} else if (!name || !number) {
  console.log("name or number missing");
  exit(1);
} else if (name && number) {
  person.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
