import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { commentActions } from "../../store/actions/commentActions";
import { useSelector } from "react-redux";

function AdminComments() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(commentActions.getComments());
	}, []);

	const comments = useSelector((state) => state.comment.comments);

	const navAddCommentComp = async (newComment) => {
		dispatch(commentActions.addComment(newComment));
		// dispatch(commentActions.getCategories());
	};
	const navUpdateCommentComp = (oldComment, newComment) => {
		dispatch(commentActions.updateComment(oldComment, newComment));
		// dispatch(commentActions.getCategories());
	};
	const navDeleteCommentComp = (oldComment) => {
		dispatch(commentActions.deleteComment(oldComment));
		// dispatch(commentActions.getCategories());
	};

	return (
		<div className="">
			<Header title={"Comments"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={comments}
					// Table Content
					// Table Headings
					tableHead={"Comment"}
					tableHead2={"User"}
					tableHead3={"Product"}
					tableHead4={false}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"text"}
					tableData2={"user"}
					tableData3={"product"}
					tableData4={false}
					// Special
					isCategories={true}
					instaSearch={false}
					// Table Buttons
					tableButtons={true}
					tableAddButton={true}
					tableDeleteButton={true}
					tableUpdateButton={true}
					// Table Button Clicks
					// Nav
					isNav={true}
					navAddButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={false}
					navUpdateButtonClick={false}
					navDeleteButtonClick={false}
				/>
			</div>
		</div>
	);
}

export default AdminComments;
