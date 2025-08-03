document.getElementById("loadProducts").addEventListener("click", async () => {
  const res = await fetch("/api/v1/products");
  const data = await res.json();

  const output = document.getElementById("output");
  output.innerHTML = data
    .map(
      (p) => `
    <div>
      <img src="${p.image}" alt="${p.name}" width="100" />
      <p><strong>${p.name}</strong> - $${p.price}</p>
    </div>
  `
    )
    .join("");
});
