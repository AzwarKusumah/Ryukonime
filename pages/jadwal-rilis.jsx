import React, { useEffect, useState } from "react";
import Navbar from "./components/navbar/navbar";
import Header from "./components/head";
import { fetchJadwal } from "@/components/apiData";
import { Row, Container, Col, ListGroup } from "react-bootstrap";

export default function Jadwalrilis() {
  const [jadwalRilis, setJadwalRilis] = useState([]);

  async function getJadwalRilis() {
    const res = await fetchJadwal();
    const detail = JadwalHandle(res.schedule);
    setJadwalRilis(detail);
  }

  function JadwalHandle(res) {
    const arr = [];
    for (const j of res) {
      arr.push(
        <h2 className="mb-2 mt-2" style={{ fontFamily: "Poppins" }}>
          {j.day}
        </h2>
      );
      if (Array.isArray(j.animes)) {
        for (const e of j.animes) {
          arr.push(
            <ListGroup key={e.name}>
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
    getJadwalRilis();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <div className="mb-3">
          <h2 style={{ fontFamily: "Poppins" }} className="container mt-5">
            {"Jadwal Rilis"}
          </h2>
        </div>
        <Container>
          <hr />
          <Row>
            <Col>{jadwalRilis}</Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
