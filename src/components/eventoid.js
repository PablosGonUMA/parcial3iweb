//import 'leaflet/dist/leaflet.css'
import { createContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Mapa from './Mapa';
import { Container } from 'react-bootstrap';


export default async function EventoID({ id }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    
    const res = await fetch(`${apiUrl}/api/eventos/${id}`);
    const evento = await res.json();

    return (
        <Container>
            <h1>{evento.nombre}</h1>
            <img src={evento.imagen}/><br/>
            Organizador: {evento.organizador}<br/>
            <Mapa pos={[Number(evento.lat), Number(evento.lon)]} eventos={[evento]}/>
        </Container>
    );
}