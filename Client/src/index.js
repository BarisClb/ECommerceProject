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
import Cart from "./screens/Cart";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
	<Provider store={storeManager.createStore()}>
		<PersistGate loading={false} persistor={storeManager.persistor}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/Products" element={<Products />} />
					<Route path="/Categories" element={<Categories />} />
					<Route path="/Cart" element={<Cart />} />
					<Route path="/Deneme" element={<Deneme />} />
				</Routes>
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
