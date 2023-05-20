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
  const [dropdownOption, setDropdownOption] = useState([]);
  const router = useRouter();
  const { episode } = router.query;

  async function getEpisode() {
    const res = await fetchEpisode(episode);
    const download = DownloadHandle(res.download_link);
    const dropdown = MirrorHandle(res.mirror_stream_link);
    setDropdownOption(dropdown);
    setEpisodeAnime(res);
    setDownloadAnime(download);
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
          arr.push(
            <div className="table-responsive">
              <Table striped variant="dark">
                <tbody>
                  <tr>
                    <td style={{ fontFamily: "Poppins", fontSize: "17px" }}>
                      {l.title}
                    </td>
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

  function MirrorHandle(drop) {
    const arr = [];

    for (const m of drop) {
      const dropdownItems = [];

      if (Array.isArray(m.data)) {
        for (const data of m.data) {
          dropdownItems.push(
            <Dropdown.Item key={data.title} href={`#/action-${data.id}`}>
              {data.title}
            </Dropdown.Item>
          );
        }
      } else {
        console.log("error");
      }

      arr.push(
        <Dropdown key={m.name}>
          <Dropdown.Toggle variant="danger" id={`dropdown-basic-${m.id}`}>
            {m.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
        </Dropdown>
      );
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
            {dropdownOption}
          </div>
          <hr />
          {downloadAnime}
        </Container>
      </main>
    </div>
  );
}
