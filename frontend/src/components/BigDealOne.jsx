import React from "react";
import { Link } from "react-router-dom";

const BigDealOne = () => {
  return (
    <div className="big-deal rounded-16 overflow-hidden flex-between position-relative mb-24 py-80">
      <div className="container container-lg">
        <div className="big-deal-box position-relative z-1 rounded-16 py-40 overflow-hidden">
          <img
            src="assets/images/bg/big-deal-pattern.png"
            alt=""
            className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
          />

          <div className="row gy-4 align-items-center">
            <div className="col-md-12 text-center d-md-block d-none">
              <h4 className="mb-20 text-uppercase">Hand tools and Equipment</h4>
            </div>
          </div>

          <div
            className="row gy-4 align-items-center"
            style={{ marginTop: "10px" }}
          >
            <div className="col-md-2 text-center d-md-block d-none">
              <img src="assets/images/thumbs/pliers.png" alt="" />
              <p
                className="mb-20 text-uppercase"
                style={{ marginTop: "10px", fontWeight: "600", color: "black" }}
              >
                PLIERS
              </p>
            </div>

            <div className="col-md-2 text-center d-md-block d-none">
              <img src="assets/images/thumbs/hammer.png" alt="" />
              <p
                className="mb-20 text-uppercase"
                style={{ marginTop: "10px", fontWeight: "600", color: "black" }}
              >
                HAMMER
              </p>
            </div>

            <div className="col-md-2 text-center d-md-block d-none">
              <img src="assets/images/thumbs/wrench.png" alt="" />
              <p
                className="mb-20 text-uppercase"
                style={{ marginTop: "10px", fontWeight: "600", color: "black" }}
              >
                WRENCH
              </p>
            </div>

            <div className="col-md-2 text-center d-md-block d-none">
              <img src="assets/images/thumbs/screwdriver.png" alt="" />
              <p
                className="mb-20 text-uppercase"
                style={{ marginTop: "10px", fontWeight: "600", color: "black" }}
              >
                SCREWDRIVER
              </p>
            </div>

            <div className="col-md-2 text-center d-md-block d-none">
              <img src="assets/images/thumbs/allen-keys.png" alt="" />
              <p
                className="mb-20 text-uppercase"
                style={{ marginTop: "10px", fontWeight: "600", color: "black" }}
              >
                ALLEN KEYS
              </p>
            </div>

            <div className="col-md-2 text-center d-md-block d-none">
              <img src="assets/images/thumbs/spirit-level.png" alt="" />
              <p
                className="mb-20 text-uppercase"
                style={{ marginTop: "10px", fontWeight: "600", color: "black" }}
              >
                SPIRIT LEVEL
              </p>
            </div>
          </div>

          <div
            className="row gy-4 align-items-center"
            style={{ marginTop: "10px" }}
          >
            <div className="col-md-12 text-center d-md-block d-none">
              <Link
                to="/shop"
                className="btn text-heading border-neutral-600 hover-bg-neutral-600 hover-text-white py-16 px-24 flex-center d-inline-flex rounded-pill gap-8 fw-medium"
                tabIndex={0}
              >
                Shop Now <i className="ph ph-shopping-cart text-xl d-flex" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigDealOne;
