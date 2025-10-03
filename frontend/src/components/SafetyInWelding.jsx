import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
const SafetyInWelding = () => {
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
        const res = await fetch("https://udemandme.cloud/api/safety");
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
                  Safety <span className="primecolor">In Welding</span>
                </h4>

                <ul className="mt-32">
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      Safety in welding is one of the key responsibilities in
                      the fabrication industry. While every technician is aware
                      of this, overconfidence can sometimes lead them to ignore
                      essential safety measures. It is important to understand
                      that life is precious
                    </span>
                  </li>
                  <li className="text-gray-400 mb-14 flex-align gap-14">
                    <span className="text-md text-gray-900 ">
                      We must protect it while giving our best through our
                      skills. Following proper safety requirements during
                      welding should always be a priority, without exception.
                      Regular safety training and refresher sessions should be
                      conducted to keep awareness high. Using protective gear
                      and maintaining equipment properly is not just a rule but
                      a necessity. A small mistake in welding can lead to
                      serious injuries or even cost lives, so every step must be
                      taken with care.
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
                  <div className="dewalt-p">
                    <h1 className="text-white mb-12 dewalt-h headingh">
                      Links for Best Practice of Safety in Welding
                    </h1>

                    <p className="text-light ">
                      We should thank the YouTube video creators for guiding us
                      and helping improve our safety and skills. To explore
                      welding methods, check out our blog post on "Welding
                      Techniques to Be Used." If you find these videos helpful,
                      please share them with your friends and colleagues, and
                      show appreciation to the creators.
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
export default SafetyInWelding;
