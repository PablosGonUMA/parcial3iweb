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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`/api/eventos/${id}`, {
            method: 'DELETE'
          });
    
        if (response.ok) {
          console.log('Valoración enviada con éxito');
          window.location.href = `/`
        } else {
          console.error('Error al enviar la valoración');
        }

    }

    //ctrl+mayus+r
    return (
        <Container>
            <h1>{evento.nombre}</h1>
            <img src={evento.imagen}/><br/>
            Organizador: {evento.organizador}<br/>
            <Link href={`/evento/${evento._id}/editar`}>Editar</Link>
            <Link href="/evento/borrar">Borrar</Link>
            <Mapa pos={[Number(evento.lat), Number(evento.lon)]} eventos={[evento]} />

        </Container>
    );
}