function start() {
  const url = document.getElementById("target").value;
  if(!url) return alert("Enter URL");

  document.getElementById("grid").innerHTML = "";
  success = 0;
  total = 0;
  initChart();

  countries.forEach((country, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.textAlign = index % 2 === 0 ? "left" : "right";
    document.getElementById("grid").appendChild(card);

    // loop check tanpa menumpuk
    async function loopCheck() {
      await check(url, country, card);
      setTimeout(loopCheck, 5000); // tunggu 5 detik lalu cek lagi
    }

    loopCheck(); // start loop pertama
  });
}
