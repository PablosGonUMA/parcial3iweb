"use client"
import Link from "next/link";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter } from 'react-bootstrap';
import { Image } from "next/image"
import Mapa from "@/components/Mapa";
import { useState } from "react";

export default function Home() {

    const [nombre, setNombre] = useState('');
    const [organizador, setOrganizador] = useState('');
    const [lugar, setLugar] = useState('');
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');



      
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        console.log(data);
        setImageUrl(data.url);
    } else {
        console.error("Error en la solicitud:", responseImg.statusText);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
    }

    const response = await fetch(`/api/eventos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          organizador: organizador,
          lugar: lugar,
          lat: "0",
          lon: "0",
          imagen: "La imagen está subida pero da error al obtener el enlace para crear el evento"
        }),
      });

    if (response.ok) {
      console.log('Valoración enviada con éxito');
      window.location.href = `/`
    } else {
      console.error('Error al enviar la valoración');
    }
  };

    //ctrl+mayus+r
    return (
        <Container>
            <h1>Crear evento</h1>
            <form className='text-end' onSubmit={handleSubmit}>
                Nombre: <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                /><br/>
                Organizador: <input
                    value={organizador}
                    onChange={(e) => setOrganizador(e.target.value)}
                /><br/>
                Lugar: <input
                    value={lugar}
                    onChange={(e) => setLugar(e.target.value)}
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
    );
}