const dataList = document.querySelector("#dog-breeds");
const searchButton = document.querySelector("#search-button");
const breedInput = document.querySelector("#breed-input");
const gallery = document.querySelector("#gallery");
const message = document.querySelector("#message");

//state
let dogImages = [];

function renderMessage() {}
async function fetchBreeds() {
  const response = await axios.get("https://dog.ceo/api/breeds/list/all");
  const breeds = response.data.message;
  for (let key in breeds) {
    const option = document.createElement("option");
    option.value = key;
    dataList.append(option);
  }
}

async function fetchImages() {
  dogImages = [];
  var breed = breedInput.value;
  const url = `https://dog.ceo/api/breed/${breed}/images`;
  const response = await axios.get(url);
  for (item of response.data.message) {
    dogImages.push(item);
  }
  //check if the state is updated
  console.log(dogImages);
  renderImages();
}

function renderImages() {
  message.innerHTML = `Found ${dogImages.length} results`;
  gallery.innerHTML = "";
  console.log("rendering images...");
  renderMessage();
  for (image of dogImages) {
    const currentImage = document.createElement("img");
    currentImage.src = image;
    console.log(currentImage);
    gallery.append(currentImage);
  }
}
//events
searchButton.addEventListener("click", () => {
  fetchImages();
  breedInput.value = "";
});

breedInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchImages();
    breedInput.value = "";
  }
});
//call the function
fetchBreeds();
