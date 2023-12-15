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
    if (session?.user || true) return (
        <>{children}</>
    );
}

function signInSuccesful() {
    console.log("Sesión iniciada correctamente");
}