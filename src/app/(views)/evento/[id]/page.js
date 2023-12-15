import Link from "next/link";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter, Form } from 'react-bootstrap';
import { Image } from "next/image"
import Mapa from "@/components/Mapa";
import 'leaflet/dist/leaflet.css'


export default async function Home({params}) {

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const id = params.id;
    
    const res = await fetch(`${apiUrl}/api/eventos/${id}`);
    const evento = await res.json();

    console.log(evento);

    //ctrl+mayus+r
    return (
        <Container>
            <h1>{evento.nombre}</h1>
            <img src={evento.imagen}/><br/>
            Organizador: {evento.organizador}<br/>
            <Mapa pos={[Number(evento.lat), Number(evento.lon)]} eventos={[evento]} />
        </Container>
    );
}