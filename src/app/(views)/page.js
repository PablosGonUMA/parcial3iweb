import Link from "next/link";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter, Form, CardSubtitle } from 'react-bootstrap';
import { Image } from "next/image"
import Mapa from "@/components/Mapa";
import 'leaflet/dist/leaflet.css'
import Saldo from "@/components/saldo";

export default async function Home() {

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${apiUrl}/api/pagos`)
    const pagos = await res.json()

    //ctrl+mayus+r
    return (
        <Container>
            <Saldo pagos={pagos}/>
            <a href="/crear">Anotar pago</a>
            {
            pagos.map((pago) => (
                <Col key={pago._id} className='mb-3'>
                            <Card className='text-center h-100 w-100'>
                                    <CardImg className='flex-fill' src={pago.imagen} alt={pago.nombre} />
                                    <CardTitle className='text-wrap mx-2'>{pago.concepto} ({pago.importe}€)</CardTitle>
                                    <CardSubtitle>{pago.email}</CardSubtitle>
                                    <Link href={`/pago/${pago._id}`} passhref="true" className='text-decoration-none'>Editar</Link>
                            </Card>
                        </Col>
            ))
            }
            <Mapa eventos={pagos} pos={[pagos[0].lat, pagos[0].lon]}/>
        </Container>
    );
}