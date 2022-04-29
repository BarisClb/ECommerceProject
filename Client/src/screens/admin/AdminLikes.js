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

	const navCreateLikeClick = async (newLike) => {
		dispatch(likeActions.createLike(newLike, likeActions.getLikes()));
	};
	const navUpdateLikeClick = (likeId, updatedLike) => {
		dispatch(
			likeActions.updateLike(likeId, updatedLike, likeActions.getLikes())
		);
	};
	const navDeleteLikeClick = (oldLike) => {
		dispatch(likeActions.deleteLike(oldLike, likeActions.getLikes()));
	};

	const tableDeleteButtonClick = (oldLike) => {
		dispatch(likeActions.deleteLike(oldLike.id, likeActions.getLikes()));
	};

	return (
		<div className="">
			<Header title={"Likes"} />
			<div className="container-fluid">
				<Table
					// The Data
					apiData={likes}
					//// Table Content
					// Table Headings
					tableHead={"CommentId"}
					tableHead2={"Product"}
					tableHead3={"User"}
					buttonHeadName={"Operations"}
					// Table Datas
					tableData={"commentId"}
					tableData2={"productName"}
					tableData3={"userUsername"}
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
					isNav={"Like"}
					navCreateButton={true}
					navUpdateButton={true}
					navDeleteButton={true}
					// Nav Actions
					navCreateButtonClick={navCreateLikeClick}
					navUpdateButtonClick={navUpdateLikeClick}
					navDeleteButtonClick={navDeleteLikeClick}
				/>
			</div>
		</div>
	);
};

export default AdminLikes;
