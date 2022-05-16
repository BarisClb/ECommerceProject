import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePage from "../../components/common/ProfilePage";
import { commonActions } from "../../store/actions";
import { userActions } from "../../store/actions/userActions";

const AdminProfile = () => {
	// Data
	const user = useSelector((state) => state.account.user);
	useEffect(() => {
		if (commonActions.objectIsNullOrUndefined(user) || commonActions.objectIsEmpty(user)) {
			dispatch(userActions.getUsers(user.id));
		}
	}, []);

	const dispatch = useDispatch();
	const updateUser = (updatedUser) => {
		dispatch(userActions.updateUser(user.id, updatedUser, userActions.getUsers(user.id)));
	};

	return (
		<>
			<ProfilePage
				account={user}
				accountType={"Admin"}
				updateAction={updateUser}
				editPermission={true}
			/>
		</>
	);
};

export default AdminProfile;
