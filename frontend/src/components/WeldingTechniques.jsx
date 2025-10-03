import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
const WeldingTechniques = () => {
  const [videos, setVideos] = useState([]);
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 992, // For tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // For mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("https://147.93.108.82:5000/api/welding");
        const data = await res.json();
        if (data.success) setVideos(data.videos);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, []);
  return (
    <>
      <section className="contact py-80">
        <div className="container container-lg">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                <h4 className="text-bold headingsize ">
                  Welding Techniques{" "}
                  <span className="primecolor">To Be Used</span>
                </h4>

                <ul className="mt-32">
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Welding is the main component of fabrication.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      The welding process sticks together two metals and forms
                      one new product.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      In layman language, we can say that attaching two metals
                      by way of using consumables and heating technology
                      generates a new product.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Welding produces around 3400K of heat.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      For the safety of ourselves, we should always follow
                      safety measures while performing welding techniques to be
                      used.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Moreover, we should also know how to do and what
                      precautionary measures to take while welding at different
                      surfaces and in different positions.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Different metals require different temperatures to weld.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Arc welding is usually performed with an arc temperature
                      of roughly 10,000 degrees Fahrenheit.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Of course, it is not the extreme temperature, but it is
                      still cooler than plasma torch welding, which can reach up
                      to 50,000 degrees Fahrenheit.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="">
                <img
                  src="assets/images/about/welding-tech.png"
                  alt=""
                  className="cover-img rounded-16 about"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container container-lg pt-60">
          <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
            <div className="row gy-5">
              <div className="col-lg-6 px-20">
                <h6 className="mb-24">
                  References for Welding Techniques to Be Used on Different
                  Metals
                </h6>
                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                  For quick reference, you can click on the related YouTube
                  links:
                </h6>
                <ul className="mt-10">
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      MIG Welding Square Tubing:
                    </h6>
                    <a href="https://www.youtube.com/watch?v=8NUFYGE4Lug">
                      <span className="text-xl-y d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle-y prime-icon-y">
                        <i className="ph ph-play"></i>
                      </span>
                    </a>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      Stick Welding Square Tubing:
                    </h6>
                    <a href="https://www.youtube.com/watch?v=7IHGYdkKHD0">
                      <span className="text-xl-y d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle-y prime-icon-y">
                        <i className="ph ph-play"></i>
                      </span>
                    </a>
                    <span className="text-md text-gray-900 "></span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      Different Ways to Add Box Section Corners:
                    </h6>
                    <a href="https://www.youtube.com/watch?v=FNAPc8VtHA0">
                      <span className="text-xl-y d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle-y prime-icon-y">
                        <i className="ph ph-play"></i>
                      </span>
                    </a>
                    <span className="text-md text-gray-900 "></span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      How to MIG Like TIG Weld:
                    </h6>
                    <a href="https://www.youtube.com/watch?v=VCaG5N39mU0">
                      <span className="text-xl-y d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle-y prime-icon-y">
                        <i className="ph ph-play"></i>
                      </span>
                    </a>
                    <span className="text-md text-gray-900 "></span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      Welding Thin Wall Square Tube with Stick Welder:
                    </h6>
                    <a href="https://www.youtube.com/watch?v=vNmKqG5Qtic">
                      <span className="text-xl-y d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle-y prime-icon-y">
                        <i className="ph ph-play"></i>
                      </span>
                    </a>
                    <span className="text-md text-gray-900 "></span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      TIG Welding Aluminum Fabrication – Sheet Metal Forming:
                    </h6>
                    <a href="https://www.youtube.com/watch?v=WPLHl-rzZPo">
                      <span className="text-xl-y d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle-y prime-icon-y">
                        <i className="ph ph-play"></i>
                      </span>
                    </a>
                    <span className="text-md text-gray-900 "></span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      Structural Welding Tips – Facility COMPLETE:
                    </h6>
                    <a href="https://www.youtube.com/watch?v=sxCHphPfjeA">
                      <span className="text-xl-y d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle-y prime-icon-y">
                        <i className="ph ph-play"></i>
                      </span>
                    </a>
                    <span className="text-md text-gray-900 "></span>
                  </li>
                </ul>
                <div>
                  <div>
                    <h6 className="mb-24 title text-lg fw-semibold  mt-24 ">
                      Consumables &{" "}
                      <span className="primecolor">Accessories</span> :
                    </h6>

                    <ul className="mt-20">
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Mig wire
                          <span className="text-gray-500">
                            <span className="text-gray-500 px-1"></span>{" "}
                          </span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Electrode<span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Contact Tips
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>

                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Nozzles of Different types
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Welding Helmets and Googles
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Gas Pipes<span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 px-20">
                <div>
                  <h6 className="mb-24 ">
                    Most commonly used current welding techniques are
                  </h6>

                  <ul className="mt-32">
                    <ul className="mt-32">
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          SMAW Welding :
                          <span className="text-gray-500">
                            <span className="text-gray-500 px-1">
                              Shielded Metal Arc Welding
                            </span>{" "}
                          </span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          GTAW Welding :
                          <span className="text-gray-500 px-1">
                            Gas Tungsten Arc Welding
                          </span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          GMAW Welding :
                          <span className="text-gray-500 px-1">
                            Gas Metal Arc Welding :
                          </span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          FCAW Welding :
                          <span className="text-gray-500 px-1">
                            Flux-Cored Arc Welding{" "}
                          </span>
                        </span>
                      </li>
                    </ul>

                    <h6 className="title text-lg fw-semibold mt-12 mb-8 mt-24">
                      According to AWS, there are five basic types of welding
                      joints commonly used in the industry
                    </h6>

                    <ul className="mt-32">
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Butt Joint<span className="text-gray-500"> </span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Tee Joint
                          <span className="text-gray-500"> </span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Lap Joint
                          <span className="text-gray-500"> </span>
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14 px-20">
                        <span className="w-20 h-20 bg-main-50 text-light text-xs flex-center rounded-circle">
                          <i className="ph ph-check"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Corner Joint
                          <span className="text-gray-500"> </span>
                        </span>
                      </li>
                    </ul>
                  </ul>
                  <div>
                    <h6 className="mb-5 primecolor mt-24">Conclusion</h6>

                    <ul className="mt-20">
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900 ">
                          While performing welding, it is essential to follow
                          proper welding techniques and take all necessary
                          safety measures to keep yourself and others safe. We
                          should always keep track of safety protocols and avoid
                          taking shortcuts, as they may lead to serious injuries
                          .
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900 ">
                          Wearing appropriate personal protective equipment
                          (PPE) such as welding helmets, gloves, flame-resistant
                          clothing, and safety boots is crucial. Ensuring proper
                          ventilation in the workspace, inspecting tools before
                          use, and maintaining a clean working environment are
                          also vital steps to minimize risks and promote a safe
                          welding experience.
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900 ">
                          If we find any other helpful videos on YouTube, we
                          will add them here.
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900">
                          If you have any such video that could benefit others,
                          please feel free to{" "}
                          <a
                            href="https://wa.me/971502530888"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            WhatsApp us at (+971502530888)
                          </a>{" "}
                          or{" "}
                          <a
                            href="mailto:info@udemandme.com"
                            className="text-blue-600 underline"
                          >
                            email us at info@udemandme.com
                          </a>
                          .
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* slider */}

      <section className="pb-40">
        <div className="container container-lg">
          <div className="newsletter-box-new position-relative rounded-16 z-1">
            <Slider {...settings}>
              {videos.map((video) => (
                <div className="p-3" key={video._id}>
                  <div className="ratio ratio-16x9">
                    <iframe
                      width="100%"
                      height="250"
                      src={video.youtubeurl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              ))}
            </Slider>{" "}
          </div>
        </div>
      </section>
    </>
  );
};
export default WeldingTechniques;
