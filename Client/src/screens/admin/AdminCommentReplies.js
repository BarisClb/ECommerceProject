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

	const navAddCommentReplyComp = async (newCommentReply) => {
		dispatch(commentReplyActions.addCommentReply(newCommentReply));
	};
	const navUpdateCommentReplyComp = (oldCommentReply, newCommentReply) => {
		dispatch(
			commentReplyActions.updateCommentReply(
				oldCommentReply,
				newCommentReply
			)
		);
	};
	const navDeleteCommentReplyComp = (oldCommentReply) => {
		dispatch(commentReplyActions.deleteCommentReply(oldCommentReply));
	};

	return (
		<div className="">
			<Header title={"Comment Replies"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={commentReplies}
					// Table Content
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
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					// Nav
					isNav={"CommentReply"}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={navAddCommentReplyComp}
					navUpdateButtonClick={navUpdateCommentReplyComp}
					navDeleteButtonClick={navDeleteCommentReplyComp}
				/>
			</div>
		</div>
	);
}

export default AdminCommentReplies;
