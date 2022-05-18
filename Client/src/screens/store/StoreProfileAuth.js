import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import StoreUnauthorized from "../../components/store/StoreUnauthorized";

function StoreProfileAuth() {
	const account = useSelector((state) => state.account.user);
	const { id } = useParams();

	const [auth, setAuth] = useState(account.id && account.id === parseInt(id) ? true : false);

	const accessDenied = () => {
		setAuth(false);
	};

	return (
		<>
			{auth ? (
				<Outlet
					accessDenied={accessDenied}
					permission={account.id && account.id === id ? true : false}
				/>
			) : (
				<StoreUnauthorized />
			)}
		</>
	);
}

export default StoreProfileAuth;
