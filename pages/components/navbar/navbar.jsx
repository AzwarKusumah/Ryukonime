import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function NavbarFun() {
  return (
    <div>
      <Navbar bg="danger" expand="lg">
        <Container fluid className="px-5">
          <Link href="/">
            <Image
              alt="logo"
              src="/ryukonime_logo.png"
              width={150}
              height={70}
            />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="ms-5 " id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link
                className="text-light"
                style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                href="/daftar-komik/page/1"
              >
                JADWAL RILIS
              </Nav.Link>
              <Nav.Link
                className="text-light"
                style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                href={`/daftar-anime`}
              >
                DAFTAR ANIME
              </Nav.Link>
              <Nav.Link
                className="text-light"
                style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                href={`https://komik.ryukoproject.app/`}
              >
                KOMIK
              </Nav.Link>
            </Nav>
            <div className="d-flex" id="search">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                id="query"
              />
              <Button style={{ fontFamily: "Poppins" }} variant="light">
                Search
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
