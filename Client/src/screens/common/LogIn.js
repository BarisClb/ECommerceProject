import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigation from "../../components/auth/AuthNavigation";
import LogInForm from "../../components/auth/LogInForm";
import MainLayout from "../../components/layout/MainLayout";
import { commonActions } from "../../store/actions";
import { accountActions } from "../../store/actions/accountActions";
import "./css/index.css";

function LogIn() {
	const user = useSelector((state) => state.account.user);
	const seller = useSelector((state) => state.account.seller);

	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [sellerLoggedIn, setSellerLoggedIn] = useState(false);

	const dispatch = useDispatch();
	const logOut = () => {
		if (!commonActions.objectIsNullOrUndefined(user)) {
			if (!commonActions.objectIsEmpty(user)) {
				dispatch(accountActions.accountLogOut("User"));
				setUserLoggedIn(false);
			}
		}
		if (!commonActions.objectIsNullOrUndefined(seller)) {
			if (!commonActions.objectIsEmpty(seller)) {
				dispatch(accountActions.accountLogOut("Seller"));
				setSellerLoggedIn(false);
			}
		}
	};

	useEffect(() => {
		if (!commonActions.objectIsNullOrUndefined(user)) {
			if (!commonActions.objectIsEmpty(user)) {
				setUserLoggedIn(true);
			}
		}
		if (!commonActions.objectIsNullOrUndefined(seller)) {
			if (!commonActions.objectIsEmpty(seller)) {
				setSellerLoggedIn(true);
			}
		} else {
			setUserLoggedIn(false);
			setSellerLoggedIn(false);
		}
	}, []);
	useEffect(() => {
		if (!commonActions.objectIsNullOrUndefined(user)) {
			if (!commonActions.objectIsEmpty(user)) {
				setUserLoggedIn(true);
			} else {
				setUserLoggedIn(false);
			}
		}
		if (!commonActions.objectIsNullOrUndefined(seller)) {
			if (!commonActions.objectIsEmpty(seller)) {
				setSellerLoggedIn(true);
			} else {
				setSellerLoggedIn(false);
			}
		} else {
			setUserLoggedIn(false);
			setSellerLoggedIn(false);
		}
	}, [user, seller]);

	return (
		<MainLayout>
			<div id="login-form-wrapper">
				{userLoggedIn || sellerLoggedIn ? (
					<AuthNavigation user={user} seller={seller} logOut={logOut} />
				) : (
					<LogInForm />
				)}
			</div>
		</MainLayout>
	);
}

export default LogIn;
