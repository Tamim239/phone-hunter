const loadPhone = async (search = 'a', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
  const data = await res.json()
  const phone = data.data
  displayPhone(phone, isShowAll)
}

const displayPhone = (phones, isShowAll) => {
  const cardContainer = document.getElementById("card-container");
  // this text content '' means clear old content empty
  cardContainer.textContent = '';
  // if items 12 more show the show all btn and less than hidden
  const showAllContainer = document.getElementById("showAll-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  }
  else {
    showAllContainer.classList.add("hidden");
  }

  // many item show output i can slice and show some specific items and if not show all
  // phones = phones.slice(0, 12);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }


  phones.forEach(phone => {
    // console.log(phone)
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card p-4 shadow-xl">
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
      </div>
    </div>
  </div>
    `
    cardContainer.appendChild(div);

  });
  // set loading close
  toggleLoadingSpinner(false);
}


// show details modal
const handleShowDetails = async (id) => {
  // console.log("yes i am click", id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  showPhoneDetails(phone);
}

// show details btn dynamic load after load modal
const showPhoneDetails = (phone) => {
  // console.log(phone)
  const phoneImage = document.getElementById("show-details-image");
  phoneImage.innerHTML = `
<img src="${phone.image}" alt="">
`
  const phoneName = document.getElementById("show-detail-phoneName");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById("show-details-container");
  showDetailsContainer.innerHTML = `
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
<p>Storage : ${phone?.mainFeatures?.storage}</p>
<p>Display Size : ${phone?.mainFeatures?.displaySize} </p>
<p>ChipSet : ${phone?.mainFeatures?.chipSet}</p>
<p>Memory : ${phone?.mainFeatures?.memory}</p>
<p>Slug : ${phone?.slug}</p>
<p>Release data : ${phone?.releaseDate}</p>
<p>Brand : ${phone?.brand}</p>
<p>GPS : ${phone?.others?.GPS || 'No GPS available'}</p>
`

  show_details_modal.showModal();
}

// handle search input
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const inputField = document.getElementById("input-field");
  const searchField = inputField.value;
  loadPhone(searchField, isShowAll);
}

// set loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  }
  else {
    loadingSpinner.classList.add("hidden");
  }
}

// show all btn
const toggleShowALl = () => {
  handleSearch(true);
}

loadPhone();