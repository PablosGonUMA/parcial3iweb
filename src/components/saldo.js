"use client"
import { createContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Mapa from './Mapa';
import { Container } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

export default function Saldo({ pagos }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    let totalYo = 0;
    let mediaUsuarios = 0;
    let usuarios = [];

    const { data: session } = useSession();

    pagos.forEach(pago => {
        if(pago.email == session.user.email){
            totalYo += pago.importe;
        }
        mediaUsuarios += pago.importe;
        if(!usuarios.includes(session.user.email)){
            usuarios.push(session.user.email)
        }
    });

    mediaUsuarios = mediaUsuarios / usuarios.length;
    
    const saldo = totalYo - mediaUsuarios

    console.log(saldo, totalYo, mediaUsuarios, usuarios)

    return (
        <Container>
            <h2>Saldo: {saldo}</h2>
        </Container>
    );
}