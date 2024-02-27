const loadPhone = async(search) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json()
    const phone = data.data
    displayPhone(phone)
}

const displayPhone = phones =>{
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = '';
phones.forEach(phone => {
    console.log(phone)
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card w-96 bg-base-100 p-4 shadow-xl">
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
    `
    cardContainer.appendChild(div);
    
});
}

const handleSearch = () =>{
    const inputField = document.getElementById("input-field");
    const searchField = inputField.value; 
    loadPhone(searchField);
}

// loadPhone();