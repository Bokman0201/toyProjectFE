import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoliState";

export const Headers = (props) => {
    const [user,setUser] = useRecoilState(userState);
    const [seller, setSeller] = useState("");

    useEffect(()=>{
        if(user !==null){
            const seller = user.memberSeller;

            setSeller(seller);
        }
    },[user])
    
    const id = sessionStorage.getItem("memberId");
    const [memberId, setMemberId] = useState(null);


    const handleLogout = () => {
        const result = window.confirm("로그아웃 할거냐");

        if(result){
            sessionStorage.removeItem("memberId");
            setUser(null);
        }
    }



    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="/home">{user !== null ? (user.memberId) : (<>before login</>)}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            <Nav>
                {user === null ? (
                    <Nav.Link href="/memberLogin">logIn</Nav.Link>
                ) : (
                    <Nav.Link onClick={handleLogout}>logout</Nav.Link>
                )}
                {user === null ? (
                    <Nav.Link href="/memberJoin">join</Nav.Link>
                ) : (
                    <Nav.Link href="#">mypage</Nav.Link>
                )}
                {seller ==="Y"? (<Nav.Link href="/addProduct">addProduct</Nav.Link>):(<></>)}
            </Nav>
            </Navbar.Collapse>

        </Navbar>
    );
}