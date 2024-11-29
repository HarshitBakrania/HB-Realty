import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Icon } from "leaflet";

export default function Pin({item}){

    const defaultIcon = new Icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })

    return(
        <Marker position={[item.latitude, item.longitude]} icon={defaultIcon}>
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