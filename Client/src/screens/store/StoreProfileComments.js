import React, { useEffect } from "react";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { commentActions } from "../../store/actions/commentActions";
import { useParams } from "react-router-dom";

function StoreProfileComments() {
	const dispatch = useDispatch();

	// User
	const { id } = useParams();
	const user = useSelector((state) => state.account.user);

	// Table Data
	const comments = useSelector((state) => state.comment.comments);
	useEffect(() => {
		dispatch(commentActions.getSortedCommentsByEntity("User", listSorting, id));
	}, []);

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldComment) => {
		dispatch(
			commentActions.deleteComment(
				oldComment.id,
				commentActions.getSortedCommentsByEntity("User", listSorting, id)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		listSorting = { ...listSorting, ...listSortingValues };
		dispatch(commentActions.getSortedCommentsByEntity("User", listSorting, id));
	};
	// Default Sort Values
	let listSorting = {
		reversed: false,
		searchWord: "",
		pageNumber: 1,
		pageSize: 20,
		orderBy: "Id",
	};
	// Sort Data from API
	const sortInfo = useSelector((state) => state.common.SortInfo);

	return (
		<div
			id="store-profile-comments-screen-wrapper"
			style={{ flexGrow: "1", marginBottom: "3rem" }}
		>
			<h1 style={{ textAlign: "center", margin: "3rem" }}>Comments by {user.username}</h1>
			<div id="store-profile-comments-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={comments}
					//// Table Content
					// Table Headings
					tableHead={"Title"}
					tableHead2={"Text"}
					tableHead3={"Rating"}
					tableHead4={"Product"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"title"}
					tableData2={"text"}
					tableData3={"rating"}
					tableData4={"productName"}
					// Special
					isAdmin={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// // Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"Comment"}
					navCreateButton={false}
					navUpdateButton={false}
					navDeleteButton={false}
					// Nav Actions
					navCreateButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Date"}
					tableSortBy2={"Rating"}
					tableSortByValue2={"Rating"}
					tableSortBy3={"Product"}
					tableSortByValue3={"ProductName"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default StoreProfileComments;
