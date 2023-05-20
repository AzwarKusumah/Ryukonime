export async function fetchHome() {
  const res = await fetch(`https://komi.katowproject.app/api/otakudesu/home`);
  const data = res.json();
  return data;
}

export async function fetchSearch(query) {
  const res = await fetch(
    `https://komi.katowproject.app/api/otakudesu/search/${query}`
  );
  const data = res.json();
  return data;
}

export async function fetchDetail(endpoint) {
  const res = await fetch(
    `https://komi.katowproject.app/api/otakudesu/anime/${endpoint}`
  );
  const data = res.json();
  return data;
}

export async function fetchDaftar() {
  const res = await fetch(
    "https://komi.katowproject.app/api/otakudesu/daftar-anime"
  );
  const data = res.json();
  return data;
}

export async function fetchJadwal() {
  const res = await fetch(
    "https://komi.katowproject.app/api/otakudesu/jadwal-rilis"
  );
  const data = res.json();
  return data;
}

export async function fetchEpisode(episode, id) {
  const url = id
    ? `https://komi.katowproject.app/api/otakudesu/eps/${episode}/?id=${id}`
    : `https://komi.katowproject.app/api/otakudesu/eps/${episode}`;
  const res = await fetch(url);
  const data = res.json();
  return data;
}
