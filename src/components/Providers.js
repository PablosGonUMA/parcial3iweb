"use client"
import { SessionProvider, useSession, signIn } from "next-auth/react";
import { Button, Container } from "react-bootstrap";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            <CheckSession>
                {children}
            </CheckSession>
        </SessionProvider>
    );
}

export function CheckSession({children}) {
    const { data: session } = useSession();
    if (session?.user) return (
        <>{children}</>
    );
    else return (
        <Container className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
            <Button onClick={async () => {await signIn("google", { callbackUrl: "/mapa",})}} className="mx-auto bg-sky-400 px-3 py-2 rounded"> Iniciar sesi&oacute;n</Button>
            {/*{async () => {await signIn("google", { callbackUrl: "/succes",})}}*/}
        </Container>
    );
}

function signInSuccesful() {
    console.log("Sesión iniciada correctamente");
}