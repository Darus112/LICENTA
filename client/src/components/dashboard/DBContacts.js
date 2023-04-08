import React, { useEffect, useState } from "react";
import ContactData from "../ContactData";
import { useDispatch, useSelector } from "react-redux";

import NoMessage from "../../assets/Img/no_msg.png";
import { getAllContacts } from "../../api";
import { setAllContacts } from "../../context/actions/contactActions";

export default function DBContacts() {
  const contacts = useSelector((state) => state.contacts);

  const dispatch = useDispatch();

  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (!contact) {
      getAllContacts().then((data) => {
        dispatch(setAllContacts(data));
        setContact(contact);
      });
    }
  }, [contact]);

  return (
    <div className="flex items-center justify-start flex-col pt-6 w-full h-full gap-4">
      {contacts?.length > 0 ? (
        <>
          {contacts.reverse().map((item, i) => (
            <ContactData key={i} index={i} data={item} />
          ))}
        </>
      ) : (
        <div className="flex w-full h-full items-center justify-center flex-col">
          <img src={NoMessage} alt="" className=" drop-shadow-lg" />
          <h1 className="text-[55px] font-body font-semibold text-seagull-900 drop-shadow-lg">
            No message received
          </h1>
        </div>
      )}
    </div>
  );
}
