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
	};
	const navUpdateUserComp = (oldUser, newUser) => {
		dispatch(userActions.updateUser(oldUser, newUser));
	};
	const navDeleteUserComp = (oldUser) => {
		dispatch(userActions.deleteUser(oldUser));
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
					tableHead={"Name"}
					tableHead2={"Username"}
					tableHead3={"Email"}
					tableHead4={false}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"username"}
					tableData3={"eMail"}
					tableData4={false}
					// Special
					isAdmin={true}
					isCategories={false}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					// Nav
					isNav={"User"}
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
