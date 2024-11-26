import { writable, readable } from "svelte/store";
export const products = writable([]);
export const productLength = writable(0);
export let isLoading = writable(true);
let globalUrl = "https://www.smestoreph.com"; //'http://192.168.1.148:9091' ///
let mm = "6326a69c488d54029f6ccd8b";
let ndz = "5ff00ddaeb2f5d0940dfa186";
let flc = "60b1c9a9a001ef1e463d52c2";

const store = writable(0, () => {
  isLoading = false;
  console.log("got a subscriber");
  return () => console.log("no more subscribers");
});

export const fetchProducts = async (className, selecteDate) => {
  let items = [];
  const parameter = {
    id: "Flux-Bouquetz",
    queryType: "filter",
    storeOwner: "60b1c9a9a001ef1e463d52c2222",
    isAPI: true,
    showLimit: true,
    number: 90,
    deliveryDate: selecteDate,
  };
  const request = await fetch(`${globalUrl}/productV3/${className}`, {
    method: "POST",
    body: JSON.stringify(parameter),
    headers: {
      "Content-Type": "application/json",
    },
  });
  items = await request.json();
  products.set(items.results);
  productLength.set(items.results.length);
  isLoading.set(false);
  store;
  console.log("xxxx", items.results.length);
};

export const fetchProductsV2 = async (className, selecteDate) => {
  let items = [];
  const parameter = {
    id: "Flux-Bouquetz",
    queryType: "filter",
    storeOwner: "60b1c9a9a001ef1e463d52c2222",
    isAPI: true,
    showLimit: true,
    number: 90,
    deliveryDate: selecteDate,
  };
  const request = await fetch(`${globalUrl}/productV2/${className}`, {
    method: "POST",
    body: JSON.stringify(parameter),
    headers: {
      "Content-Type": "application/json",
    },
  });
  items = await request.json();
  products.set(items.results);
  productLength.set(items.results.length);
  isLoading.set(false);
  store;
  console.log("xxxx", items.results.length);
};
