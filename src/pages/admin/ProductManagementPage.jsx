import AdminLayout from "@/components/layout/AdminLayout";
import { IoAdd } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ProductManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams([]);
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [productName, setProductsName] = useState();
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };

  const handleDeleteProduct = async () => {
    const shouldDelete = confirm(
      `are you sure you want to delete ${selectedProductIds.length} this product? `
    );
    if (!shouldDelete) return;

    const deletePromises = selectedProductIds.map((productId) => {
      return axiosInstance.delete("/products/" + productId);
    });
    try {
      await Promise.all(deletePromises);

      alert(`Succesfully deleted ${selectedProductIds.length} products! `);
      setSelectedProductIds([]);

      searchParams.set("page", Number(1));
      setSearchParams(searchParams);
    } catch (err) {
      console.log(err);
    }
  };

  const searchProduct = () => {
    if (productName) {
      searchParams.set("search", productName);

      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          name: searchParams.get("search"), //kalau ini kosong, dia akan gak nge-filter by name
        },
      });
      console.log(response.data);

      setHasNextPage(Boolean(response.data.next));
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnCheckedProduct = (productId, checked) => {
    if (checked) {
      const prevSelectedProductIds = [...selectedProductIds];
      prevSelectedProductIds.push(productId);

      setSelectedProductIds(prevSelectedProductIds);
    } else {
      const productIdIndex = selectedProductIds.findIndex((id) => {
        return id == productId;
      });

      const prevSelectedProductIds = [...selectedProductIds];
      prevSelectedProductIds.splice(productIdIndex, 1);

      setSelectedProductIds(prevSelectedProductIds);
    }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <AdminLayout
      title="Product Management"
      description="Managing our products"
      rightSection={
        <div className="flex gap-2">
          {selectedProductIds.length ? (
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete {selectedProductIds.length} Products
            </Button>
          ) : null}

          <Link to="/admin/products/create">
            <Button variant="secondary">
              <IoAdd className="h-6 w-6 mr-2 " />
              Add Product
            </Button>
          </Link>
        </div>
      }
    >
      <div className="mb-7 items-center">
        <Label>Search Product Name</Label>
        <div className="flex gap-4">
          <Input
            value={productName}
            onChange={(e) => setProductsName(e.target.value)}
            className="max-w-[400px] max-h-[700px] font-light"
            placeholder="search products....."
          />
          <Button onClick={searchProduct} variant="secondary">
            {" "}
            Search
          </Button>
        </div>
      </div>

      <Table className="p-4 border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    onCheckedChange={(checked) =>
                      handleOnCheckedProduct(product.id, checked)
                    }
                    checked={selectedProductIds.includes(product.id)}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  Rp {product.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Link to={"/admin/products/edit/" + product.id}>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-6 h-6" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={searchParams.get("page") == 1}
              onClick={handlePrevPage}
              variant="ghost"
            >
              <ChevronLeft className="w-6 h-6 mr-2" /> Previous
            </Button>
          </PaginationItem>
          <PaginationItem className="mx-10 font-semibold">
            Page {searchParams.get("page")}
          </PaginationItem>

          <PaginationItem>
            <Button
              disabled={!hasNextPage}
              onClick={handleNextPage}
              variant="ghost"
            >
              Next <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </AdminLayout>
  );
};

export default ProductManagementPage;
