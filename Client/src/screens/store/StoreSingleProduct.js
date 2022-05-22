import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "../../components/common/NotFound";
import DummySingleProduct from "../../components/store/DummySingleProduct";
import SingleProduct from "../../components/store/SingleProduct";
import { commonActions } from "../../store/actions";
import { likeActions } from "../../store/actions/likeActions";
import { productActions } from "../../store/actions/productActions";
import { commentActions } from "../../store/actions/commentActions";
import { commentReplyActions } from "../../store/actions/commentReplyActions";

function StoreSingleProduct() {
	// DATA
	const { id } = useParams();
	const productPageData = useSelector((state) => state.product.singleProduct);
	const user = useSelector((state) => state.account.user);
	const seller = useSelector((state) => state.account.seller);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(productActions.getProductPage(id));
	}, []);

	// Product Page Actions

	const likeAction = (comment) => {
		if (commonActions.objectIsEmpty(user) && user.id === comment.userId) {
			toast.warning("You need to be LoggedIn as a User to like comments.");
		} else if (!commonActions.objectIsEmpty(user)) {
			dispatch(
				likeActions.createLike(
					{
						userId: user.id,
						commentId: comment.id,
						productId: comment.productId,
					},
					productActions.getProductPage(id)
				)
			);
		}
	};

	const dislikeAction = (like) => {
		if (!commonActions.objectIsEmpty(user) && user.id === like.userId) {
			dispatch(likeActions.deleteLike(like.id, productActions.getProductPage(id)));
		}
	};

	const writeComment = (comment) => {
		if (!commonActions.objectIsEmpty(user)) {
			dispatch(commentActions.createComment(comment, productActions.getProductPage(id)));
		}
	};

	const writeCommentReply = (commentReply) => {
		if (!commonActions.objectIsEmpty(seller)) {
			dispatch(
				commentReplyActions.createCommentReply(commentReply, productActions.getProductPage(id))
			);
		}
	};

	return (
		<>
			{id === "0" ? (
				<DummySingleProduct />
			) : commonActions.objectIsEmpty(productPageData) ? (
				<NotFound item={"Product"} noNav={true} />
			) : (
				<SingleProduct
					productPageData={productPageData}
					likeAction={likeAction}
					dislikeAction={dislikeAction}
					writeComment={writeComment}
					writeCommentReply={writeCommentReply}
				/>
			)}
		</>
	);
}

export default StoreSingleProduct;
