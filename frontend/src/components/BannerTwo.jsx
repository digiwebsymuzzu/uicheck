import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const BannerTwo = () => {
	const settings = {
		dots: true,

		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 0,
	};
	return (
		<div className="banner-two mt-24">
			<div className="container container-lg">
				<div className="banner-two-wrapper d-flex align-items-start">
					<div className="banner-item-two-wrapper rounded-24 overflow-hidden position-relative arrow-center flex-grow-1 mb-0">
						<img
							src="assets/images/bg/banner-two-bg.png"
							alt=""
							className="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
						/>
						<div className="banner-item-two__slider">
							<Slider {...settings}>
								<div className="banner-item-two">
									<div className="banner-item-two__content">
										<span className="text-white mb-8 h6">
											Starting at only $250
										</span>
										<h2 className="banner-item-two__title bounce text-white">
											Get The Sound You Love For Less
										</h2>
										<Link
											to="/shop"
											className="btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-48"
										>
											Shop Now
											<span className="icon text-xl d-flex">
												<i className="ph ph-shopping-cart-simple" />
											</span>
										</Link>
									</div>
									<div className="banner-item-two__thumb position-absolute bottom-0">
										<img src="assets/images/bg/main-home.png" alt="" />
									</div>
								</div>
								<div className="banner-item-two">
									<div className="banner-item-two__content">
										<span className="text-white mb-8 h6">
											Starting at only $250
										</span>
										<h2 className="banner-item-two__title bounce text-white">
											Get The Sound You Love For Less
										</h2>
										<Link
											to="/shop"
											className="btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-48"
										>
											Shop Now
											<span className="icon text-xl d-flex">
												<i className="ph ph-shopping-cart-simple" />
											</span>
										</Link>
									</div>
									<div className="banner-item-two__thumb position-absolute bottom-0">
										<img src="assets/images/bg/main-home2.png" alt="" />
									</div>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerTwo;
