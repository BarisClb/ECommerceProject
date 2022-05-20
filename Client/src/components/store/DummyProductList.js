import React, { useEffect, useState } from "react";
import CardGroup from "../common/cardGroup/CardGroup";

function DummyProductList() {
	let [data, setData] = useState([]);

	const generateDummyData = () => {
		let newData = [];
		for (let i = 1; i <= 24; i++) {
			newData = [
				...newData,
				{
					id: i,
					name: `Dummy Product Name ${i}`,
					description:
						"This is a Dummy Production Description. If you want to check some real data, get the API up and running and then changed the :id (now 0) in the url, or click on one of the CategoryNames in the NavBar above.",
					price: i * 10,
				},
			];
		}
		return newData;
	};

	useEffect(() => {
		setData(generateDummyData());
	}, []);
	return (
		<div>
			<CardGroup data={data} />
		</div>
	);
}

export default DummyProductList;
