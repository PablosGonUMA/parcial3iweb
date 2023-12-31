import Link from "next/link";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter } from 'react-bootstrap';
import { Image } from "next/image"
import Mapa from "@/components/Mapa";
import 'leaflet/dist/leaflet.css'


export default async function Home({params}) {

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const codPostal = params.codPostal;

    const res = await fetch(`${apiUrl}/api/eventos?codPostal=${codPostal}`)
    const eventos = await res.json();



    //ctrl+mayus+r
    return (
        <Container>
            <h1>Buscar eventos</h1>

            <Container>
            <Container>
            {
            eventos.map((evento) => (
                <Col key={evento._id} className='mb-3'>
                            <Card className='text-center h-100 w-100'>
                                <Link href={`/evento/${evento._id}`} passhref="true" className='text-decoration-none flex-fill'>
                                    <CardImg className='flex-fill' src={evento.imagen} alt={evento.nombre} />
                                </Link>
                                <Link href={`/evento/${evento._id}`} passhref="true" className='text-decoration-none'>
                                    <CardTitle className='text-wrap mx-2'>{evento.nombre}</CardTitle>
                                </Link>
                            </Card>
                        </Col>
            ))
            }
            </Container>


            <Container className="width: 600px">
                <Mapa pos={[Number(36.71476), Number(-4.27968)]} eventos={eventos} />
            </Container>
            </Container>

        </Container>
    );
}