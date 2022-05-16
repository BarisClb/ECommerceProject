import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import storeManager from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
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
import StoreProducts from "./screens/store/StoreProducts";
import StoreSingleProduct from "./screens/store/StoreSingleProduct";
import Cart from "./screens/store/Cart";
//#endregion
//#region CommonPages
import LogIn from "./screens/common/LogIn";
import Register from "./screens/common/Register";
import ProfilePage from "./components/common/ProfilePage";
import HomeScreen from "./screens/common/HomeScreen";
import StoreProfile from "./screens/store/StoreProfile";
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
					</Route>

					{/* STORE SIDE */}
					<Route path="store" element={<StoreMain />}>
						<Route path="" element={<StoreWelcomePage />} />
						<Route path="category=:id" element={<StoreProducts />} />
						<Route path="product=:id" element={<StoreSingleProduct />}>
							<Route path="comments" element={<div>Comments</div>} />
						</Route>
						<Route path="profile/:id" element={<StoreProfile />}>
							<Route path="orders" element={<StoreProfile />} />
							<Route path="comments" element={<StoreProfile />} />
						</Route>
						<Route path="cart" element={<Cart />} />
					</Route>

					{/* SELLER SIDE */}
					<Route path="seller" element={<SellerMain />}>
						<Route path="" element={<SellerWelcome />} />
						<Route path="profile" element={<SellerProfile />} />
						<Route path="products" element={<SellerProducts />} />
						<Route path="orders" element={<SellerOrders />} />
						{/* <Route path="comments" element={<SellerComments />} /> */}
						<Route path="commentReplies" element={<SellerCommentReplies />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
