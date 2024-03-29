import React, { useState } from "react";

import { motion } from "framer-motion";

import { IoBasket } from "react-icons/io5";
import { buttonClick, slideIn } from "../animation";
import { addNewItemToCart, getAllCartItems } from "../api";

import { useDispatch, useSelector } from "react-redux";
import { alertNULL, alertSucces } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartActions";

import { BiFoodMenu } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";

export default function SliderCard({ data, index }) {
  // Selectăm datele utilizatorului din starea globală (Redux store)
  const user = useSelector((state) => state.user);
  // Inițializăm metoda dispatch pentru a actualiza starea globală
  const dispatch = useDispatch();
  // Starea locală pentru a afișa sau ascunde ingredientele produsului
  const [showIngredients, setShowIngredients] = useState(false);
  //Funcție pentru a adăuga produsul în coșul de cumpărături
  const sendToCart = () => {
    //Adăugăm noul produs în coșul de cumpărături pentru utilizatorul curent
    addNewItemToCart(user?.user_id, data).then((res) => {
      // După ce produsul a fost adăugat, obținem toate produsele din coșul de cumpărături
      getAllCartItems(user?.user_id).then((items) => {
        console.log(items);
        // Actualizăm starea globală cu noile produse din coșul de cumpărături
        dispatch(setCartItems(items));
      });
      // Afișăm un mesaj de succes utilizatorului
      dispatch(alertSucces("Adăugat în coș"));
      // Ascundem mesajul de succes după 3 secunde
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-seagull-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] 
    rounded-xl flex items-center justify-between relative px-5 py-5 h-[180px]
    min-w-350 md:w-340 md:min-w-350 gap-3 mx-3 my-3 border-[2px] border-seagull-200"
    >
      {showIngredients ? (
        <motion.div
          {...slideIn}
          className="flex flex-col items-center justify-center w-full"
        >
          <BsCardList className="text-seagull-900 mb-2" />

          <div className="font-food text-xs font-bold text-seagull-900 border-t-2 border-b-2 rounded-md p-4 shadow-lg capitalize">
            {data.ingredients}
          </div>
        </motion.div>
      ) : (
        <>
          <img
            src={data.imageURL}
            className="w-40 object-contain shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        rounded-xl border-[2px] border-seagull-200"
            alt=""
          />
          <div className="relative pt-5 pl-2">
            <p className="font-food text-xl font-semibold text-seagull-900">
              {data.product_name}
            </p>
            <p
              className="font-food text-base font-semibold text-seagull-300
          drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            >
              <span className="text-xs text-seagull-200">RON</span>{" "}
              {parseFloat(data.product_price).toFixed(2)}
            </p>
          </div>
        </>
      )}
      <motion.div
        {...buttonClick}
        onClick={() => sendToCart()}
        className="w-7 h-7 rounded-full flex items-center justify-center
          absolute top-2 right-2 cursor-pointer border-none outline-none
           bg-gradient-to-tr from-seagull-300 to-[#a4e6fa] hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <IoBasket className="text-lg text-seagull-50" />
      </motion.div>
      <motion.div
        {...buttonClick}
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowIngredients(!showIngredients)}
        className="absolute bottom-2 right-2 flex font-food text-xs font-semibold text-seagull-600 cursor-pointer
         items-center justify-center drop-shadow-lg"
      >
        <BiFoodMenu />
        Ingrediente
      </motion.div>
    </motion.div>
  );
}
