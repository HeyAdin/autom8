import React from "react";
import { Container } from "../../components/container";
import { NavBar } from "../../components/navbar";

export default function SigninLayout({children}:{children:React.ReactNode}){
    return <Container >
        <NavBar className="font-inter"></NavBar>
        {children}
    </Container>
}