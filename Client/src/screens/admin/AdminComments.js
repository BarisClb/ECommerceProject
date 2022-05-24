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
		// Adding pageSize as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		dispatch(commentActions.getSortedComments(sortInfo));
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
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(commentActions.getSortedComments(sortInfo));
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
