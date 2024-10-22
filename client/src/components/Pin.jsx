import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

export default function Pin({item}){
    return(
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div>
                    <Link to={`/posts/${item.id}`}>{item.title}</Link>
                    <div>{item.bedroom} bedroom</div>
                    <b>${item.price}</b>
                </div>
            </Popup>
        </Marker>
    )

}