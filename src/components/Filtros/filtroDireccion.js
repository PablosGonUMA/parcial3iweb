"use client"
import { Container, Button } from 'react-bootstrap';
export default function FiltroDireccion() {

    const handler = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`/api/paradas?dir=dir`)
    
        if (response.ok) {
          console.log('Valoración enviada con éxito');
        } else {
          console.error('Error al enviar la valoración');
        }
    };

    return (
        <Container>
            <form onSubmit={handler} >
                <label htmlFor="linea">Introduce una direcci&oacute;n:&nbsp;</label>
                <input type="input" id="dir" name="Direccion"/><br/>
                
                <Button type='submit'>FILTRA</Button>
            </form>
        </Container>
    );
}