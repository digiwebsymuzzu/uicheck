import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";

const AnnularCutter = () => {
  const [videos, setVideos] = useState([]);
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
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
        const res = await fetch("https://udemandme.com/api/annular");
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
                  Annular Cutter{" "}
                  <span className="primecolor">(Portable Cutters)</span>
                </h4>

                <ul className="mt-32">
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      An annular cutter is a specialized drill bit used for
                      drilling through steel. Synonyms for annular cutters
                      include Core Drill, Core Cutter, Broach Cutter, Trepanning
                      Drill, and Cup-type Cutter.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      These cutters are mostly used with magnetic drill base
                      machines but can also be used with machine tools such as
                      milling machines and large drill presses, provided the
                      appropriate tool holders are used.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      An annular cutter removes only the outer edge of the hole
                      (periphery), producing accurate, burr-free holes with
                      close tolerances.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      For example, when a large hole is needed, traditional
                      drilling usually requires pre-drilling in several steps.
                      However, with an annular cutter, the desired hole size can
                      be achieved in a single step.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      The solid slug (scrap) generated during cutting can also
                      be reused for specific applications, if required. Wastage
                      is minimal compared to conventional drilling methods.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Annular cutters can drill larger holes with less force and
                      time than a standard twist drill bit.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-center">
              <div className="">
                <img
                  src="assets/images/about/wholecutter.png"
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
                <h6 className="mb-24">Common Types of Annular Cutters</h6>

                <ul className="">
                  <li className=" px-3 text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      High-Speed Steel (HSS)
                    </span>
                  </li>
                  <li className="px-3 text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Tungsten Carbide Tipped (TCT)
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14 text-dark">
                    <span className="text-md text-gray-900 ">
                      Available sizes range from 12 mm (1/2”) to 200 mm (7 7/8”)
                      and beyond, with cutting depths of 30 mm, 55 mm, 75 mm,
                      and 110 mm commonly available.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      They are best used with magnetic drill machines,
                      especially in vertical or overhead drilling situations,
                      where traditional drilling becomes difficult.
                    </span>
                  </li>
                </ul>
                <h6 className="mb-24">Annular Cutter Geometry</h6>

                <ul className="">
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Though similar in function to hole saw cutters, annular
                      cutters differ significantly in geometry and material.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      The angle on the cutting teeth greatly impacts cutter
                      performance. More precision in angles means longer tool
                      life and greater cutting accuracy.
                    </span>
                  </li>
                </ul>
                <h6 className="mb-24 ">Top Annular Cutter Brands in the UAE</h6>
                <h6 className="mb-10 title text-lg fw-semibold  mt-10 ">
                  You can find reliable cutters from popular manufacturers such
                  as:
                </h6>
                <ul className="mt-10">
                  <li className="d-flex align-items-start gap-8 mb-20">
                    <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                      <i className="ph ph-check icon-s"></i>
                    </span>
                    <span className="text-heading fw-medium">
                      Macstroc
                      <span className="text-gray-500">
                        <span className="text-gray-500 px-1"></span>{" "}
                      </span>
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-8 mb-20">
                    <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                      <i className="ph ph-check icon-s"></i>
                    </span>
                    <span className="text-heading fw-medium">
                      Euroboor
                      <span className="text-gray-500">
                        <span className="text-gray-500 px-1"></span>{" "}
                      </span>
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-8 mb-20">
                    <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                      <i className="ph ph-check icon-s"></i>
                    </span>
                    <span className="text-heading fw-medium">
                      DeWalt
                      <span className="text-gray-500">
                        <span className="text-gray-500 px-1"></span>{" "}
                      </span>
                    </span>
                  </li>
                  <li className="d-flex align-items-start gap-8 mb-20">
                    <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                      <i className="ph ph-check icon-s"></i>
                    </span>
                    <span className="text-heading fw-medium">
                      RUKO
                      <span className="text-gray-500">
                        <span className="text-gray-500 px-1"></span>{" "}
                      </span>
                    </span>
                  </li>
                </ul>
                <h6 className="mb-24 ">Types of Annular Cutters</h6>

                <ul className="mt-20">
                  <ul className="mt-10">
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        HSS Cutters (used in 75% of applications due to
                        cost-effectiveness)
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        TCT Cutters (for harder materials like stainless steel,
                        HARDOX steel, and high-tensile steel)
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>

                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-heading fw-medium">
                        <span className="text-dark px-1">
                          Both HSS and TCT annular cutters are available in the
                          UAE at short notice through udemandme.com.
                        </span>
                      </span>
                    </li>
                  </ul>
                </ul>
                <h6 className="mb-24 ">Selection Criteria</h6>

                <ul className="mt-20">
                  <ul className="mt-10">
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        Hole diameter
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        Depth of cut
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>

                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        Material type
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>
                  </ul>
                </ul>
                <h6 className="mb-20 ">Pilot Pin for Annular Cutters</h6>
                <h6 className="mb-10 title text-lg fw-semibold   ">
                  A pilot pin is a nail-like object inserted through the center
                  of the cutter. It serves three key purposes:
                </h6>

                <ul className="">
                  <ul className="">
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        Locates the center of the hole
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        Guides coolant to the cutting zone
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>

                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        Ejects the slug once cutting is complete
                        <span className="text-gray-500 px-1"></span>
                      </span>
                    </li>
                  </ul>
                </ul>
              </div>

              <div className="col-lg-6 px-20">
                <div>
                  <h6 className="mb-24 ">Applications of Annular Cutters</h6>
                  <h6 className="mb-10 title text-lg fw-semibold  mt-10 ">
                    These cutters are designed to drill through various
                    materials, including:
                  </h6>

                  <ul className="mt-20">
                    <ul className="mt-10">
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Carbon Steel
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Stainless Steel
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>

                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Aluminium
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Hard Alloys (e.g., Titanium)
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          HARDOX Steel
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                    </ul>
                  </ul>
                  <h6 className="mb-10 ">Diameter & Depth</h6>

                  <ul className="mt-10">
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-heading fw-medium">
                        <span className="text-dark">
                          These are the two most important parameters for cutter
                          selection.The actual cutter is longer than its rated
                          depth to ensure full drilling capability and
                          accommodate resharpening.
                          <span className="text-gray-500 px-1"></span>{" "}
                        </span>
                      </span>
                    </li>
                  </ul>
                  <h6 className="mb-24 ">Wallet Cashback</h6>

                  <ul className="mt-10">
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        On every purchase, you get 0.5% cashback in your wallet
                        after the return period ends.
                        <span className="text-gray-500">
                          <span className="text-gray-500 px-1"></span>{" "}
                        </span>
                      </span>
                    </li>
                    <li className="d-flex align-items-start gap-8 mb-20">
                      <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                        <i className="ph ph-check icon-s"></i>
                      </span>
                      <span className="text-heading fw-medium">
                        You can use this cashback in your next purchase.
                        <span className="text-gray-500">
                          <span className="text-gray-500 px-1"></span>{" "}
                        </span>
                      </span>
                    </li>
                  </ul>

                  <h6 className="mb-24 ">Accessories Required</h6>

                  <ul className="mt-20">
                    <ul className="mt-10">
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Pilot Pins
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Chuck Arbors
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>

                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Machine Arbors
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                      <li className="d-flex align-items-start gap-8 mb-20">
                        <span className="text-xl d-flex flex-shrink-0 align-items-center justify-content-center rounded-circle prime-icon">
                          <i className="ph ph-check icon-s"></i>
                        </span>
                        <span className="text-heading fw-medium">
                          Sharpening Machines
                          <span className="text-gray-500 px-1"></span>
                        </span>
                      </li>
                    </ul>
                  </ul>
                  <div>
                    <h6 className="mb-5  mt-24">Conclusion</h6>

                    <ul className="mt-20">
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900 ">
                          Annular cutters may be more expensive, but they are
                          significantly more efficient and effective than
                          standard drill bits or hole saws.
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900 ">
                          They are 3 to 4 times faster than conventional twist
                          drills.
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900 ">
                          For all types of annular cutter needs in the UAE,
                          udemandme.com is the most reliable source.
                        </span>
                      </li>
                      <li className="text-gray-400 mb-14 flex-align gap-14">
                        <span className="text-md text-gray-900 ">
                          Whether you require Macstroc, Euroboor, DeWalt, or
                          RUKO brand cutters, udemandme.com offers the best
                          availability and pricing.
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
export default AnnularCutter;
