import { commentReplyTypes } from "../types/commentReplyTypes";

export default function commentReplyReducer(
	state = { commentReplies: [], singleCommentReply: {} },
	action
) {
	switch (action.type) {
		case commentReplyTypes.GetCommentReplies:
			return { ...state, commentReplies: action.payload };

		case commentReplyTypes.GetSingleCommentReply:
			return { ...state, singleCommentReply: action.payload };

		case commentReplyTypes.CreateCommentReply:
			return state;

		case commentReplyTypes.UpdateCommentReply:
			return state;

		case commentReplyTypes.DeleteCommentReply:
			return state;

		default:
			return state;
	}
}
