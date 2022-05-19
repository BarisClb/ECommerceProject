import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { commentActions } from "../../store/actions/commentActions";
import { useSelector } from "react-redux";

function AdminComments() {
	const dispatch = useDispatch();

	// Table Data
	const comments = useSelector((state) => state.comment.comments);
	useEffect(() => {
		dispatch(commentActions.getSortedComments(listSorting));
	}, []);

	// Nav Form Actions
	const navCreateCommentClick = (newComment) => {
		dispatch(
			commentActions.createComment(newComment, commentActions.getSortedComments(sortInfo))
		);
	};
	const navUpdateCommentClick = (commentId, updatedComment) => {
		dispatch(
			commentActions.updateComment(
				commentId,
				updatedComment,
				commentActions.getSortedComments(sortInfo)
			)
		);
	};
	const navDeleteCommentClick = (oldComment) => {
		dispatch(
			commentActions.deleteComment(oldComment, commentActions.getSortedComments(sortInfo))
		);
	};

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldComment) => {
		dispatch(
			commentActions.deleteComment(oldComment.id, commentActions.getSortedComments(sortInfo))
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		listSorting = { ...listSorting, ...listSortingValues };
		dispatch(commentActions.getSortedComments(listSorting));
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
		<div id="admin-comment-screen-wrapper">
			<Header title={"Comments"} />
			<div id="admin-comment-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={comments}
					//// Table Content
					// Table Headings
					tableHead={"Text"}
					tableHead2={"Rating"}
					tableHead3={"Product"}
					tableHead4={"User"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"text"}
					tableData2={"rating"}
					tableData3={"productName"}
					tableData4={"userUsername"}
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
					isNav={"Comment"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateCommentClick}
					navUpdateButtonClick={navUpdateCommentClick}
					navDeleteButtonClick={navDeleteCommentClick}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"User"}
					tableSortByValue2={"UserUsername"}
					tableSortBy3={"Product"}
					tableSortByValue3={"ProductName"}
					tableSortBy4={"Rating"}
					tableSortByValue4={"Rating"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default AdminComments;
