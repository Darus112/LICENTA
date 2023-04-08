import React from "react";
import { Routes, Route } from "react-router-dom";
import Fade from "react-reveal/Fade";

import DBHeader from "./DBHeader";
import DBHome from "./DBHome";
import DBOrders from "./DBOrders";
import DBItems from "./DBItems";
import DBNewItem from "./DBNewItem";
import DBUsers from "./DBUsers";
import DBContacts from "./DBContacts";

export default function DBRightSection() {
  return (
    <div className="flex flex-col py-12 px-12 flex-1 h-full ">
      <Fade right>
        <DBHeader />
      </Fade>
      <div className="flex items-center px-3 flex-col flex-1 overflow-y-scroll scrollbar-none ">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newItem" element={<DBNewItem />} />
          <Route path="/users" element={<DBUsers />} />
          <Route path="/contacts" element={<DBContacts />} />
        </Routes>
      </div>
    </div>
  );
}
