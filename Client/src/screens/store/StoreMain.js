import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import StoreLayout from "../../components/layout/StoreLayout";
import { commonActions } from "../../store/actions";
import { accountActions } from "../../store/actions/accountActions";

function StoreMain() {
	// Profile
	const user = useSelector((state) => state.account.user);
	const seller = useSelector((state) => state.account.seller);

	const [account, setAccount] = useState(
		!commonActions.objectIsEmpty(user) ? user : !commonActions.objectIsEmpty(seller) ? seller : {}
	);
	const [accountType] = useState(!commonActions.objectIsEmpty(account) ? account.accountType : "");

	const dispatch = useDispatch();
	const logOut = () => {
		if (accountType !== "") {
			dispatch(accountActions.accountLogOut(accountType));
			// To refresh the page
			setAccount({});
		}
	};

	useEffect(() => {
		if (!commonActions.objectIsEmpty(user)) {
			dispatch(accountActions.accountVerify("User"));
		}
		if (!commonActions.objectIsEmpty(seller)) {
			dispatch(accountActions.accountVerify("Seller"));
		}
	}, []);

	return (
		<StoreLayout account={account} logOut={logOut}>
			<Outlet />
		</StoreLayout>
	);
}

export default StoreMain;
