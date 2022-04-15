import { commentReplyTypes } from "../types/commentReplyTypes";

export default function commentReplyReducer(
	state = { commentReplies: [] },
	action
) {
	switch (action.type) {
		case commentReplyTypes:
			return { ...state, commentReplies: action.payload };

		default:
			return state;
	}
}
