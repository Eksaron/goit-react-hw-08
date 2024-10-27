import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const search = useSelector(selectNameFilter);

  return (
    <>
      <p>
        <b>ContactList:</b> ({contacts?.length}) of {search}
      </p>

      <ul>
        {contacts?.map((item) => (
          <Contact key={item.id} contact={item} />
        ))}
      </ul>
    </>
  );
};

export default ContactList;
