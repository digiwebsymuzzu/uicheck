import React from "react";

const ShippingOne = () => {
  return (
    <section className="shipping mb-24" id="shipping">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-dark hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-car-profile" />
              </span>
              <div className="">
                <h6 className="mb-0  text-light">Free Shippings</h6>
                <span className="text-sm  text-light">
                  Shipping available all over the UAE
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-dark hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-hand-heart" />
              </span>
              <div className="">
                <h6 className="mb-0 text-light "> 100% Satisfaction</h6>
                <span className="text-sm  text-light ">
                  Trusted in the industry for over 45 years
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-dark hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-credit-card" />
              </span>
              <div className="">
                <h6 className="mb-0 text-light"> Original Products</h6>
                <span className="text-sm  text-white">
                  Official Supplier of Trusted Brands
                </span>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6">
            <div className="shipping-item flex-align gap-16 rounded-16 bg-dark hover-bg-main-100 transition-2">
              <span className="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
                <i className="ph-fill ph-chats" />
              </span>
              <div className="">
                <h6 className="mb-0 text-light"> 24/7 Support</h6>
                <span className="text-sm  text-light">
                  Dedicated team to support your needs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShippingOne;
