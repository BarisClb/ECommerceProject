import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SellerLayout from "../../components/layout/SellerLayout";
import SellerWelcome from "../../components/seller/SellerWelcome";
import { commonActions } from "../../store/actions";
import { accountActions } from "../../store/actions/accountActions";

function SellerMain() {
	const dispatch = useDispatch();

	const accountSeller = useSelector((state) => state.account.seller);
	const accountRoles = accountSeller.roles;
	useEffect(() => {
		dispatch(accountActions.accountVerify("Seller"));
	}, []);

	return (
		<SellerLayout>
			{(accountSeller && commonActions.objectIsEmpty(accountSeller)) ||
			(accountRoles && !accountRoles.includes("Seller")) ? (
				<SellerWelcome />
			) : (
				<Outlet />
			)}
		</SellerLayout>
	);
}

export default SellerMain;
