import React from "react";
import { fetchDetail } from "@/components/apiData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../pages/components/navbar/navbar";
import Header from "../../pages/components/head";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Table,
  Button,
} from "react-bootstrap";

export default function AnimePage() {
  const [detailAnime, setDetailAnime] = useState([]);
  const [epsAnimeFirst, setEpsAnimeFirst] = useState([]);
  const router = useRouter();
  const { anime } = router.query;

  async function getDetail() {
    const res = await fetchDetail(anime);
    setDetailAnime(res);
    const episode = EpsHandling(res.eps);
    setEpsAnimeFirst(episode);
  }

  function EpsHandling(eps) {
    const arr = [];
    for (const e of eps) {
      if (e.type == "list") {
        console.log("error");
      } else if (Array.isArray(e.data)) {
        for (const episode of e.data) {
          arr.push(
            <tbody key={episode.title}>
              <tr>
                <td style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                  {episode.title}
                </td>
                <td className="justify-content-end d-flex">
                  <Button
                    variant="danger"
                    href={`/episode/${episode.endpoint}`}
                    style={{ fontFamily: "Poppins" }}
                  >
                    Nonton Anime!
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        }
      }
    }

    return arr;
  }

  useEffect(() => {
    if (!router.isReady) return;
    getDetail();
  }, [router.isReady]);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Container className="mt-5 mb-5">
          <h1 style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
            {detailAnime.main_title}
          </h1>
          <Row gy={2} className="mb-3">
            <Col md={4} className="mt-4">
              <Image
                src={detailAnime.thumb}
                width={407}
                height={578}
                className="rounded img-fluid d-none d-sm-block"
              />
              <Image
                src={detailAnime.thumb}
                width={207}
                height={378}
                className="rounded img-fluid d-block d-sm-none d-lg-none"
              />
            </Col>
            <Col md={6} className="mt-4">
              <ListGroup key={detailAnime.key}>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Alternatif : {"\n"}
                  </span>
                  {detailAnime.japanese}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Producer : {"\n"}
                  </span>
                  {detailAnime.producer}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Tipe : {"\n"}
                  </span>
                  {detailAnime.type}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Status : {"\n"}
                  </span>
                  {detailAnime.status}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Episode : {"\n"}
                  </span>
                  {detailAnime.episodes}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Durasi : {"\n"}
                  </span>
                  {detailAnime.duration}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Tanggal Rilis : {"\n"}
                  </span>
                  {detailAnime.release_date}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Studio : {"\n"}
                  </span>
                  {detailAnime.studio}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Genre : {"\n"}
                  </span>
                  {detailAnime.genre}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
                    Score : ⭐
                  </span>
                  {detailAnime.skor}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <h3 style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
            {"Sinopsis:"}
          </h3>
          <p style={{ fontFamily: "Poppins" }}>{detailAnime.sinopsis}</p>
          <hr />
          <h2
            style={{ fontFamily: "Poppins", fontWeight: "bold" }}
            className="mt-5"
          >
            Episode List
          </h2>
          <div
            className="mt-5"
            style={{
              overflow: "auto",
              height: "500px",
              position: "relative",
              display: "block",
            }}
          >
            <Table className="table mb-0">{epsAnimeFirst}</Table>
          </div>
        </Container>
      </main>
    </div>
  );
}
