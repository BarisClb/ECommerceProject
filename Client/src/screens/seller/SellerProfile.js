import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "../../components/common/ProfilePage";
import { commonActions } from "../../store/actions";
import { sellerActions } from "../../store/actions/sellerActions";

function SellerProfile() {
	// Data
	const seller = useSelector((state) => state.account.seller);
	const sellerAccount = useSelector((state) => state.seller.singleSeller);
	useEffect(() => {
		if (
			commonActions.objectIsNullOrUndefined(sellerAccount) ||
			commonActions.objectIsEmpty(sellerAccount) ||
			seller.id !== sellerAccount.id
		) {
			dispatch(sellerActions.getSellers(seller.id));
		}
	}, []);

	const dispatch = useDispatch();
	const updateSeller = (updatedSeller) => {
		dispatch(
			sellerActions.updateSeller(seller.id, updatedSeller, sellerActions.getSellers(seller.id))
		);
	};

	return (
		<>
			<ProfilePage
				account={sellerAccount}
				accountType={"Seller"}
				updateAction={updateSeller}
				editPermission={true}
			/>
		</>
	);
}

export default SellerProfile;
