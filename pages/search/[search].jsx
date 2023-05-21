import { useEffect, useState, React } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { fetchSearch } from "@/components/apiData";
import Navbar from "../components/navbar/navbar";
import Header from "../components/head";

export default function Search() {
  const [animeResults, setAnimeResults] = useState([]);
  const router = useRouter();
  const { search } = router.query;

  async function getSearch() {
    const res = await fetchSearch(search);
    setAnimeResults(res.animes);
  }

  useEffect(() => {
    if (!router.isReady) return;
    getSearch(search);
  }, [router.isReady]);
  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <div className="mb-3">
          <h2 style={{ fontFamily: "Poppins" }} className="container mt-5">
            {"Hasil Pencarian Anime"}
          </h2>
        </div>
        <Container>
          <hr />
          <Row className="g-4">
            {animeResults.map((animedata) => (
              <Col
                key={animedata.name}
                className="col-lg-3 align-items-stretch"
              >
                <Card className="h-100">
                  <Card.Img variant="top" src={animedata.thumb} />
                  <Card.Body>
                    <Badge bg="warning">{animedata.status}</Badge>
                    <Card.Title style={{ fontFamily: "Poppins" }}>
                      {animedata.name}
                    </Card.Title>
                    <Button
                      variant="danger"
                      style={{ fontFamily: "Poppins" }}
                      href={`/${animedata.endpoint}`}
                    >
                      Nonton sekarang!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <hr />
        </Container>
      </main>
    </div>
  );
}
