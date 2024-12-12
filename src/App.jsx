import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductpage";
import CounterPage from "./pages/CounterPage";

function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}

      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/product/:productId" Component={ProductDetailPage} />
        <Route path="/counter" Component={CounterPage}></Route>

        <Route path="/admin">
          <Route path="products" Component={ProductManagementPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>

        <Route path="*" Component={NotFoundPage} />
      </Routes>

      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}
export default App;
