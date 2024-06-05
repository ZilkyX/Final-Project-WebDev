const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
    const message = event.data;
    alert('Received message: ' + message);
    fetchNews();

};

ws.onclose = () => {
    console.log('Connection to WebSocket server closed');
};

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(function(section) {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}

showSection('home'); 

async function fetchExchangeRates() {
    const apiKey = '87270298efec41b7ba06d40edad3164f';

    try {
        const currencies = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
        const response = await fetch(currencies);

        if (!response.ok) {
            throw new Error("Not found");
        }
        
        const data = await response.json();
        return data.rates;

    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return null;
    }
}

async function populateCurrencyOptions() {
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');

    const rates = await fetchExchangeRates();
    if (!rates) {
        alert('Error fetching exchange rates. Please try again later.');
        return;
    }

    for (const currency in rates) {
        const option = document.createElement('option');
        option.value = currency;
        option.text = `${currency}`;
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option.cloneNode(true));
    }
}

async function populateCurrencyTable() {
    const tableBody = document.querySelector('.currency-table tbody');

    const rates = await fetchExchangeRates();
    if (!rates) {
        alert('Error fetching exchange rates. Please try again later.');
        return;
    }

    for (const currency in rates) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${currency}</td>
            <td>${rates[currency]}</td>
        `;
        tableBody.appendChild(row);
    }
}

populateCurrencyOptions();
populateCurrencyTable();

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerText = 'Please enter a valid amount.';
        return;
    }

    const rates = await fetchExchangeRates();
    if (!rates) {
        resultDiv.innerText = 'Error fetching exchange rates. Please try again later.';
        return;
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
        resultDiv.innerText = 'Invalid currency code.';
        return;
    }

    const convertedAmount = (amount / fromRate) * toRate;
    resultDiv.innerText = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

document.addEventListener('DOMContentLoaded', populateCurrencyOptions);


async function fetchNews() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 31);
    const formattedDate = currentDate.toISOString().split('T')[0];
   

    const api_key = 'addef33392ec438b8a2b2aa8e484dad3';

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=currency&from=${formattedDate}&sortBy=publishedAt&apiKey=${api_key}`);

        if (!response.ok) {
            throw new Error("Not found");
        }
        const data = await response.json();
        displayNews(data.articles);

    } catch (error) {
        console.error(error);
    }
}

function displayNews(articles) {
    const newsRow = document.getElementById('newsRow');
    newsRow.innerHTML = ''; 

    articles.forEach(article => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';

        const card = document.createElement('div');
        card.className = 'card news-card shadow-sm';

        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.className = 'card-img-top news-img'; 
        img.alt = 'No image available';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body news-card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = article.title;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = article.description;

        const readMoreBtn = document.createElement('a');
        readMoreBtn.href = article.url;
        readMoreBtn.className = 'btn read-more-btn';
        readMoreBtn.textContent = 'Read More';

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(readMoreBtn);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        newsRow.appendChild(col);
    });
}




async function convertCryptoCurrency() {
    const apiKey = '7E99AF1E-B4DD-4A12-A874-DB10BD1FB920'; 
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amountId').value;

    const url = `https://rest.coinapi.io/v1/exchangerate/${fromCurrency}/${toCurrency}?apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const rate = data.rate;
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById('cryptoResult').innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        document.getElementById('cryptoResult').innerHTML = `Error: ${error.message}`;
    }
}


document.querySelector("#subscribeForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    var email = document.querySelector("#inputEmail").value;
    var emailInput = document.querySelector("#inputEmail");

    if(validateEmail(email)) {
        sendEmail(email);
        emailInput.value = ''
    } else {
        alert("Please enter a valid email address.");
    }

});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function sendEmail(email) {
    emailjs.init("AC34_nNZGL2IOwFhk");

    var params = {
        sender_name: "Coinswitch",
        to: email,
        subject: "Coinswitch Newsletter Subscription",
        reply_to: "Coinswitch",
        message: "Dear User,\n\nThank you for subscribing to the Coinswitch newsletter!\n\nYou will receive regular updates on cryptocurrency news, market trends, and special offers.\n\nBest Regards,\nCoinswitch Team",
    };

    var serviceID = "service_wefjdcw";
    var templateID = "template_qsk3n0l";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            alert("Email Sent Successfully!");
        })
        .catch(err => {
            alert("Failed to send email. Please try again later.");
        });
}




let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
});

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
});

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
};


var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 3,
    slideShadows: true
  },
  keyboard: {
    enabled: true
  },
  mousewheel: {
    thresholdDelta: 70
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 1
    },
    1024: {
      slidesPerView: 2
    },
    1560: {
      slidesPerView: 3
    }
  }
});
