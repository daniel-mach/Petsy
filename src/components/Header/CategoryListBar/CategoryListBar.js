import { useContext, useEffect, useState } from "react";
import s from "./CategoryListBar.module.css";
import CategoryList from "../../CategoryList/CategoryList";
import { businessListContext } from "../../../contexts/BusinessListContext";
import { Link, Route, Routes } from "react-router-dom";

const CategoryListBar = ({
	category,
	setCategory,
	setServicesList,
	servicesList,
}) => {
	const businessList = useContext(businessListContext);

	return (
		<div>
			<div className={s.categoryBar}>
				<Link
					to="Groomer"
					className={s.category}
					onClick={() => setCategory("Groomer")}>
					Groomer
				</Link>
				<Link
					to="Weterynarz"
					className={s.category}
					onClick={() => setCategory("Weterynarz")}>
					Weterynarz
				</Link>
				<Link
					to="Behawiorysta"
					className={s.category}
					onClick={() => setCategory("Behawiorysta")}>
					Behawiorysta
				</Link>
				<Link
					to="Hotel"
					className={s.category}
					onClick={() => setCategory("Hotel")}>
					Psi hotel
				</Link>
				<Link
					to="Hodowla"
					className={s.category}
					onClick={() => setCategory("Hodowla")}>
					Hodowla
				</Link>
			</div>
			<Routes>
				<Route
					path={category}
					element={
						<div>
							{businessList.map((business) => {
								if (business.category === category) {
									return (
										<CategoryList
											key={business.id}
											business={business}
											setServicesList={setServicesList}
											servicesList={servicesList}
											category={category}
										/>
									);
								}
							})}
						</div>
					}></Route>
			</Routes>
		</div>
	);
};

export default CategoryListBar;
