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
		// Adding pageSize and reversed as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 24 };
		}
		if (sortInfo.reversed === undefined) {
			sortInfo = { ...sortInfo, reversed: true };
		}
		dispatch(commentActions.getSortedCommentsByEntity("User", sortInfo, id));
	}, []);

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldComment) => {
		dispatch(
			commentActions.deleteComment(
				oldComment.id,
				commentActions.getSortedCommentsByEntity("User", sortInfo, id)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(commentActions.getSortedCommentsByEntity("User", sortInfo, id));
	};

	// Sort Data from API
	let sortInfo = useSelector((state) => state.common.SortInfo);

	// Used this as a starting, default value, before getting the SortInfo from the API but it causes the SortInfo to revert back to this after every reload(and also the action, to refresh data.) So, I put an alternative above(useEffect).

	//// Default Sort Values
	// let listSorting = {
	// 	reversed: true,
	// 	searchWord: "",
	// 	pageNumber: 1,
	// 	pageSize: 20,
	// 	orderBy: "Id",
	// };

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
