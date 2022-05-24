import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions/userActions";
import { useSelector } from "react-redux";

function AdminUsers() {
	const dispatch = useDispatch();

	// Table Data
	const users = useSelector((state) => state.user.users);
	useEffect(() => {
		// Adding pageSize as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		dispatch(userActions.getSortedUsers(sortInfo));
	}, []);

	// NAV FORM ACTIONS
	const navCreateUserClick = async (newUser) => {
		dispatch(userActions.createUser(newUser, userActions.getSortedUsers(sortInfo)));
	};
	const navUpdateUserClick = (userId, updatedUser) => {
		dispatch(userActions.updateUser(userId, updatedUser, userActions.getSortedUsers(sortInfo)));
	};
	const navDeleteUserClick = (oldUser) => {
		dispatch(userActions.deleteUser(oldUser, userActions.getSortedUsers(sortInfo)));
	};

	const tableDeleteButtonClick = (oldUser) => {
		dispatch(userActions.deleteUser(oldUser.id, userActions.getSortedUsers(sortInfo)));
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(userActions.getSortedUsers(sortInfo));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: false,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

	return (
		<div id="admin-user-screen-wrapper">
			<Header title={"Users"} />
			<div id="admin-user-table-wrapper" className="container-fluid">
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
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"Name"}
					tableSortBy3={"Username"}
					tableSortBy4={"EMail"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default AdminUsers;
