import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNULL,
  alertSucces,
} from "../context/actions/alertActions";
import { addNewContact, getAllContacts } from "../api";
import { setAllContacts } from "../context/actions/contactActions";
import { buttonClick } from "../animation";

import { RiContactsLine } from "react-icons/ri";

import { motion } from "framer-motion";
import DetailsCard from "../components/DetailsCard";

export default function Contact() {
  // Declaram constantele pentru stocarea și actualizarea stărilor
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Accesăm starea alertei din Redux store
  const alert = useSelector((state) => state.alert);

  // Inițializăm funcția de dispatch pentru a trimite acțiuni către Redux store
  const dispatch = useDispatch();

  // Funcția pentru a trimite datele de contact
  const send = () => {
    // Creăm obiectul de date pe care dorim să îl trimitem
    const data = {
      contact_firstName: firstName,
      contact_lastName: lastName,
      contact_email: email,
      contact_subject: subject,
      contact_message: message,
    };

    // Verificăm dacă toate câmpurile sunt completate
    if (!firstName || !lastName || !email || !subject || !message) {
      // Dacă nu, afișăm o alertă
      dispatch(alertDanger("Completează toate câmpurile"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    } else {
      // Dacă toate câmpurile sunt completate, trimitem datele de contact
      addNewContact(data).then((res) => {
        // Afișăm o alertă de succes
        dispatch(alertSucces("Trimis cu succes"));
        // Actualizăm lista de contacte
        getAllContacts().then((data) => {
          dispatch(setAllContacts(data));
        });
        // Golim alerta și toate câmpurile
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        setFirstName("");
        setLastName("");
        setEmail("");
        setSubject("");
        setMessage("");
      });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-generalBg bg-fixed bg-no-repeat bg-cover bg-center">
      <div className="flex items-center justify-center flex-col pt-6 px-24 w-full my-12 mt-40">
        <Fade>
          <div className="w-full flex items-center justify-center mb-20">
            <DetailsCard />
          </div>
        </Fade>
        <div className="mt-12 flex items-center justify-between gap-10 w-full">
          <div
            className="w-[700px] h-[3px] rounded-xl
        bg-gradient-to-r from-seagull-300 to-[#6fdfee]"
          ></div>
          <RiContactsLine className=" text-3xl text-[#6fdfee] drop-shadow-lg" />
          <div
            className="w-[700px] h-[3px] rounded-xl
        bg-gradient-to-l from-seagull-300 to-[#6fdfee]"
          ></div>
        </div>
        <div
          className="w-full flex flex-col items-center gap-12 mt-12
        backdrop-blur-sm bg-seagull-800 bg-opacity-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-11 md:px-36 rounded-xl"
        >
          <div className="flex flex-row w-full gap-x-12">
            <Fade left>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <p className="ml-7 font-body text-seagull-900 font-semibold text-xl">
                  Prenume
                </p>
                <InputValueField
                  type="text"
                  placeHolder={". . ."}
                  stateFunc={setFirstName}
                  stateValue={firstName}
                />
              </div>
            </Fade>
            <Fade right>
              <div className="w-full flex flex-col justify-start items-start">
                <p className="ml-7 font-body text-seagull-900 font-semibold text-xl">
                  Nume
                </p>
                <InputValueField
                  type="text"
                  placeHolder={". . ."}
                  stateFunc={setLastName}
                  stateValue={lastName}
                />
              </div>
            </Fade>
          </div>
          <div className="flex flex-row w-full gap-x-12">
            <Fade left>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <p className="ml-7 font-body text-seagull-900 font-semibold text-xl">
                  Email
                </p>
                <InputValueField
                  type="email"
                  placeHolder={". . ."}
                  stateFunc={setEmail}
                  stateValue={email}
                />
              </div>
            </Fade>
            <Fade right>
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <p className="ml-7 font-body text-seagull-900 font-semibold text-xl">
                  Subiect
                </p>
                <InputValueField
                  type="text"
                  placeHolder={". . ."}
                  stateFunc={setSubject}
                  stateValue={subject}
                />
              </div>
            </Fade>
          </div>
          <Fade bottom>
            <div className="w-full flex flex-col justify-start items-start gap-2">
              <p className="ml-7 font-body text-seagull-900 font-semibold text-xl">
                Mesaj
              </p>
              <TextAreaField
                type="text"
                placeHolder=". . ."
                stateValue={message}
                stateFunc={setMessage}
                rows={4}
                cols={50}
              />
            </div>

            <motion.button
              {...buttonClick}
              className="w-32 py-4 rounded-full bg-gradient-to-tr from-[#5ad5eb] to-[#cdecb2]
        flex items-center justify-center gap-3 shadow-lg hover:shadow-[#81e2f3]"
              onClick={() => send()}
            >
              <p className="font-body font-medium text-lg text-seagull-50">
                Trimite
              </p>
            </motion.button>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
  rows,
  cols,
}) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      className="w-full px-4 py-1 h-16 bg-seagull-300 bg-opacity-80
        shadow-lg outline-none rounded-full border-seagull-100 border 
        focus:border-seagull-200 focus:shadow-seagull-300 font-body font-semibold text-seagull-900"
      rows={rows}
      cols={cols}
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}
    />
  );
};

export const TextAreaField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
  rows,
  cols,
}) => {
  return (
    <textarea
      type={type}
      placeholder={placeHolder}
      className="w-full px-8 py-4 h-52 bg-seagull-300 bg-opacity-80
      shadow-lg outline-none rounded-[2rem] border-seagull-100 border 
      focus:border-seagull-200 focus:shadow-seagull-300 font-body font-semibold text-seagull-900"
      rows={rows}
      cols={cols}
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}
    />
  );
};
