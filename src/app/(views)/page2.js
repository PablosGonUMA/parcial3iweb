"use client"
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-bootstrap"
import { Image } from "next/image"

export default async function Home() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const eventos = await fetch(`${apiUrl}/api/eventos`)

    //ctrl+mayus+r
    return (
        <div>
            
            <div>
                <h1>Buscar eventos</h1>
                
            </div>
            
            <form onSubmit={async (e) => {
                e.preventDefault();

                //const formData = new FormData(e.target);
                //formData.append("image", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: JSON.stringify({ image: file }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setImageUrl(data.url);
                } else {
                    console.error("Error en la solicitud:", response.statusText);
                    // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                }
            }}>
                <input
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
                <Button type="submit">Enviar</Button>
            </form>
            {
                imageUrl && (
                    <img src={imageUrl} alt="" />
                )
            }
            <br/>
            <div>
                <Link href="/api/loginlog">Ver log de usuario</Link>
            </div>
            <br/>
            <div>
                <Link href="/api/mapaLog">Ver log de mapa</Link>
            </div>
        </div>
    );
}