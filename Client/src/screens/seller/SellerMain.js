import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SellerLayout from "../../components/layout/SellerLayout";
import SellerWelcome from "../../components/seller/SellerWelcome";
import { commonActions } from "../../store/actions";
import { accountActions } from "../../store/actions/accountActions";

function SellerMain() {
	const dispatch = useDispatch();

	const seller = useSelector((state) => state.account.seller);
	const accountRoles = seller.roles;
	useEffect(() => {
		if (!commonActions.objectIsEmpty(seller)) {
			dispatch(accountActions.accountVerify("Seller"));
		}
	}, []);

	return (
		<SellerLayout>
			{(seller && commonActions.objectIsEmpty(seller)) ||
			(accountRoles && !accountRoles.includes("Seller")) ? (
				<SellerWelcome />
			) : (
				<Outlet />
			)}
		</SellerLayout>
	);
}

export default SellerMain;
