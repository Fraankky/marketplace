import { ProductForm } from "@/forms/ProductForm";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

const EditProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    imageUrl: "",
    id: 0,
  });

  const params = useParams();
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/" + params.productId);
      setProduct(response.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const HandleEditProduct = async (values) => {
    try {
      await axiosInstance.patch("/products/" + params.productId, {
        name: values.name,
        price: values.price,
        stock: values.stock,
        imageUrl: values.imageUrl,
      });
      alert("Product edited");

      Navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout title="Edit Product" description="Editing product">
      {product.id ? (
        <ProductForm
          cardTitle={"Editing " + product.name}
          onSubmit={HandleEditProduct}
          defaultName={product.name}
          defaultPrice={product.price}
          defaultStock={product.stock}
          defaultImageUrl={product.imageUrl}
        />
      ) : null}
    </AdminLayout>
  );
};

export default EditProductPage;
