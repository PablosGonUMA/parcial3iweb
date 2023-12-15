"use client"
import {Container, Button} from 'react-bootstrap';
export default function FiltroLineas({ lineas, linea, sentido }) {

    console.log(lineas);

    const handler = async (e) => {
        e.preventDefault();
    
        const response = await fetch(`/api/paradas?linea=${linea},sentido=${sentido}`)
    
        window.location.href

        if (response.ok) {
          console.log('Parada enviada con éxito');
        } else {
          console.error('Error al enviar la valoración');
        }
    };

    return (
        <Container>
            <form onSubmit={handler} >
                <label htmlFor="linea">Selecciona una línea:&nbsp;</label>
                
                <select id="linea" value={lineas} onChange={handler} >
                    
                    <option value="" defaultValue>
                        Todas
                    </option>
                    {lineas.map((linea) => (
                    <option key={linea} value={linea}>
                        {linea}
                    </option>
                    ))}
                </select><br/>
                <label for="s1">Sentido 1:&nbsp;</label>
                <input type="radio" id="s1" name="sentido" value="1"/><br/>
                
                <label for="s2">Sentido 2:&nbsp;</label>
                <input type="radio" id="s2" name="sentido" value="2"/><br/>

                <Button type='submit'>FILTRA</Button>
            </form>
        </Container>
    );
}
