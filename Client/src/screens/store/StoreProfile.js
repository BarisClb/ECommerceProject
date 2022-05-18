import React, { useEffect } from "react";
import ProfilePage from "../../components/common/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions/userActions";
import { useParams } from "react-router-dom";
import NotFound from "../../components/common/NotFound";
import { commonActions } from "../../store/actions";

function StoreProfile() {
	// Data
	const account = useSelector((state) => state.account.user);
	const user = useSelector((state) => state.user.singleUser);
	const { id } = useParams();
	useEffect(() => {
		if (!commonActions.objectIsNullOrUndefined(user) || !commonActions.objectIsEmpty(user)) {
			dispatch(userActions.getUsers(id));
		}
	}, []);

	const dispatch = useDispatch();
	const updateUser = (updatedUser) => {
		dispatch(userActions.updateUser(user.id, updatedUser, userActions.getUsers(id)));
	};

	return (
		<>
			{commonActions.objectIsNullOrUndefined(user) || commonActions.objectIsEmpty(user) ? (
				<NotFound item={"Profile"} noNav={true} />
			) : (
				<ProfilePage
					account={user}
					accountType={"User"}
					updateAction={updateUser}
					editPermission={account && user && account.id === user.id}
				/>
			)}
		</>
	);
}

export default StoreProfile;
