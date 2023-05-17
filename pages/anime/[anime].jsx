import React from "react";
import { fetchDetail } from "@/components/apiData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../pages/components/navbar/navbar";
import Header from "../../pages/components/head";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";

export default function AnimePage() {
  const [detailAnime, setDetailAnime] = useState([]);
  const router = useRouter();
  const { anime } = router.query;

  async function getDetail() {
    const res = await fetchDetail(anime);
    setDetailAnime(res);
    console.log(res);
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
          <Row gy={2} className="mb-5">
            <Col md={4} className="mt-5">
              <Image
                src={detailAnime.thumb}
                width={407}
                height={578}
                className="rounded"
              />
            </Col>
            <Col md={6} className="mt-5">
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
        </Container>
      </main>
    </div>
  );
}
