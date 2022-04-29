import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { commentReplyActions } from "../../store/actions/commentReplyActions";
import { useSelector } from "react-redux";

function AdminCommentReplies() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(commentReplyActions.getCommentReplies());
	}, []);

	const commentReplies = useSelector(
		(state) => state.commentReply.commentReplies
	);

	const navCreateCommentReplyClick = async (newCommentReply) => {
		dispatch(
			commentReplyActions.createCommentReply(
				newCommentReply,
				commentReplyActions.getCommentReplies()
			)
		);
	};
	const navUpdateCommentReplyClick = (commentReplyId, updatedCommentReply) => {
		dispatch(
			commentReplyActions.updateCommentReply(
				commentReplyId,
				updatedCommentReply,
				commentReplyActions.getCommentReplies()
			)
		);
	};
	const navDeleteCommentReplyClick = (oldCommentReply) => {
		dispatch(
			commentReplyActions.deleteCommentReply(
				oldCommentReply,
				commentReplyActions.getCommentReplies()
			)
		);
	};

	const tableDeleteButtonClick = (oldCommentReply) => {
		dispatch(
			commentReplyActions.deleteCommentReply(
				oldCommentReply.id,
				commentReplyActions.getCommentReplies()
			)
		);
	};

	return (
		<div className="">
			<Header title={"Comment Replies"} />
			<div className="container-fluid">
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
					isCategories={true}
					instaSearch={false}
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
				/>
			</div>
		</div>
	);
}

export default AdminCommentReplies;
