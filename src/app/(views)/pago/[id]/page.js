"use client"
import Link from "next/link";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter } from 'react-bootstrap';
import { Image } from "next/image"
import Mapa from "@/components/Mapa";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Home({params}) {

    const [concepto, setConcepto] = useState('');
    const [importe, setImporte] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [localizacion, setLocalizacion] = useState('');
    const [token, setToken] = useState('')

    const { data: session } = useSession();
    const id = params.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${localizacion}`)
    const coord = await res.json()

    console.log(coord)

    let lat = 0
    let lon = 0

    if(coord[0]) {
        lat = coord[0].lat
        lon = coord[0].lon
        console.log(`Latitud: ${coord[0].lat}, Longitud: ${coord[0].lon}`);
    } else {
        console.log('No se encontraron resultados');
    }
    
    const responseImg = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ image: file }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    let data;

    if (responseImg.ok) {
        data = await responseImg.json();
        console.log(JSON.parse(data.body))
        setImageUrl(JSON.parse(data.body).url);

    } else {
        console.error("Error en la solicitud:", responseImg.statusText);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }

    const response = await fetch(`/api/pagos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          concepto: concepto,
          importe: importe,
          email: session.user.email,
          token: session.token,
          lat: lat,
          lon: lon,
          codPostal: "0",
          imagen: imageUrl
        }),
      });

    if (response.ok) {
      console.log('Valoración enviada con éxito');
      window.location.href = `/`
    } else {
      console.error('Error al enviar la valoración', JSON.stringify({
        concepto: concepto,
        importe: importe,
        email: session.user.email,
        token: session.token,
        lat: lat,
        lon: lon,
        codPostal: "0",
        imagen: imageUrl
      }));
    }
  };

    //ctrl+mayus+r
    return (
        <Container>
            <Container>
            <h1>Crear evento</h1>
            <form className='text-end' onSubmit={handleSubmit}>
                Concepto: <input
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                /><br/>
                Lugar: <input
                    value={localizacion}
                    onChange={(e) => setLocalizacion(e.target.value)}
                /><br/>
                importe: <input
                    value={importe}
                    onChange={(e) => setImporte(e.target.value)}
                /><br/>
                Imagen:<input
                    type="file"
                    onChange={(e) => {
                        //setFile(e.target.files[0]);
                        const file = e.target.files[0];
                        const reader = new FileReader();

                        reader.onloadend = () => {
                            setFile(reader.result);
                        };

                        reader.readAsDataURL(file);
                    }}
                />

                <button type="submit" variant="primary" >Enviar</button>
            </form>
            </Container>
        </Container>
    );
}