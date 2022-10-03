import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./mapPage.css";
//just some mock data, but remember you'll always need latitude and longitude
// import { amsterdamMuseums } from "../data/data";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShops } from "../store/shops/selector";
import GoToTop from "../../src/components/GoToTop";
import { popupContent } from "./mapPopupStyles";

//Step 1. https://leafletjs.com/examples/quick-start/
//Step 2. https://react-leaflet.js.org/docs/start-setup/

const MapPage = () => {
  // const shops = amsterdamMuseums;

  const shopsArray = useSelector(selectShops);
  // console.log(shopsArray);
  const shops2 = shopsArray.filter((shop) => shop.longitude !== null);
  // console.log(shops2);

  return (
    <>
      {/* to see your map, you need to add height property */}
      {/* center is where the map will get started */}
      <MapContainer
        style={{
          // border: "2px solid",
          // borderRadius: "10px",
          height: "48vmax",
          // height: "100%",
          width: "100%",
          // maxWidth: "1000px",
          // maxHeight: "800px",
          // margin: "0px 19.5%",
        }}
        center={[52.245607, 4.7913]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shops2.map((shop) => (
          // the marker is every pointer you see on the map
          <Marker
            key={shop.commercialName}
            position={[shop.latitude, shop.longitude]}
          >
            {/* when we click on the marker, we see the popup */}
            <div style={popupContent}>
              <Popup className="request-popup">
                <img
                  alt={shop.commercialName}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px 10px 0 0",
                  }}
                  src={shop.imageUrl}
                />
                <NavLink
                  to={`/shops/${shop.id}`}
                  className="nav-link"
                  style={{
                    margin: "5px",
                    fontFamily:
                      "font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
                  }}
                >
                  {shop.commercialName}
                </NavLink>
              </Popup>
            </div>
          </Marker>
        ))}
      </MapContainer>
      <GoToTop />
    </>
  );
};

export { MapPage };
