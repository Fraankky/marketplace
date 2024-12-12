import { AdminLayout } from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/forms/ProductForm";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (values) => {
    try {
      await axiosInstance.post("/products", {
        name: values.name,
        price: values.price,
        stock: values.stock,
        imageUrl: values.imageUrl,
      });

      alert("Product Created");

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout title="Create Products" description="Add new products">
      <ProductForm cardTitle="Create Product" onSubmit={handleCreateProduct} />
    </AdminLayout>
  );
};

export default CreateProductPage;
