"use client"
import Link from "next/link";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter, Form } from 'react-bootstrap';
import { Image } from "next/image"
import Mapa from "@/components/Mapa";
import { useState } from "react";

export default function Home() {

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const [codPostal, setCodPostal] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${codPostal}&countrycodes=es`);
        const pos = await res.json();

        const lat = parseFloat(pos[0].lat).toFixed(2)
        const lon = parseFloat(pos[0].lon).toFixed(2)

        window.location.href = `/eventos/${lat}/${lon}`

    }

    //ctrl+mayus+r
    return (
        <Container>
            Buscar eventos:
            <form className='text-end' onSubmit={handleSubmit}>
                <input
                    value={codPostal}
                    onChange={(e) => setCodPostal(e.target.value)}
                />
                <button type="submit" variant="primary" >Enviar</button>
            </form><br/>
            <a href="/evento/crear">Crear evento</a>
        </Container>
    );
}