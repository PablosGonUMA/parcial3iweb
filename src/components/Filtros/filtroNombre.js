"use client"
import { Container, Button } from 'react-bootstrap';
import { useState } from 'react';
export default function FiltroNombre({filtrar}) {
    const [nombre, setNombre] = useState('');
    const handleSubmit2 = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`/api/paradas?nombre=${nombre}`)
    
        if (response.ok) {
            filtrar(await response.json());
            console.log('Filtro realizado con éxito');
        } else {
            console.error('Error al enviar el filtro');
        }
    };

    const handleChange = (e) => {
        setNombre(e.target.value);
    }

    return (
        <Container>
            <form onSubmit={handleSubmit2} onChange={handleChange}>
                <label htmlFor="linea">Introduce el nombre de la calle</label> <br/>
                <input type="input" id="calle" name="nombre"/><br/>
                
                <Button type='submit'>FILTRA</Button>
            </form>
        </Container>
    );
}