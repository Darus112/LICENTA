import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import { getAllOrders } from "../api";

import Navbar from "../components/Navbar";

import { setOrders } from "../context/actions/ordersActions";

import NoUserOrders from "../assets/Img/no_user_orders.png";
import OrderData from "../components/OrderData";

export default function Orders() {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!userOrders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(data.filter((item) => item.userId === user?.user_id));
      });
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.user_id));
    }
  }, [userOrders]);

  return (
    <>
      <main
        className="w-screen min-h-screen flex items-center flex-col
      bg-ordersBg bg-fixed bg-no-repeat bg-cover bg-center"
      >
        <Navbar />
        <Fade>
          <div
            className="w-full flex flex-col items-center justify-center my-40
      px-6 md:px-24 2xl:px-96
      "
          >
            <div
              className="flex items-center justify-center flex-col pt-11 w-full gap-4
            backdrop-blur-sm bg-seagull-800 bg-opacity-25 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-11 rounded-xl"
            >
              {userOrders?.length > 0 ? (
                <>
                  {userOrders.reverse().map((item, i) => (
                    <OrderData key={i} index={i} data={item} admin={false} />
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center flex-col w-full h-full">
                  <img src={NoUserOrders} className=" drop-shadow-lg" />
                  <p className="text-3xl font-body text-[#ff7f66] font-medium drop-shadow-lg">
                    Nu ai plasat nicio comanda.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Fade>
      </main>
    </>
  );
}
