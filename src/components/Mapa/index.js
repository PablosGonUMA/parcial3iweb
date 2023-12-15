"use client"
import dynamic from "next/dynamic";
//import { createContext } from 'react';

const Mapa = dynamic(() => import('./mapa'), {
    ssr: false
});

export default Mapa;