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
    if (session?.user){
        return (
            <>{children}</>
        )
    } else {
        return (<div>
            <Button onClick={() => {signIn("google", { callbackUrl: "/",}).then(() => {
                console.log("Sesión iniciada correctamente")
            })}} className="bg-sky-400 px-3 py-2 rounded"> Iniciar sesi&oacute;n </Button>
        </div>)
    }
}

function signInSuccesful() {
    console.log("Sesión iniciada correctamente");
}