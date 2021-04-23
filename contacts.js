const path = require("path");
const fs = require("fs");
const shortid = require("shortid");

//  Раскомментируй и запиши значение

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию

// Separeted function for getting contacts list
function getContactsData() {
  try {
    const data = fs.readFileSync(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
}

// ---Getting contact list in console
async function listContacts() {
  console.table(getContactsData());
}

// ---Getting contact by ID
async function getContactById(id) {
  const contacts = getContactsData();
  const contact = contacts.find((con) => con.id === Number(id));
  console.log(contact);
}

// ---Removing contact
async function removeContact(id) {
  const contacts = getContactsData();
  const deletedContact = contacts.find((cont) => cont.id === Number(id));
  if (!deletedContact) {
    console.log(`There is no contact with ID: ${id}`);
    return;
  }
  console.log(`///Deleted contact:`);
  console.log(deletedContact);
  const newContacts = contacts.filter((contact) => contact.id !== Number(id));
  fs.writeFile(contactsPath, JSON.stringify(newContacts, null, "\t"), (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(`///New contacts:`);

    console.table(newContacts);
  });
}

// ---Adding contact to contacts list
async function addContact(name, email, phone) {
  const contacts = getContactsData();

  // Adding new contact to contacts list -------------------
  contacts.push({ id: shortid.generate(), name, email, phone });
  // -----------------------
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"), (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(`///New contacts:`);
    console.table(contacts);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
