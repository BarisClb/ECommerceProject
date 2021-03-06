import { toast } from "react-toastify";

const database = process.env.REACT_APP_DATABASE;
const aspNetKestrelUrl = process.env.REACT_APP_ASPNET_KESTREL_URL;
const aspNetIisUrl = process.env.REACT_APP_ASPNET_IIS_URL;

// GET
// No longer needed, since using the getSorted function without sortInfo also works as a 'getAll'
// But still can be used for getSingleUser

const getHelper = async (entityName, entityId) => {
	// Added env variables here to easily change API
	let url = "";
	switch (database) {
		case "Local_Kestrel":
			url = `${aspNetKestrelUrl}/${entityName}/`;
			if (entityId) {
				url += `${entityId}`;
			}
			break;
		case "Local_IIS":
			url = `${aspNetIisUrl}/${entityName}/`;
			if (entityId) {
				url += `${entityId}`;
			}
			break;

		default:
			break;
	}

	try {
		let response = await fetch(url);
		let responseJson = await response.json();

		if (responseJson.success) {
			return responseJson;
		} else {
			toast.warning(responseJson.message);
			return entityId ? { success: false, data: {} } : { success: false, data: [] };
		}
	} catch (error) {
		console.log(error);
		return entityId ? { success: false, data: {} } : { success: false, data: [] };
	}
};

// GET SORTED

const getSortedHelper = async (entityName, listSorting) => {
	// Added env variables here to easily change API
	let url = "";
	// Adding Base Url
	switch (database) {
		case "Local_Kestrel":
			url = `${aspNetKestrelUrl}/`;
			break;
		case "Local_IIS":
			url = `${aspNetIisUrl}/`;
			break;

		default:
			break;
	}
	// Adding the Rest and Applying Sort
	switch (database) {
		case "Local_Kestrel":
		case "Local_IIS":
			url += `${entityName}`;
			// // If no sorting applied, no need for question mark.
			// for (let i = 0; i < listSorting.length; i++) {
			// 	if (listSorting[i] !== null) {
			// 		url += `?`;
			// 		break
			// 	}
			// }

			// Always including 'reverse?' so I don't have to make a for loop like above, for adding question mark.
			// I am also giving it a default 'false' value so I don't get an error.
			url += `?Reversed=${listSorting && listSorting.reversed ? listSorting.reversed : "false"}`;
			// If there is no listSorting, it gets all the data, which replaces the previous getAll function.
			if (listSorting) {
				// SearchWord
				if (
					listSorting.searchWord !== undefined &&
					listSorting.searchWord !== null &&
					listSorting.searchWord.trim() !== ""
				) {
					url += `&SearchWord=${listSorting.searchWord.trim()}`;
				}
				// PageNumber
				if (listSorting.pageNumber !== undefined && listSorting.pageNumber !== null) {
					url += `&PageNumber=${listSorting.pageNumber}`;
				}
				// PageSize
				if (listSorting.pageNumber !== undefined && listSorting.pageNumber !== null) {
					url += `&PageSize=${listSorting.pageSize}`;
				}
				// OrderBy
				if (listSorting.orderBy !== undefined && listSorting.orderBy !== null) {
					url += `&OrderBy=${listSorting.orderBy}`;
				}
			}

			break;

		default:
			break;
	}

	try {
		let response = await fetch(url);
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			toast.warning(responseJson.message);
			return { success: false, data: [] };
		}
	} catch (error) {
		console.log(error);
		return { success: false, data: [] };
	}
};

// GET *ENTITIES* BY *ENTITY*

const getEntitiesByEntityHelper = async (manyEntityName, singleEntityName, singleEntityId) => {
	// Added env variables here to easily change API
	let url = "";
	switch (database) {
		case "Local_Kestrel":
			url = `${aspNetKestrelUrl}/${manyEntityName}/By${singleEntityName}/${singleEntityId}`;
			break;
		case "Local_IIS":
			url = `${aspNetIisUrl}/${manyEntityName}/By${singleEntityName}/${singleEntityId}`;
			break;

		default:
			break;
	}

	try {
		let response = await fetch(url);
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			toast.warning(responseJson.message);
			return { success: false, data: [] };
		}
	} catch (error) {
		console.log(error);
	}
};

