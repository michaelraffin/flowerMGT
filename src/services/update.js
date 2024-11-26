import { writable, readable } from "svelte/store";
export const products = writable([]);
export const productLength = writable(0);
export let isLoading = writable(true);
let globalUrl = "http://192.168.1.148:9091"; //"https://www.smestoreph.com"; ///
const store = writable(0, () => {
  isLoading = false;
  console.log("got a subscriber");
  return () => console.log("no more subscribers");
});

export const updateProduct = async (item, className) => {
  let items = [];
  let parameter = item; // { "id": "Flux-Bouquet", "queryType": "filter", "storeOwner": "60b1c9a9a001ef1e463d52c2", "isAPI": false,number:20, "showLimit": true,deliveryDate: "2022-08-01"}

  // const deleteUrl = `${globalUrl}/deleteProduct/`
  const updateUrl = `${globalUrl}/updateAdminV2/${className}/`;
  const url = updateUrl;
  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify(parameter),
    headers: {
      "Content-Type": "application/json",
    },
  });
  items = await request.json();
  return items;
};
// fetchProducts()
