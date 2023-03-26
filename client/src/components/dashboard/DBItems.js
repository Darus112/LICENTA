import React from "react";
import DataTable from "../DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../api";
import { setAllProducts } from "../../context/actions/productActions";
import { alertNULL, alertSucces } from "../../context/actions/alertActions";

export default function DBItems() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center gap-4 pt-6  mt-28">
      <DataTable
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-32 h-16 object-contain rounded-lg shadow-lg"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="font-body text-base flex items-center justify-center">
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
        title="List of products"
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert("You want to edit " + rowData.product_name);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              if (
                window.confirm(
                  "Are you sure, do you want to perform this action"
                )
              ) {
                deleteProduct(rowData.productId).then((res) => {
                  dispatch(alertSucces("Product deleted"));
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
