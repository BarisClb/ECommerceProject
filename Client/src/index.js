import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import storeManager from "./store/index";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/admin/Profile";
import Deneme from "./screens/Deneme";
import Products from "./screens/Products";
import Categories from "./screens/Categories";
import AdminCategories from "./screens/admin/AdminCategories";
import Cart from "./screens/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AdminLikes from "./screens/admin/AdminLikes";
import AdminUsers from "./screens/admin/AdminUsers";
import AdminComments from "./screens/admin/AdminComments";
import AdminCommentReplies from "./screens/admin/AdminCommentReplies";
import AdminProducts from "./screens/admin/AdminProducts";
import AdminSellers from "./screens/admin/AdminSellers";
import AdminLayout from "./components/layout/AdminLayout";

ReactDOM.render(
	<Provider store={storeManager.createStore()}>
		<PersistGate loading={false} persistor={storeManager.persistor}>
			<BrowserRouter>
				<Routes>
					{/* WORKSPACE */}
					<Route path="/" element={<HomeScreen />} />
					<Route path="categories" element={<Categories />} />
					<Route path="products" element={<Products />} />
					<Route path="cart" element={<Cart />} />
					<Route path="deneme" element={<Deneme />} />
					<Route path="profile" element={<Profile />} />

					{/* ADMIN SIDE */}
					<Route path="Admin" element={<AdminLayout />}>
						<Route path="categories" element={<AdminCategories />} />
						<Route path="products" element={<AdminProducts />} />
						<Route path="comments" element={<AdminComments />} />
						<Route
							path="CommentReplies"
							element={<AdminCommentReplies />}
						/>
						<Route path="Likes" element={<AdminLikes />} />
						<Route path="Users" element={<AdminUsers />} />
						<Route path="Sellers" element={<AdminSellers />} />
					</Route>

					{/* SELLER SIDE */}
					<Route path="seller" element={<Profile />}>
						<Route path="profile" element={<Profile />} />
						<Route path="products" element={<Products />} />
						<Route path="orders" element={<Products />} />
						<Route path="comments" element={<Products />} />
						<Route path="commentReplies" element={<Products />} />
					</Route>

					{/* STORE SIDE */}
					<Route path="store" element={<HomeScreen />}>
						<Route path="products" element={<Products />}>
							<Route path=":id" element={<Products />}>
								<Route path="comments" element={<Products />} />
							</Route>
						</Route>
						<Route path="cart" element={<Cart />} />
						<Route path="profile" element={<Profile />}>
							<Route path="orders" element={<Profile />} />
							<Route path="comments" element={<Profile />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
