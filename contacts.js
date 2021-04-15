const path = require("path");
const fs = require("fs");
//  Раскомментируй и запиши значение

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
// ---Getting contact list
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

// ---Getting contact by ID
function getContactById(id) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((con) => con.id === Number(id));
    console.log(contact);
  });
}

// ---Removing contact
function removeContact(id) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    const deletedContact = contacts.find((cont) => cont.id === Number(id));
    if (!deletedContact) {
      console.log(`There is no contact with ID: ${id}`);
      return;
    }
    console.log(`///Deleted contact:`);
    console.log(deletedContact);
    const newContacts = contacts.filter((contact) => contact.id !== id);
    fs.writeFile(
      contactsPath,
      JSON.stringify(newContacts, null, "\t"),
      (err) => {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log(`///New contacts:`);

        console.table(newContacts);
      }
    );
  });
}

// ---Adding contact to contacts list
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    // Generating a new ID ---------------------
    const ids = contacts.map((c) => c.id);
    let maxId = ids[0];
    for (i = 0; i < ids.length; ++i) {
      if (ids[i] > maxId) {
        maxId = ids[i];
      }
    }
    const newId = maxId + 1;
    // Adding new contact to contacts list -------------------
    contacts.push({ id: newId, name, email, phone });
    // -----------------------
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"), (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log(`///New contacts:`);
      console.table(contacts);
    });
  });
}

// console.log(listContacts());
// function listContacts() {
//   fs.readFile(contactsPath, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     return data;
//   });
// }

// console.log(listContacts());

module.exports = { listContacts, getContactById, removeContact, addContact };
