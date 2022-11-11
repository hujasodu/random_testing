import React, { useState, useEffect } from "react";

function GetProducts({product_id}) {
  const loadJSON = key =>
    key && JSON.parse(localStorage.getItem(key));
  const saveJSON = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));
  const [data, setData] = useState(loadJSON(`product:${product_id}`));
  var url
  if(product_id) 
    url="http://localhost:5000/api/products/" + product_id
  else
    url="http://localhost:5000/api/products"

  useEffect(() => {
    if (!data) return;
    if (data.id === product_id) return;
    const { product } = data;
    saveJSON(`product:${product_id}`, {product});
  }, [data]);

  useEffect(() => {
    if (!product_id) return;
    if (data && data.id === product_id) return;
    fetch(`${url}`)
      .then(response => response.json())
      .then(setData)
      .catch(console.error);
  }, [product_id]);

  if (data)
    return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return null;
}

export default function App() {
  return <GetProducts product_id="5"/>;
}