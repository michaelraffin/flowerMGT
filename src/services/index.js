import { writable, readable } from "svelte/store";
export const storeDetails = writable(null);
export const storeCategories = writable([]);
export const productLength = writable(0);
export let isLoading = writable(true);
let globalUrl = "https://www.smestoreph.com"; //'http://192.168.1.148:9091' //

const store = writable(0, () => {
  isLoading = false;
  console.log("got a subscriber");
  return () => console.log("no more subscribers");
});

let storeID = "5ff00ddaeb2f5d0940dfa186";
let flc = "6326a69c488d54029f6ccd8b";
export const fetchStore = async (className) => {
  let items = [];

  const parameter = {
    cName: "Category",
    cType: "Product",
    id: storeID,
    equalTo: true,
    storeOwner: storeID,
  };
  const request = await fetch(`${globalUrl}/details/${className}`, {
    method: "POST",
    body: JSON.stringify(parameter),
    headers: {
      "Content-Type": "application/json",
    },
  });
  items = await request.json();
  storeDetails.set(items.results[0]);
  productLength.set(items.results.length);
  storeCategories.set(items.results[0].productCategories);
  isLoading.set(false);
  store;
  console.log("xxxx", items.results.length);
};
