const loadAllPhone = async (status, brandName) => {
  console.log(brandName);
  document.getElementById("spinner").style.display = "none";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      brandName ? brandName : "iphone"
    }`
  );
  const data = await response.json();

  if (status) {
    displayAllPhone(data.data);
  } else {
    displayAllPhone(data.data.slice(0, 6));
  }
};

const displayAllPhone = (phones) => {
  document.getElementById("phones-container").innerHTML = "";
  const phonesContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    const { brand, image, slug } = phone;
    const div = document.createElement("div");
    div.innerHTML = `
 <div
          class="flex flex-col justify-center items-center space-y-3 border rounded p-2"
        >
          <img class="bg-slate-200 rounded" src="${image}" alt="" />
          <p class="text-gray-500">${brand}</p>
          <h3 class="text-2xl font-bold">${phone.phone_name}</h3>
          <h3 class="text-md font-bold">${slug}</h3>
          <button onclick="phoneDetails('${slug}')" class="bg-blue-600 px-6 py-2 text-white">show Details</button>
        </div>
    `;
    phonesContainer.appendChild(div);
  });
};

const handleShowAll = () => {
  loadAllPhone(true);
};

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchText = document.getElementById("search-box").value;

  setTimeout(function () {
    loadAllPhone(false, searchText);
  }, 3000);
};

const phoneDetails = async (slugs) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slugs}`
  );
  const data = await response.json();
  console.log(data.data);

  const {
    brand,
    image,
    name,
    releaseDate,
    mainFeatures: { storage },
    mainFeatures: { chipSet },
    mainFeatures: { displaySize },
  } = data.data;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
   <dialog id="my_modal_1" class="modal">
        <div class="modal-box flex flex-col justify-center   border-2 border-blue-600 rounded p-2">
        <div class="flex justify-center items-center">

        <img  class="mb-3 " src="${image}">
        </div>
          <h3 class="text-lg font-bold"><span class="font-bold">Brand:</span> ${brand}</h3>
          <p class=""><span class="font-bold">Name:</span> ${name}</p>
          <p class=""><span class="font-bold">Release Date:</span> ${releaseDate}</p>
          <p class=""><span class="font-bold">Storage:</span> ${storage}</p>
          <p class=""><span class="font-bold">ChipSet:</span> ${chipSet}</p>
          <p class=""><span class="font-bold">Display Size:</span> ${displaySize}</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn bg-blue-600 rounded-none px-8 text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  `;

  my_modal_1.showModal();
};

loadAllPhone();
