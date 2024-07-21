import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

export default function Pin({item}){
    return(
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <img src={item.img} className="w-auto h-auto"></img>
                <div>
                    <Link to={`/${item.id}`}>{item.title}</Link>
                    <span>{item.bedroom} bedroom</span>
                    <b>${item.price}</b>
                </div>
            </Popup>
        </Marker>
    )

}