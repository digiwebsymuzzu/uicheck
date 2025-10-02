import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Link } from "react-router-dom";

const Contact = () => {
	const [phone, setPhone] = useState("");
	return (
		<section className="contact py-80">
			<div className="container container-lg">
				<div className="row gy-5">
					<div className="col-lg-6">
						<div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
							<form action="#">
								<h6 className="mb-32">Your Details</h6>
								<div className="row gy-4">
									<div className="col-sm-12 ">
										<label
											htmlFor="name"
											className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
										>
											Full Name{" "}
											<span className="text-danger text-xl line-height-1">
												*
											</span>{" "}
										</label>
										<input
											type="text"
											className="common-input px-16"
											id="name"
											placeholder="Full name"
										/>
									</div>
									{/* Mobile Number with +971 */}
									<div className="col-sm-6 col-xs-6">
										<label
											htmlFor="phone"
											className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
										>
											Mobile Number{" "}
											<span className="text-danger text-xl line-height-1">
												*
											</span>
										</label>
										<div className="d-flex">
											<PhoneInput
												country={"in"} // Default country (India in this case)
												value={phone}
												onChange={(phone) => setPhone(phone)}
												inputClass=""
												containerClass="w-100"
												inputProps={{
													name: "phone",
													required: true,
													autoFocus: false,
												}}
											/>
										</div>
									</div>
									<div className="col-sm-6 col-xs-6">
										<label
											htmlFor="email"
											className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
										>
											Email Address{" "}
											<span className="text-danger text-xl line-height-1">
												*
											</span>{" "}
										</label>
										<input
											type="email"
											className="common-input px-16"
											id="email"
											placeholder="Email address"
										/>
									</div>
									<h6 className="">How can we help?</h6>
									<p className="text-gray-700 mb-24">
										Feel free to ask a question or simply leave a comment.
									</p>
									<div className="col-sm-12">
										<label
											htmlFor="message"
											className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
										>
											Message
											<span className="text-danger text-xl line-height-1">
												*
											</span>{" "}
										</label>
										<textarea
											className="common-input px-16"
											id="message"
											placeholder="Type your message"
											defaultValue={""}
										/>
									</div>
									<div className="col-sm-12 mt-32">
										<button
											type="submit"
											className="btn btn-main py-18 px-32 rounded-8"
										>
											Submit
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
							<h6 className="mb-35">Get In Touch</h6>
							<h4 className="mb-24 text-bold text-danger">
								Al Sukoon General Trading Company LLC.
							</h4>

							<div className="flex-align gap-16 mb-16">
								<span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
									<i className="ph-fill ph-phone-call text-danger" />
								</span>
								<Link
									to="/tel:+050-2530888"
									className="text-md text-gray-900 hover-text-main-600"
								>
									+050-2530888
								</Link>
							</div>
							<div className="flex-align gap-16 mb-16">
								<span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
									<i className="ph-fill ph-envelope text-danger" />
								</span>
								<Link
									to="/mailto:info@udemandme.com"
									className="text-md text-gray-900 hover-text-main-600"
								>
									info@udemandme.com
								</Link>
							</div>
							<div className="flex-align gap-16 mb-0">
								<span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
									<i className="ph-fill ph-map-pin text-danger" />
								</span>
								<span className="text-md text-gray-900 ">
									PO Box 2975, Makan No. 46387 07765, No. 7,8,9 Nasser Yousuf
									Nasser Al Nuaimi, 35 Street – Hasan Bin Haitham Street,
									Sanaiyya,New Industrial Area, Ajman, United Arab Emirates
								</span>
							</div>
							<div className="mt-28 flex-align flex-wrap gap-16">
								<Link
									to="/tel:+050-2530888"
									className="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
								>
									<span className="text-white fw-medium">
										Get Support On Call
									</span>
									<span className="w-36 h-36 bg-black rounded-8 flex-center text-xl text-white">
										<i className="ph ph-headset" />
									</span>
								</Link>
								<a
									href="https://www.google.com/maps/search/?api=1&query=PO+Box+2975,+Makan+No.+46387+07765,+No.+7,+8,+9+Nasser+Yousuf+Nasser+Al+Nuaimi,+35+Street+–+Hasan+Bin+Haitham+Street,+Sanaiyya,+New+Industrial+Area,+Ajman,+United+Arab+Emirates"
									target="_blank"
									rel="noopener noreferrer"
									className="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
								>
									<span className="text-white fw-medium">Get Direction</span>
									<span className="w-36 h-36 bg-black rounded-8 flex-center text-xl text-white">
										<i className="ph ph-map-pin" />
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
