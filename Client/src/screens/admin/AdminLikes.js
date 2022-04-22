import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { useDispatch } from "react-redux";
import { likeActions } from "../../store/actions/likeActions";
import { useSelector } from "react-redux";

const AdminLikes = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(likeActions.getLikes());
	}, []);

	const likes = useSelector((state) => state.like.likes);

	const navAddLikeComp = async (newLike) => {
		dispatch(likeActions.addLike(newLike));
	};
	const navDeleteLikeComp = (oldLike) => {
		dispatch(likeActions.deleteLike(oldLike));
	};

	return (
		<div className="">
			<Header title={"Likes"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={likes}
					// Table Content
					// Table Headings
					tableHead={"CommentId"}
					tableHead2={"ProductId"}
					tableHead3={"UserId"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"commentId"}
					tableData2={"productId"}
					tableData3={"userId"}
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
					isNav={"Like"}
					navAddButton={true}
					navUpdateButton={false}
					navDeleteButton={true}
					// Nav Actions
					navAddButtonClick={navAddLikeComp}
					navUpdateButtonClick={false}
					navDeleteButtonClick={navDeleteLikeComp}
				/>
			</div>
		</div>
	);
};

export default AdminLikes;
