"use client"
import Link from "next/link";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter, Form } from 'react-bootstrap';
import { Image } from "next/image"
import Mapa from "@/components/Mapa";
import 'leaflet/dist/leaflet.css'
import { useSession } from "next-auth/react";
import EventoID from "@/components/eventoid";


export default function Home({params}) {

    const id = params.id;

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
            <Link href={`/evento/${id}/editar`}>Editar</Link>
            <Link href="/evento/borrar">Borrar</Link>
            <EventoID id={id}/>
        </Container>
    );
}