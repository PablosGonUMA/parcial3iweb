//import 'leaflet/dist/leaflet.css'
import { createContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import style from '../../app/page.module.css'

import L from 'leaflet';

const myIcon = new L.Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/animal-6/100/28-1024.png',
    iconRetinaUrl: 'https://cdn4.iconfinder.com/data/icons/animal-6/100/28-1024.png',
    iconAnchor: [25, 50], // cambiar según el tamaño de tu imagen
    popupAnchor: [-3, -76], // cambiar según el tamaño de tu imagen
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [50, 50], // cambiar según el tamaño de tu imagen
});


function Mapa({ pos = [12.505, -10.09], paradas }) {
    let posi;
    console.log("Paradas: ", paradas);
    paradas.map(parada => {
        console.log(`Parada: ${parada.nombreParada}, lat: ${parada.lat}, lon: ${parada.lon}`)
    });
    return (
        <MapContainer className={style.map} center={pos} zoom={15} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                paradas.map(parada => (
                    <Marker position={[parada.lat, parada.lon]} icon={myIcon}>
                        <Popup>
                            {parada.nombreParada}<br/>
                            {parada.linea}
                        </Popup>
                    </Marker> 
                ))
            }
            <Marker position={pos} icon={myIcon}>
                <Popup>
                    Ubicaci&oacute;n por defecto.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Mapa;