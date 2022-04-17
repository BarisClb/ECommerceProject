import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions/userActions";
import { useSelector } from "react-redux";

function AdminUsers() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.getUsers());
	}, []);

	const users = useSelector((state) => state.user.users);

	const navAddUserComp = async (newUser) => {
		dispatch(userActions.addUser(newUser));
		// dispatch(userActions.getCategories());
	};
	const navUpdateUserComp = (oldUser, newUser) => {
		dispatch(userActions.updateUser(oldUser, newUser));
		// dispatch(UserActions.getCategories());
	};
	const navDeleteUserComp = (oldUser) => {
		dispatch(userActions.deleteUser(oldUser));
		// dispatch(userActions.getCategories());
	};

	return (
		<div className="">
			<Header title={"Users"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={users}
					// Table Content
					// Table Headings
					tableHead={"User Name"}
					tableHead2={"Email"}
					tableHead3={false}
					tableHead4={false}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"email"}
					tableData3={false}
					tableData4={false}
					// Special
					isCategories={false}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					// Nav
					isNav={true}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
				/>
			</div>
		</div>
	);
}

export default AdminUsers;