// GET *ENTITIES* BY *ENTITY* SORTED

const getEntitiesByEntitySortedHelper = async (
	manyEntityName,
	singleEntityName,
	singleEntityId,
	listSorting
) => {
	// Added env variables here to easily change API
	let url = "";
	// Adding Base Url
	switch (database) {
		case "Local_Kestrel":
			url = `${aspNetKestrelUrl}/`;
			break;
		case "Local_IIS":
			url = `${aspNetIisUrl}/`;
			break;

		default:
			break;
	}
	// Adding the Rest and Applying Sort
	switch (database) {
		case "Local_Kestrel":
		case "Local_IIS":
			url += `${manyEntityName}/By${singleEntityName}/${singleEntityId}`;
			// Always including 'reverse?' so I don't have to make a for loop like above, for adding question mark.
			// I am also giving it a default 'false' value so I don't get an error.
			url += `?Reversed=${listSorting && listSorting.reversed ? listSorting.reversed : "false"}`;
			// If there is no listSorting, it gets all the data, which replaces the previous getAll function.
			if (listSorting) {
				// SearchWord
				if (
					listSorting.pageNumber !== undefined &&
					listSorting.searchWord !== null &&
					listSorting.searchWord.trim() !== ""
				) {
					url += `&SearchWord=${listSorting.searchWord.trim()}`;
				}
				// PageNumber
				if (listSorting.pageNumber !== undefined && listSorting.pageNumber !== null) {
					url += `&PageNumber=${listSorting.pageNumber}`;
				}
				// PageSize
				if (listSorting.pageNumber !== undefined && listSorting.pageNumber !== null) {
					url += `&PageSize=${listSorting.pageSize}`;
				}
				// OrderBy
				if (listSorting.orderBy !== undefined && listSorting.orderBy !== null) {
					url += `&OrderBy=${listSorting.orderBy}`;
				}
			}
			break;

		default:
			break;
	}

	try {
		let response = await fetch(url);
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			toast.warning(responseJson.message);
			return { success: false, data: [] };
		}
	} catch (error) {
		console.log(error);
	}
};

// CREATE

const createHelper = async (entityName, newEntity) => {
	// Added env variables here to easily change API
	let url = "";
	switch (database) {
		case "Local_Kestrel":
			url = `${aspNetKestrelUrl}/${entityName}/`;
			break;
		case "Local_IIS":
			url = `${aspNetIisUrl}/${entityName}/`;
			break;

		default:
			break;
	}

	try {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...newEntity,
			}),
		});
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			toast.warning(responseJson.message);
		}
	} catch (error) {
		console.log(error);
	}
};

// UPDATE

const updateHelper = async (entityName, entityId, updatedEntity) => {
	// Added env variables here to easily change API
	let url = "";
	switch (database) {
		case "Local_Kestrel":
			url = `${aspNetKestrelUrl}/${entityName}`;
			break;
		case "Local_IIS":
			url = `${aspNetIisUrl}/${entityName}`;
			break;

		default:
			break;
	}

	try {
		let response = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: entityId,
				...updatedEntity,
			}),
		});
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			toast.warning(responseJson.message);
		}
	} catch (error) {
		console.log(error);
	}
};

// DELETE

const deleteHelper = async (entityName, entityId) => {
	// Added env variables here to easily change API
	let url = "";
	switch (database) {
		case "Local_Kestrel":
			url = `${aspNetKestrelUrl}/${entityName}/${entityId}`;
			break;
		case "Local_IIS":
			url = `${aspNetIisUrl}/${entityName}/${entityId}`;
			break;

		default:
			break;
	}

	try {
		let response = await fetch(url, {
			method: "DELETE",
		});
		let responseJson = await response.json();
		if (responseJson.success) {
			return responseJson;
		} else {
			toast.warning(responseJson.message);
		}
	} catch (error) {
		console.log(error);
	}
};

export const actionHelpers = {
	getHelper,
	getSortedHelper,
	getEntitiesByEntityHelper,
	getEntitiesByEntitySortedHelper,
	createHelper,
	updateHelper,
	deleteHelper,
};
