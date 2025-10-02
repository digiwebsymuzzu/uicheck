import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title }) => {
	return (
		<div className="breadcrumb py-26 bg-dark">
			<div className="container container-lg">
				<div className="breadcrumb-wrapper flex-between flex-wrap gap-16">
					<h6 className="mb-0 text-light">{title}</h6>
					<ul className="flex-align gap-8 flex-wrap">
						<li className="text-sm">
							<Link
								to="/"
								className="text-light flex-align gap-8 hover-text-main-600"
							>
								<i className="ph ph-house" />
								Home
							</Link>
						</li>
						<li className="flex-align">
							<i className="ph ph-caret-right text-danger"></i>
						</li>
						<li className="text-sm  text-danger"> {title} </li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Breadcrumb;
