import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import storeManager from "./store/index";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import Deneme from "./screens/Deneme";
import Products from "./screens/Products";
import Categories from "./screens/Categories";
import AdminCategories from "./screens/admin/AdminCategories";
import Cart from "./screens/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AdminLikes from "./screens/admin/AdminLikes";

ReactDOM.render(
	<Provider store={storeManager.createStore()}>
		<PersistGate loading={false} persistor={storeManager.persistor}>
			<BrowserRouter>
				<Routes>
					{/* WORKSPACE */}
					<Route path="/" element={<HomeScreen />} />
					<Route path="/Categories" element={<Categories />} />
					<Route path="/Products" element={<Products />} />
					<Route path="/Cart" element={<Cart />} />
					<Route path="/Deneme" element={<Deneme />} />
					<Route path="/Profile" element={<Profile />} />

					{/* ADMIN SIDE */}
					<Route path="/Admin" element={<HomeScreen />} />
					<Route path="/Admin/Categories" element={<AdminCategories />} />
					<Route path="/Admin/Products" element={<HomeScreen />} />
					<Route path="/Admin/Comments" element={<HomeScreen />} />
					<Route path="/Admin/CommentReplies" element={<HomeScreen />} />
					<Route path="/Admin/Likes" element={<AdminLikes />} />
					<Route path="/Admin/Users" element={<HomeScreen />} />
					<Route path="/Admin/Sellers" element={<HomeScreen />} />

					{/* SELLER SIDE */}
					<Route path="/Seller" element={<Profile />} />
					<Route path="/Seller/Profile" element={<Profile />} />
					<Route path="/Seller/Products" element={<Products />} />
					<Route path="/Seller/Orders" element={<Products />} />
					<Route path="/Seller/Comments" element={<Products />} />
					<Route path="/Seller/CommentReplies" element={<Products />} />

					{/* STORE SIDE */}
					<Route path="/Store" element={<HomeScreen />} />
					<Route path="/Store/Products" element={<Products />} />
					<Route path="/Store/Products/:id" element={<Products />} />
					<Route
						path="/Store/Products/:id/Comments"
						element={<Products />}
					/>
					<Route path="/Store/Cart" element={<Cart />} />
					<Route path="/Store/Profile" element={<Profile />} />
					<Route path="/Store/Profile/Orders" element={<Profile />} />
					<Route path="/Store/Profile/Coments" element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
