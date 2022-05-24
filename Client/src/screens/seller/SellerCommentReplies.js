import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import Header from "../../components/header/Header";
import { commentReplyActions } from "../../store/actions/commentReplyActions";

function SellerCommentReplies() {
	const dispatch = useDispatch();

	const seller = useSelector((state) => state.account.seller);

	// Table Data
	const commentReplies = useSelector((state) => state.commentReply.commentReplies);
	useEffect(() => {
		// Adding pageSize and reversed as a default value here
		// This one is a conditional one, we can also make it outside of a condition
		if (sortInfo.pageSize === undefined) {
			sortInfo = { ...sortInfo, pageSize: 20 };
		}
		if (sortInfo.reversed === undefined) {
			sortInfo = { ...sortInfo, reversed: true };
		}
		dispatch(
			commentReplyActions.getSortedCommentRepliesByEntity("Seller", listSorting, seller.id)
		);
	}, []);

	// Table Side Button Actions
	const tableDeleteButtonClick = (oldCommentReply) => {
		dispatch(
			commentReplyActions.deleteCommentReply(
				oldCommentReply.id,
				commentReplyActions.getSortedCommentRepliesByEntity("Seller", sortInfo, seller.id)
			)
		);
	};

	// Table Sort Button Action
	const tableSortButtonClick = (listSortingValues) => {
		if (seller && seller.id) {
			listSorting = { ...listSorting, ...listSortingValues };
			dispatch(
				commentReplyActions.getSortedCommentRepliesByEntity("Seller", listSorting, seller.id)
			);
		}
	};
	// Default Sort Values
	let listSorting = {
		reversed: true,
		searchWord: "",
		pageNumber: 1,
		pageSize: 20,
		orderBy: "Id",
	};
	// Sort Data from API
	const sortInfo = useSelector((state) => state.common.SortInfo);

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
		<div className="seller-commentReply-screen-wrapper">
			<Header title={"Comment Replies"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={commentReplies}
					// Table Content
					// Table Headings
					tableHead={"Product"}
					tableHead2={"Reply"}
					tableHead3={"Date"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"productName"}
					tableData2={"text"}
					tableData3={"dateCreated"}
					// Table Buttons
					tableButtons={true}
					tableAddButton={false}
					tableUpdateButton={false}
					tableDeleteButton={true}
					// Table Button Clicks
					tableDeleteButtonClick={tableDeleteButtonClick}
					// Nav
					isNav={"CommentReply"}
					navCreateButton={false}
					navUpdateButton={false}
					navDeleteButton={false}
					// Nav Action
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
					tableSortBy2={"Product"}
					tableSortByValue2={"ProductName"}
					tableSortAction={tableSortButtonClick}
				/>
			</div>
		</div>
	);
}

export default SellerCommentReplies;
