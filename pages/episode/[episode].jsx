import { useEffect, useState, React } from "react";
import { useRouter } from "next/router";
import { fetchEpisode } from "@/components/apiData";
import Navbar from "../components/navbar/navbar";
import Header from "../components/head";
import {
  Container,
  Ratio,
  Dropdown,
  DropdownButton,
  Button,
  Table,
} from "react-bootstrap";

export default function Episode() {
  const [episodeAnime, setEpisodeAnime] = useState([]);
  const [downloadAnime, setDownloadAnime] = useState([]);
  const router = useRouter();
  const { episode } = router.query;

  async function getEpisode() {
    const res = await fetchEpisode(episode);
    setEpisodeAnime(res);
    const download = DownloadHandle(res.download_link);
    setDownloadAnime(download);
    //console.log(res);
  }

  function DownloadHandle(link) {
    const arr = [];
    for (const d of link) {
      arr.push(
        <div key={d.name} className="mt-4">
          <h4 style={{ fontFamily: "Poppins" }}>{d.name}</h4>
        </div>
      );
      if (Array.isArray(d.data)) {
        for (const l of d.data) {
          console.log(l);
          arr.push(
            <div className="table-responsive">
              <Table className="table" striped>
                <tbody>
                  <tr>
                    <td style={{ fontFamily: "Poppins" }}>{l.title}</td>
                    <td className="justify-content-end d-flex">
                      <Button variant="danger" href={l.url}>
                        Download Anime
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        }
      } else {
        console.log("error");
      }
    }
    return arr;
  }

  useEffect(() => {
    if (!router.isReady) return;
    getEpisode();
  }, [router.isReady]);

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <Container className="mt-5 mb-5">
          <div className="mb-3">
            <h1 style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
              {episodeAnime.title}
            </h1>
          </div>
          <div className="embed-responsive embed-responsive-16by9 mt-4 mb-4">
            <Ratio aspectRatio="16x9">
              <iframe
                className="embed-responsive-item"
                src={episodeAnime.stream_link}
                allowFullScreen
              ></iframe>
            </Ratio>
          </div>
          <div className="justify-content-center d-flex gap-2">
            <h3 style={{ fontFamily: "Poppins", fontWeight: "bold" }}>
              {"Mirror Link:"}
            </h3>
            <DropdownButton
              variant="danger"
              id="dropdown-basic-button"
              title="480p"
              style={{ fontFamily: "Poppins" }}
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="danger"
              id="dropdown-basic-button"
              title="720p"
              style={{ fontFamily: "Poppins" }}
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
          <hr />
          {downloadAnime}
        </Container>
      </main>
    </div>
  );
}
