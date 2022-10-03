import Carousel from "react-bootstrap/Carousel";

function CarouselComp() {
  return (
    <Carousel
      style={{
        maxWidth: "1300px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "10px 10px 10px 10px",
        overflow: "hidden",
        marginTop: "30px",
      }}
    >
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dspcsusyv/image/upload/v1662747121/Bukloo/Bukloo_Carousel_vnyyf8.jpg"
            alt="First slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dspcsusyv/image/upload/v1662832781/Bukloo/02_yrrf9v.jpg"
            alt="Second slide"
          />
        </div>
        <Carousel.Caption>
          <h3>Shopping at second-hand stores can be very fun.</h3>
          <p>
            Help our planet by reducing your influence in the carbon production
            chain. Shop nearby, help communities, be part of the circular
            economy.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dspcsusyv/image/upload/v1663925881/Bukloo/Scamproof_d7sgfj.png"
            alt="slide 3"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/dspcsusyv/image/upload/v1662896218/Bukloo/Header_03_p5sfwm.jpg"
            alt="slide 4"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export { CarouselComp };
