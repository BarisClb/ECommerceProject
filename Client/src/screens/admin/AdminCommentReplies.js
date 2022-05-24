import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { commentReplyActions } from "../../store/actions/commentReplyActions";
import { useSelector } from "react-redux";

function AdminCommentReplies() {
	const dispatch = useDispatch();

	// Table Data
	const commentReplies = useSelector((state) => state.commentReply.commentReplies);
	useEffect(() => {
		// Adding pageSize as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		dispatch(commentReplyActions.getSortedCommentReplies(sortInfo));
	}, []);

	// Nav Form Actions
	const navCreateCommentReplyClick = (newCommentReply) => {
		dispatch(
			commentReplyActions.createCommentReply(
				newCommentReply,
				commentReplyActions.getSortedCommentReplies(sortInfo)
			)
		);
	};
	const navUpdateCommentReplyClick = (commentReplyId, updatedCommentReply) => {
		dispatch(
			commentReplyActions.updateCommentReply(
				commentReplyId,
				updatedCommentReply,
				commentReplyActions.getSortedCommentReplies(sortInfo)
			)
		);
	};
	const navDeleteCommentReplyClick = (oldCommentReply) => {
		dispatch(
			commentReplyActions.deleteCommentReply(
				oldCommentReply,
				commentReplyActions.getSortedCommentReplies(sortInfo)
			)
		);
	};

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldCommentReply) => {
		dispatch(
			commentReplyActions.deleteCommentReply(
				oldCommentReply.id,
				commentReplyActions.getSortedCommentReplies(sortInfo)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		sortInfo = { ...sortInfo, ...listSortingValues };
		dispatch(commentReplyActions.getSortedCommentReplies(sortInfo));
	};

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
		<div id="admin-commentReply-screen-wrapper">
			<Header title={"Comment Replies"} />
			<div id="admin-commentReply-table-wrapper" className="container-fluid">
				<Table
					// The Data
					apiData={commentReplies}
					//// Table Content
					// Table Headings
					tableHead={"Text"}
					tableHead2={"CommentId"}
					tableHead3={"ProductId"}
					tableHead4={"SellerId"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"text"}
					tableData2={"commentId"}
					tableData3={"productId"}
					tableData4={"sellerId"}
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
					isNav={"CommentReply"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateCommentReplyClick}
					navUpdateButtonClick={navUpdateCommentReplyClick}
					navDeleteButtonClick={navDeleteCommentReplyClick}
					// Nav Search
					navSearch={false}
					instaSearch={false}
					// Nav SortBy
					sortInfo={sortInfo}
					tableSortBy={true}
					tableSortBy1={"Id"}
					tableSortBy2={"Product"}
					tableSortByValue2={"ProductName"}
					tableSortBy3={"Seller"}
					tableSortByValue3={"SellerUsername"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default AdminCommentReplies;
