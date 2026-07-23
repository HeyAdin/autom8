import Link from "next/link";
import { NavBar, navBarLists } from "../../components/navbar";
import React from "react";
import { Container } from "../../components/container";


export default function SignupLayout({children}:{children:React.ReactNode}){
    return <Container >
        <NavBar className="font-inter">
        </NavBar>
        {children}
    </Container>
}