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
