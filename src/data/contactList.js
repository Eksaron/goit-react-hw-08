import contactsJsonData from "./contactlist.json";
export const loadContactList = () => {
  try {
    const persist_root_item = localStorage.getItem("persist:root");
    if (persist_root_item === null) {
      return contactsJsonData;
    }

    const persist_root = JSON.parse(persist_root_item);
    const contacts = JSON.parse(persist_root.contacts);
    const items = contacts.items;
    if (contacts && items && items.length > 0) {
      return JSON.parse(persist_root.contacts).items;
    }
    return contactsJsonData;
  } catch (err) {
    return contactsJsonData;
  }
};
