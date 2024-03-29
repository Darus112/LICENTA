import React from "react";
import DataTable from "../DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../api";
import { setAllProducts } from "../../context/actions/productActions";
import { alertNULL, alertSucces } from "../../context/actions/alertActions";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function DBItems() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-self-center gap-4 pt-6 mt-12 py-8">
      <DataTable
        columns={[
          {
            title: "Imagine",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-28 object-contain rounded-lg shadow-lg border-[2px] border-seagull-300"
              />
            ),
          },
          {
            title: "Nume",
            field: "product_name",
            render: (rowData) => (
              <p className="font-body text-lg font-bold text-seagull-900 drop-shadow-lg">
                {rowData.product_name}
              </p>
            ),
          },
          {
            title: "Categorie",
            field: "product_category",
            render: (rowData) => (
              <p className="font-body text-lg font-bold text-[#979eb4] drop-shadow-lg">
                {rowData.product_category}
              </p>
            ),
          },
          {
            title: "Preț",
            field: "product_price",
            render: (rowData) => (
              <p className="font-food text-xl flex items-center justify-center font-semibold drop-shadow-lg">
                <div className="rounded-full bg-seagull-300 p-2 w-10 h-10 flex items-center justify-center mr-2">
                  <span className="font-food font-bold text-seagull-50 text-sm">
                    RON
                  </span>
                </div>
                {parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        title="Lista produselor"
        actions={[
          {
            icon: () => (
              <RiDeleteBin5Line className="text-seagull-900 text-3xl drop-shadow-lg" />
            ),
            tooltip: "Șterge datele",
            onClick: (event, rowData) => {
              if (
                window.confirm(
                  "Sunteți sigur, doriți să efectuați această acțiune?"
                )
              ) {
                deleteProduct(rowData.productId).then((res) => {
                  dispatch(alertSucces("Produs șters"));
                  setInterval(() => {
                    dispatch(alertNULL());
                  }, 3000);
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
}
