const PaymentPolicy = () => {
	return (
		<>
			<section className="contact py-80">
				<div className="container container-lg">
					<div className="row gy-5">
						<div className="col-lg-12">
							<div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
								<h4 className="text-bold headingsize">
									Payment <span className="primecolor">System</span>
								</h4>

								<h6 className="mt-24">
									We offer the following
									<span className="primecolor px-5"> payment methods: </span>
								</h6>
								<ul className="mt-20">
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">Cash Payment</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Credit/Debit Card Payment
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">Net Banking</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Cheque (Only for approved credit facility holders)
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Wallet Payment
										</span>
									</li>
								</ul>

								<h6 className="mt-24">
									Payment <span className="primecolor"> Confirmation</span>
								</h6>
								<ul className="mt-20">
									<li className="text-md text-gray-900 mb-14">
										Once an order is placed and payment is received, a
										confirmation will be sent to the customer via
										Email/WhatsApp, and a payment receipt will be issued to the
										registered email address or WhatsApp number.
									</li>
									<li className="text-md text-gray-900 mb-14">
										If the payment is not received within 12 working hours of
										placing the order, the order will be placed on hold.
									</li>
								</ul>
								<h6 className="mt-24">
									Credit Facility{" "}
									<span className="primecolor"> Requirements</span>
								</h6>
								<ul className="mt-20">
									<li className="text-md text-gray-900 mb-14">
										We offer standard credit facilities based on credit score
										and submitted documents.
									</li>
								</ul>

								<h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24 ps-20">
									For Individuals, the following are required:{" "}
									<span className="primecolor"></span>
								</h6>
								<ul className="ps-20">
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Passport copy
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">Visa copy</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Emirates ID copy
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Salary certificate (valid within 30 days)
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Last 4 months’ bank statements (of the account used to
											issue cheques)
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											One cancelled cheque
										</span>
									</li>
								</ul>
								<h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24 ps-24">
									For Companies: <span className="primecolor"></span>
								</h6>
								<ul className="ps-20">
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Signing authority documents (Passport, Visa, Emirates ID)
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Trade License copy
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Memorandum of Understanding (MoU)
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											Last 3 months’ bank statements
										</span>
									</li>
									<li className="d-flex align-items-start gap-8 mb-20">
										<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
											<i className="ph ph-check icon-s"></i>
										</span>
										<span className="text-heading fw-medium">
											One cancelled cheque
										</span>
									</li>
								</ul>

								<div>
									{/* Modes of Payment - Cash */}
									<h6 className="mt-24">Modes of Payment</h6>

									<h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24">
										Payment in Cash
									</h6>
									<ul className="mt-24">
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Select "Cash" as the payment method at checkout.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												A temporary invoice will be sent via Email/WhatsApp.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												You will be notified when the product is ready for
												delivery.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												A reminder will be sent 6 hours before delivery.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Please keep the exact invoice amount ready in cash.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Original Tax Invoice will be provided at delivery.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Refunds (if applicable) will be processed within 3–4
												working days after product return and approval.
											</span>
										</li>
									</ul>

									{/* Card Payment */}
									<h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24">
										Payment by Credit/Debit Card
									</h6>
									<ul className="mt-24">
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												We prioritize secure payments and do not store customer
												card details.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Card payment will be done via swipe machine at the time
												of delivery.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												A temporary invoice will be issued.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												You will be notified 6 hours before delivery.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Customers can request to switch to cash or another
												method via WhatsApp.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Original Tax Invoice will be delivered with the product.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Refunds will be processed within 3–5 working days after
												product return and approval.
											</span>
										</li>
									</ul>

									<h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24">
										Payment by Net Banking
									</h6>
									<ul className="mt-24">
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												<strong>Bank Details:</strong>
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Account Name: Al Sukoon General Trading Co. LLC
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Account Number: 1041001000382010
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												IBAN: AE330351041001000382010
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Bank Name: First Abu Dhabi Bank – Ajman, UAE
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												SWIFT Code: NBADAEAA
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Bank details are available on all temporary invoices.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Payment must be made within 12 working hours of order
												placement.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Send payment confirmation via WhatsApp/Email to process
												the order.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												If not received within the time frame, the order will be
												cancelled.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Customer bears their bank’s transfer fees; we cover
												ours.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Refunds will be processed within 5–10 working days after
												return and approval.
											</span>
										</li>
									</ul>
									<h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24">
										Payment by Cheque (Credit Customers Only)
									</h6>
									<ul className="mt-24">
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												This option is available only to registered and approved
												credit customers.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												A unique ticket number will be issued upon credit
												approval.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												At checkout, select "Cheque" and enter the ticket
												number.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												If cart value ≤ approved credit amount, payment will be
												accepted.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Otherwise, the remaining amount must be paid using
												another method.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												A temporary invoice will be issued.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Customer must send a signed cheque copy within 12
												working hours via Email/WhatsApp.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Cheque to be submitted at the time of delivery.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												If the cheque is not sent, the order will be cancelled
												and the amount will be reflected in the wallet or a new
												ticket will be issued.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												If payment was made via another method, refunds will be:
												<ul className="ps-20 pt-8">
													<li className="mb-4">
														3–4 working days for net banking
													</li>
													<li>Up to 15 working days for card payments</li>
												</ul>
											</span>
										</li>
									</ul>

									<h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24">
										Payment through Wallet
									</h6>
									<ul className="mt-24">
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Customers can use their wallet balance for any
												purchases.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Any discount or loyalty reward amount will be added only
												after the return period expires.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												Refunds for approved returns or replacements will be
												added to the wallet for future use.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												No cash reimbursement will be made from the wallet.
											</span>
										</li>
										<li className="d-flex align-items-start gap-8 mb-20">
											<span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
												<i className="ph ph-check icon-s"></i>
											</span>
											<span className="text-heading fw-medium">
												To add funds to the wallet:
												<ul className="ps-20 pt-8">
													<li className="mb-4">Transfer via net banking</li>
													<li className="mb-4">
														Send the payment slip and registered mobile number
														via WhatsApp
													</li>
													<li>
														The wallet will be credited within 12 working hours
														of receipt
													</li>
												</ul>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
export default PaymentPolicy;
