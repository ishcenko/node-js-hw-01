import contactsService from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.log(allContacts);
      break;

    case "get":
      const selectedContacts = await contactsService.getContactById(id);
      return console.log(selectedContacts);
      break;

    case "add":
      const addNewContact = await contactsService.addContact(
        name,
        email,
        phone
      );
      return console.log(addNewContact);
      break;

    case "remove":
      const removeContactsId = await contactsService.removeContact(id);
      return console.log(removeContactsId);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
