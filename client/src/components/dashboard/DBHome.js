import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { CChart } from "@coreui/react-chartjs";

import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";

export default function DBHome() {
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders);

  const ourspecial = products?.filter(
    (item) => item.product_category === "ourspecial"
  );
  const salad = products?.filter((item) => item.product_category === "salad");
  const mainCours = products?.filter(
    (item) => item.product_category === "mainCours"
  );
  const appetizer = products?.filter(
    (item) => item.product_category === "appetizer"
  );
  const sandwich = products?.filter(
    (item) => item.product_category === "sandwich"
  );
  const vegetarian = products?.filter(
    (item) => item.product_category === "vegetarian"
  );
  const seafood = products?.filter(
    (item) => item.product_category === "seafood"
  );
  const dessert = products?.filter(
    (item) => item.product_category === "dessert"
  );
  const drink = products?.filter((item) => item.product_category === "drink");
  const side = products?.filter((item) => item.product_category === "side");

  // orders
  const delivered = orders?.filter((item) => item.sts === "delivered");
  const cancelled = orders?.filter((item) => item.sts === "cancelled");
  const preparing = orders?.filter((item) => item.sts === "preparing");
  const paid = orders?.filter((item) => item.status === "paid");
  const notpaid = orders?.filter((item) => item.status === "not paid");

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <Fade bottom>
          <div className="flex items-center justify-center">
            <div className=" w-340 md:w-508 bg-seagull-100 p-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <CChart
                type="bar"
                data={{
                  labels: [
                    "Our Specials",
                    "Salads",
                    "Main Courses",
                    "Appetizers",
                    "Sandwiches",
                    "Vegetarian Options",
                    "Seafood Platters",
                    "Sides",
                    "Desserts",
                    "Drinks",
                  ],
                  datasets: [
                    {
                      label: "Categorii produse",
                      backgroundColor: "#34c4d1",
                      data: [
                        ourspecial?.length,
                        salad?.length,
                        mainCours?.length,
                        appetizer?.length,
                        sandwich?.length,
                        vegetarian?.length,
                        seafood?.length,
                        side?.length,
                        dessert?.length,
                        drink?.length,
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Fade>
        <Bounce>
          <div className="w-full h-full flex items-center justify-center">
            <div className=" w-275 md:w-460 bg-seagull-100 p-12 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
              <CChart
                type="doughnut"
                data={{
                  labels: [
                    "Comenzi",
                    "Livrate",
                    "Anulate",
                    "Pregătire",
                    "Plătit",
                    "Neplătit",
                  ],
                  datasets: [
                    {
                      backgroundColor: [
                        "#ebed7b",
                        "#89e05e",
                        "#d13456",
                        "#e0925e",
                        "#34d1c1",
                        "#ac34d1",
                      ],
                      data: [
                        orders?.length,
                        delivered?.length,
                        cancelled?.length,
                        preparing?.length,
                        paid?.length,
                        notpaid?.length,
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </Bounce>
      </div>
    </div>
  );
}
