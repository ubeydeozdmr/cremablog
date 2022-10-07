async function init() {
  const res = await fetch('./api/v1/posts');
  const { data } = await res.json();
  console.log(data);
}

init();
