const bikes = [
  { id: 1, name: 'Swift Roadster', type: 'Road', city: 'Bangalore', pricePerHour: 45 },
  { id: 2, name: 'Trail Hunter X', type: 'Mountain', city: 'Pune', pricePerHour: 55 },
  { id: 3, name: 'Volt Glide', type: 'Electric', city: 'Hyderabad', pricePerHour: 80 },
  { id: 4, name: 'City Cruise 3', type: 'Hybrid', city: 'Bangalore', pricePerHour: 35 },
  { id: 5, name: 'Peak Climber', type: 'Mountain', city: 'Hyderabad', pricePerHour: 60 },
  { id: 6, name: 'Urban Spark', type: 'Electric', city: 'Pune', pricePerHour: 75 }
];

const bookings = [];
let selectedBike = null;

const cityFilter = document.getElementById('cityFilter');
const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const bikeList = document.getElementById('bikeList');
const resultCount = document.getElementById('resultCount');
const selectedBikeInput = document.getElementById('selectedBike');
const bookingForm = document.getElementById('bookingForm');
const hoursInput = document.getElementById('hoursInput');
const dateInput = document.getElementById('dateInput');
const bookingMessage = document.getElementById('bookingMessage');
const bookingList = document.getElementById('bookingList');
const bookingDialog = document.getElementById('bookingDialog');

function renderBikes() {
  const maxPrice = Number(priceFilter.value);
  const filteredBikes = bikes.filter((bike) => {
    const cityMatches = cityFilter.value === 'All' || bike.city === cityFilter.value;
    const typeMatches = typeFilter.value === 'All' || bike.type === typeFilter.value;
    const priceMatches = bike.pricePerHour <= maxPrice;
    return cityMatches && typeMatches && priceMatches;
  });

  resultCount.textContent = `${filteredBikes.length} bike(s)`;
  bikeList.innerHTML = '';

  filteredBikes.forEach((bike) => {
    const card = document.createElement('article');
    card.className = 'bike-card';
    card.innerHTML = `
      <span class="badge">${bike.type}</span>
      <h3>${bike.name}</h3>
      <p>${bike.city}</p>
      <p class="price">₹${bike.pricePerHour} / hour</p>
      <button class="primary-btn" data-id="${bike.id}">Select</button>
    `;
    bikeList.append(card);
  });

  if (!filteredBikes.length) {
    bikeList.innerHTML = '<p>No bikes match your filters.</p>';
  }
}

function setSelectedBike(id) {
  selectedBike = bikes.find((bike) => bike.id === id);
  if (!selectedBike) {
    return;
  }
  selectedBikeInput.value = `${selectedBike.name} (${selectedBike.city})`;
}

function renderBookings() {
  bookingList.innerHTML = '';
  if (!bookings.length) {
    bookingList.innerHTML = '<li>No bookings yet.</li>';
    return;
  }

  bookings.forEach((booking) => {
    const item = document.createElement('li');
    item.textContent = `${booking.date}: ${booking.bikeName} for ${booking.hours} hour(s) - ₹${booking.total}`;
    bookingList.append(item);
  });
}

priceFilter.addEventListener('input', () => {
  priceValue.textContent = `₹${priceFilter.value}`;
  renderBikes();
});

cityFilter.addEventListener('change', renderBikes);
typeFilter.addEventListener('change', renderBikes);

bikeList.addEventListener('click', (event) => {
  if (!(event.target instanceof HTMLButtonElement)) {
    return;
  }

  const bikeId = Number(event.target.dataset.id);
  setSelectedBike(bikeId);
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  bookingMessage.textContent = '';

  if (!selectedBike) {
    bookingMessage.textContent = 'Please select a bike first.';
    return;
  }

  const hours = Number(hoursInput.value);
  const date = dateInput.value;
  if (!hours || !date) {
    bookingMessage.textContent = 'Enter valid hours and date.';
    return;
  }

  const total = hours * selectedBike.pricePerHour;
  bookings.push({ bikeName: selectedBike.name, hours, date, total });
  bookingMessage.textContent = `Booked ${selectedBike.name} for ₹${total}.`;
  bookingForm.reset();
  selectedBikeInput.value = selectedBike.name;
  renderBookings();
});

document.getElementById('viewBookingsBtn').addEventListener('click', () => {
  renderBookings();
  bookingDialog.showModal();
});

document.getElementById('closeDialogBtn').addEventListener('click', () => {
  bookingDialog.close();
});

renderBikes();
