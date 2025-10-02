import React from "react";
const GetInTouch =()=>{
    return (
    <>
    <section className="shipping mb-40 mt-40 " id="shipping">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-xxl-4 col-sm-6">
                        <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
                            <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                               <i className="ph-fill ph-phone-call" />

                            </span>
                            <div className="">
                                <h6 className="mb-0">+00 123 456 789</h6>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-sm-6">
                        <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
                            <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                                 <i className="ph-fill ph-envelope-simple" />
                            </span>
                            <div className="">
                                <h6 className="mb-0">  info@udemandme.com </h6>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-sm-6">
                        <div className="shipping-item flex-align gap-16 rounded-16 bg-main-two-50 hover-bg-main-100 transition-2">
                            <span className="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0">
                               <i className="ph-fill ph-map-pin" />
                            </span>
                            <div className="">
                                <h6 className="mb-0"> 789 Inner Lane, California, USA</h6>
                               
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    </>);
}
export default GetInTouch;