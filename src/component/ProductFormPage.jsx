import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import {useProducts} from "../component/DashboardAdmin/ContextProduct";

export default function ProductFormPage() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  return (
    <ProductForm
      onSubmit={addProduct}
      onClose={() => navigate("/admin")}
    />
  );
}
