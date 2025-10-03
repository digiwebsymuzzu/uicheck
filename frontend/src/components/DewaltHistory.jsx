import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
const DewaltHistory = () => {
  const [videos, setVideos] = useState([]);
  const settings = {
    arrows: true, // Enable arrows for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // ✅ Enable autoplay
    autoplaySpeed: 3000, // ✅ Slide every 3 seconds
    responsive: [
      {
        breakpoint: 768, // for tablets and smaller
        settings: {
          arrows: false, // optional: hide arrows on mobile
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // for phones
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://147.93.108.82:5000/api/dewalt");
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
            <div className="col-lg-12">
              <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                <h4 className="text-bold headingsize ">
                  DeWalt <span className="primecolor">History</span>
                </h4>

                <ul className="mt-32">
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      DeWalt history is what no one has to say, but the name
                      speaks for itself. The company was founded and started in
                      1923 by Raymond E. Dewalt in America, and was reorganized
                      and reincorporated in 1947 as DeWalt Inc. American Machine
                      & Foundry Co. Inc., after buying the company in 1960, sold
                      it to Black and Decker in the same year. DeWalt, Black &
                      Decker, Craftsman, Porter-Cable, and more — are all owned
                      by the same company, Stanley Black & Decker
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      DeWalt is a global manufacturer of hand tools, power
                      tools, power tool attachments, and accessories. DeWalt and
                      its subsidiaries have assembly units in Mexico, China,
                      Taiwan, and India, using components manufactured in
                      Mexico, China, Taiwan, the Czech Republic, Brazil, Korea,
                      Japan, Thailand, and the USA. DeWalt has 7 manufacturing
                      facilities in the USA that produce popular tools including
                      drills, reciprocating saws, impact drivers, etc. DeWalt
                      can be found worldwide with more than 500 factories, and
                      its headquarters is based in Baltimore, Maryland, USA.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      A trustworthy and reliable name in hand tools and power
                      tools, with a global presence and unbeatable quality at
                      competitive prices, DeWalt is now a popular brand of tools
                      for commercial contractors.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      DeWalt's product innovation team strives to understand
                      both the product and the process, aiming to develop the
                      best and easiest solutions while taking all safety
                      parameters into consideration.
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      DeWalt expanded its line of tools using ELU’s technology.
                      Today, DeWalt manufactures and sells more than 300
                      different power tools and over 1,000 accessories.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="newsletter pb-40">
        <div className="container container-lg">
          <div className="newsletter-box position-relative rounded-16 flex-align gap-16 flex-wrap z-1">
            <img
              src="assets/images/bg/newsletter-bg.png"
              alt=""
              className="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
            />
            <div className="row align-items-center">
              <div className="col-xl-6">
                <div>
                  <div className="d-flex justify-content-start mb-4">
                    <img
                      src="assets/images/about/dewalt.svg"
                      alt="DeWalt Logo"
                      className=" d-cover-img rounded-16 about"
                    />
                  </div>
                  <div className="dewalt-p">
                    <h1 className="text-white mb-12 dewalt-h headingh">
                      Videos about Dewalt History
                    </h1>

                    <p className="text-light ">
                      A reliable name in hand tools and power tools with a
                      strong global presence. top-tier quality at highly
                      competitive prices. A popular brand among commercial
                      contractors.DeWalt lead the industry with a commitment to
                      innovation, safety, and performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-xl-6 text-center d-xl-block d-none ">
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DewaltHistory;
