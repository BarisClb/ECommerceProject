import { commonTypes } from "../types";
import { actionHelpers } from "./actionHelpers";

const clearError = () => {
	return {
		type: commonTypes.ClearError,
	};
};
const asyncStarted = () => {
	return {
		type: commonTypes.AsyncStarted,
	};
};
const asyncEnd = () => {
	return {
		type: commonTypes.AsyncEnd,
	};
};

const toggleDarkMode = (darkMode) => {
	return {
		type: commonTypes.DarkMode,
		payload: darkMode,
	};
};

const getEntityToUpdate = (entity, entityId) => {
	return async (dispatch) => {
		dispatch({ type: commonTypes.AsyncStarted });

		if (entityId === 0) {
			dispatch({
				type: commonTypes.EntityToUpdate,
				payload: {},
			});
		} else {
			let response = await actionHelpers.getHelper(entity, entityId);
			console.log(response);
			dispatch({
				type: commonTypes.EntityToUpdate,
				payload: response.data,
			});
		}

		dispatch({ type: commonTypes.AsyncEnd });
	};
};

const randomRgba = () => {
	let randomNum1 = Math.round(Math.random() * 255);
	let randomNum2 = Math.round(Math.random() * 255);
	let randomNum3 = Math.round(Math.random() * 255);
	return `rgba(${randomNum1},${randomNum2},${randomNum3},1)`;
};
const randomImage = () => {
	let rgb1 = randomRgba();
	let rgb2 = randomRgba();
	let rgb3 = randomRgba();
	return `linear-gradient(315deg, ${rgb1} 33%, ${rgb2} 66%, ${rgb3} 100%)`;
};

const objectIsNullOrUndefined = (object) => {
	return object === null || object === undefined;
};

const objectIsEmpty = (object) => {
	return Object.keys(object).length === 0;
};

export const commonActions = {
	clearError,
	asyncStarted,
	asyncEnd,
	toggleDarkMode,
	getEntityToUpdate,
	randomImage,
	objectIsNullOrUndefined,
	objectIsEmpty,
};
