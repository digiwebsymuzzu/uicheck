import { useEffect, useState } from "react";

const Preloader = () => {
  let [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setActive(false);
    }, 500);
  }, []);

  return (
    <>
      {active ? (
        <div className="preloader">
          <img src="assets/images/icon/preload.png" alt="" />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Preloader;
