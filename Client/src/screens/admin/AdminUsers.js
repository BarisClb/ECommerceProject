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

	const navCreateUserClick = async (newUser) => {
		dispatch(userActions.createUser(newUser, userActions.getUsers()));
	};
	const navUpdateUserClick = (userId, updatedUser) => {
		dispatch(userActions.updateUser(userId, updatedUser, userActions.getUsers()));
	};
	const navDeleteUserClick = (oldUser) => {
		dispatch(userActions.deleteUser(oldUser, userActions.getUsers()));
	};

	const tableDeleteButtonClick = (oldUser) => {
		dispatch(userActions.deleteUser(oldUser.id, userActions.getUsers()));
	};

	return (
		<div className="">
			<Header title={"Users"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={users}
					//// Table Content
					// Table Headings
					tableHead={"Name"}
					tableHead2={"Username"}
					tableHead3={"Email"}
					tableHead4={"Admin"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"name"}
					tableData2={"username"}
					tableData3={"eMail"}
					tableData4={"admin"}
					// Special
					isAdmin={true}
					isCategories={false}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"User"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateUserClick}
					navUpdateButtonClick={navUpdateUserClick}
					navDeleteButtonClick={navDeleteUserClick}
				/>
			</div>
		</div>
	);
}

export default AdminUsers;
