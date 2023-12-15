import 'leaflet/dist/leaflet.css'
import { Container, Button } from 'react-bootstrap';
import Mapa from '@/components/Mapa';
import FiltroLineas from '@/components/Filtros/filtrolineas';
import FiltroNombre from '@/components/Filtros/filtroNombre';
import FiltroDireccion from '@/components/Filtros/filtroDireccion';

export default async function Home({ params }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const paradas = await fetch(`${apiUrl}/api/paradas`).then(res => res.json());
    const lineas = await fetch(`${apiUrl}/api/paradas/lineas`).then(res => res.json());

    return (
        <Container fluid className='ps-0'>
            <FiltroLineas lineas={lineas} linea={params.linea} sentido={params.sentido} /> 
            <FiltroNombre />
            <FiltroDireccion />
            <Container id='ubicacion' fluid className='ps-0'>
                <Mapa pos={[Number(36.734667), Number(-4.426399)]} paradas={paradas} />
            </Container>
        </Container>
    );
}