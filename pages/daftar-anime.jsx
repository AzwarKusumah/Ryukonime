import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Header from "./components/head";
import { fetchDaftar } from "@/components/apiData";
import { Row, Container, Col, ListGroup } from "react-bootstrap";

export default function DaftarAnime() {
  const [detailAnime, setDetailAnime] = useState();

  async function getDaftar() {
    const res = await fetchDaftar();
    const detail = DaftarHandle(res.anime_list);
    setDetailAnime(detail);
  }

  function DaftarHandle(res) {
    const arr = [];
    for (const d of res) {
      arr.push(
        <h2 className="mb-2 mt-2" style={{ fontFamily: "Poppins" }}>
          {d.name}
        </h2>
      );
      if (Array.isArray(d.animes)) {
        for (const e of d.animes) {
          arr.push(
            <ListGroup>
              <ListGroup.Item
                action
                style={{ fontFamily: "Poppins" }}
                href={`/${e.endpoint}`}
              >
                {e.title}
              </ListGroup.Item>
            </ListGroup>
          );
        }
      } else {
        console.log("error");
      }
    }
    return arr;
  }

  useEffect(() => {
    getDaftar();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <div className="mb-3">
          <h2 style={{ fontFamily: "Poppins" }} className="container mt-5">
            {"Daftar Anime"}
          </h2>
        </div>
        <Container>
          <hr />
          <Row>
            <Col className="">{detailAnime}</Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
