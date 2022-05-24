import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import storeManager from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

//#region AdminPages
import AdminMain from "./screens/admin/AdminMain";
import AdminWelcome from "./components/admin/AdminWelcome";
import AdminProfile from "./screens/admin/AdminProfile";
import AdminCategories from "./screens/admin/AdminCategories";
import AdminComments from "./screens/admin/AdminComments";
import AdminCommentReplies from "./screens/admin/AdminCommentReplies";
import AdminLikes from "./screens/admin/AdminLikes";
import AdminOrders from "./screens/admin/AdminOrders";
import AdminProducts from "./screens/admin/AdminProducts";
import AdminSellers from "./screens/admin/AdminSellers";
import AdminUsers from "./screens/admin/AdminUsers";
//#endregion
//#region SellerPages
import SellerMain from "./screens/seller/SellerMain";
import SellerWelcome from "./components/seller/SellerWelcome";
import SellerProducts from "./screens/seller/SellerProducts";
import SellerOrders from "./screens/seller/SellerOrders";
import SellerComments from "./screens/seller/SellerComments";
import SellerCommentReplies from "./screens/seller/SellerCommentReplies";
import SellerProfile from "./screens/seller/SellerProfile";
//#endregion
//#region StorePages
import StoreMain from "./screens/store/StoreMain";
import StoreWelcomePage from "./components/store/StoreWelcomePage";
import StoreProductsByCategory from "./screens/store/StoreProductsByCategory";
import StoreSingleProduct from "./screens/store/StoreSingleProduct";
//#endregion
//#region CommonPages
import LogIn from "./screens/common/LogIn";
import Register from "./screens/common/Register";
import ProfilePage from "./components/common/ProfilePage";
import HomeScreen from "./screens/common/HomeScreen";
import StoreProfile from "./screens/store/StoreProfile";
import NotFound from "./components/common/NotFound";
import StoreProfileCart from "./screens/store/StoreProfileCart";
import StoreProfileComments from "./screens/store/StoreProfileComments";
import StoreProfileAuth from "./screens/store/StoreProfileAuth";
import StoreProductList from "./screens/store/StoreProductList";
import StoreProfileOrders from "./screens/store/StoreProfileOrders";
import SellerSingleProduct from "./screens/seller/SellerSingleProduct";
import StoreAboutUs from "./screens/store/StoreAboutUs";
//#endregion

ReactDOM.render(
	<Provider store={storeManager.createStore()}>
		<PersistGate loading={false} persistor={storeManager.persistor}>
			<BrowserRouter>
				<Routes>
					<Route path="" element={<HomeScreen />} />

					{/* LOGIN / REGISTER */}
					<Route path="login" element={<LogIn />} />
					<Route path="register" element={<Register />} />
					<Route path="profile" element={<ProfilePage />} />

					{/* ADMIN SIDE */}
					<Route path="admin" element={<AdminMain />}>
						<Route path="" element={<AdminWelcome />} />
						<Route path="categories" element={<AdminCategories />} />
						<Route path="comments" element={<AdminComments />} />
						<Route path="commentReplies" element={<AdminCommentReplies />} />
						<Route path="likes" element={<AdminLikes />} />
						<Route path="orders" element={<AdminOrders />} />
						<Route path="products" element={<AdminProducts />} />
						<Route path="sellers" element={<AdminSellers />} />
						<Route path="users" element={<AdminUsers />} />
						<Route path="profile" element={<AdminProfile />} />
						<Route path="*" element={<NotFound siteFront={"Admin"} />} />
					</Route>

					{/* STORE SIDE */}
					<Route path="store" element={<StoreMain />}>
						<Route path="" element={<StoreWelcomePage />} />
						<Route path="category/:id" element={<StoreProductsByCategory />} />
						<Route path="products/:searchWord" element={<StoreProductList />} />
						<Route path="products" element={<StoreProductList />} />
						<Route path="product/:id" element={<StoreSingleProduct />}>
							<Route path="comments" element={<div>Comments</div>} />
						</Route>
						<Route path="profile/:id" element={<StoreProfile />} />
						<Route path="profile/:id" element={<StoreProfileAuth />}>
							<Route path="cart" element={<StoreProfileCart />} />
							<Route path="orders" element={<StoreProfileOrders />} />
							<Route path="comments" element={<StoreProfileComments />} />
						</Route>
						<Route path="aboutus" element={<StoreAboutUs />} />
						<Route path="*" element={<NotFound siteFront={"Store"} />} />
					</Route>

					{/* SELLER SIDE */}
					<Route path="seller" element={<SellerMain />}>
						<Route path="" element={<SellerWelcome />} />
						<Route path="profile" element={<SellerProfile />} />
						<Route path="product/:id" element={<SellerSingleProduct />} />
						<Route path="products" element={<SellerProducts />} />
						<Route path="orders" element={<SellerOrders />} />
						{/* <Route path="comments" element={<SellerComments />} /> */}
						<Route path="commentReplies" element={<SellerCommentReplies />} />
						<Route path="*" element={<NotFound siteFront={"Seller"} />} />
					</Route>
					<Route path="*" element={<NotFound siteFront={"None"} noNav={false} />} />
				</Routes>
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
				/>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
