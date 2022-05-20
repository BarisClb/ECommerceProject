import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import Unauthorized from "../../components/common/UnauthorizedPage";

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
				<Unauthorized />
			)}
		</>
	);
}

export default StoreProfileAuth;
