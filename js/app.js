const loadPhone = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone_container');
    phonesContainer.textContent = '';
    // showAllButton-------------
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }



    // no Phone message 
    const noPhone = document.getElementById('no_phone_found')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        // console.log(phone.image);
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

            </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    });
    toggleSpiner(false)
}

const processSearch = (dataLimit) => {
    toggleSpiner(true);
    const searchField = document.getElementById('search_field');
    const searchText = searchField.value;
    // searchField.value = '';
    loadPhone(searchText, dataLimit);
}

document.getElementById('search_btn').addEventListener('click', function () {
    processSearch(10);
})
// search input field event handler 
document.getElementById('search_field').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        processSearch(10);

    }
});

const toggleSpiner = isLoading => {
    const loderSection = document.getElementById('loder');
    if (isLoading) {
        loderSection.classList.remove('d-none');
    } else {
        loderSection.classList.add('d-none')
    }
}
// not  the best Solution, this is wrost solution
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})
const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data =await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    const modalTittle = document.getElementById('phoneDetailModalLabel');
    modalTittle.innerText = `${phone.name}  (${phone.brand}) `;
    const phoneDetails = document.getElementById('phone_details')
    phoneDetails.innerHTML= `
    <p> Release Date : ${phone.releaseDate ? phone.releaseDate : 'Release Date is not Found'} </p> 
    <p> Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'Storage information is not Found'} </p> 
    <p> ChipSet : ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'ChipSet information is not Found'} </p> 
    <p> Display : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'Display information is not Found'} </p> 
    `
}
// loadPhone('apple')