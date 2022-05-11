import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import storeManager from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//#region OldPages
//#endregion
//#region AdminPages
import AdminProfile from "./screens/admin/AdminProfile";
import AdminLayout from "./components/layout/AdminLayout";
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
import SellerComments from "./screens/seller/SellerComments";
import SellerOrders from "./screens/seller/SellerOrders";
import SellerCommentReplies from "./screens/seller/SellerCommentReplies";
import SellerProducts from "./screens/seller/SellerProducts";
import SellerProfile from "./screens/seller/SellerProfile";
import SellerLayout from "./components/layout/SellerLayout";
//#endregion
//#region StorePages
import StoreSingleProduct from "./screens/store/StoreSingleProduct";
import StoreProducts from "./screens/store/StoreProducts";
import StoreLayout from "./components/layout/StoreLayout";
import StoreMain from "./screens/store/StoreMain";
import AdminMain from "./screens/admin/AdminMain";
import Cart from "./screens/store/Cart";
//#endregion
import LogIn from "./screens/common/LogIn";
import Register from "./screens/common/Register";

import Profile from "./screens/admin/AdminProfile";
import HomeScreen from "./screens/common/HomeScreen";
import AdminWelcome from "./components/admin/AdminWelcome";

ReactDOM.render(
	<Provider store={storeManager.createStore()}>
		<PersistGate loading={false} persistor={storeManager.persistor}>
			<BrowserRouter>
				<Routes>
					<Route path="" element={<HomeScreen />} />

					{/* LOGIN / REGISTER */}
					<Route path="login" element={<LogIn />} />
					<Route path="register" element={<Register />} />

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
					</Route>

					{/* STORE SIDE */}
					<Route path="store" element={<StoreLayout />}>
						<Route path="" element={<StoreMain />} />
						<Route path="category=:id" element={<StoreProducts />} />
						<Route path="product=:id" element={<StoreSingleProduct />}>
							<Route path="comments" element={<div>Comments</div>} />
						</Route>
						<Route path="profile" element={<Profile />}>
							<Route path="orders" element={<Profile />} />
							<Route path="comments" element={<Profile />} />
						</Route>
						<Route path="cart" element={<Cart />} />
					</Route>

					{/* SELLER SIDE */}
					<Route path="seller" element={<SellerLayout />}>
						<Route path="profile" element={<SellerProfile />} />
						<Route path="products" element={<SellerProducts />} />
						<Route path="orders" element={<SellerOrders />} />
						<Route path="comments" element={<SellerComments />} />
						<Route path="commentReplies" element={<SellerCommentReplies />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
