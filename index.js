// Main News
// variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
let newsDataArr = [];

// APIs 
const API_KEY = "e5a3545260d34caaa6aa6c4430892a52";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();
};

generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>General news</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
    fetchQueryNews();
});

newsQuery.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if within a form
        newsType.innerHTML = "<h4>Search : " + newsQuery.value + "</h4>";
        fetchQueryNews();
    }
});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchQueryNews = async () => {
    if (newsQuery.value == null) return;

    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

// Display news content:
function displayNews() {
    newsdetails.innerHTML = "";

    newsDataArr.forEach(news => {
        let date = news.publishedAt.split("T");
        
        let col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2";

        let card = document.createElement('div');
        card.className = "card p-2";
        card.id = "cardTags";

        let image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");

        // Use a loader if the API does not provide an image URL
        if (news.urlToImage) {
            image.src = news.urlToImage;
        } else {
            const loader = document.createElement('div');
            loader.className = 'loader';
            card.appendChild(loader);
        }

        image.alt = news.title || "News Image"; // Add an alt attribute

        let cardBody = document.createElement('div');
        cardBody.className = "card-body";
        
        let newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        let description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        let link = document.createElement('a');
        link.className = "btn btn-dark";
        link.id = "cardButton";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}


// Daily news
const dailyNewsContainer = document.getElementById("dailyNews");

// Function to fetch Daily News
const fetchDailyNews = async () => {
    const response = await fetch(GENERAL_NEWS + API_KEY);
    let dailyNewsArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        dailyNewsArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        document.getElementById("dailyNewsList").innerHTML = "<li>No data found.</li>";
        return;
    }

    // Limit to 10 articles and shuffle the array
    dailyNewsArr = getRandomArticles(dailyNewsArr, 10);

    displayDailyNews(dailyNewsArr);
}

// Function to get a random selection of articles
function getRandomArticles(newsArr, maxCount) {
    const shuffled = newsArr.sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, maxCount); // Return maxCount number of articles
}

// Function to display Daily News titles as links with <hr> between them
function displayDailyNews(newsArr) {
    const dailyNewsList = document.getElementById("dailyNewsList");
    dailyNewsList.innerHTML = "";

    newsArr.forEach((news, index) => {
        const listItem = document.createElement('li');

        const link = document.createElement('a');
        link.href = news.url;
        link.target = "_blank";
        link.textContent = news.title;

        listItem.appendChild(link);
        dailyNewsList.appendChild(listItem);

        // Add <hr> tag after each item except the last one
        if (index < newsArr.length - 1) {
            const hr = document.createElement('hr');
            hr.className = "my-2 solid-black";  // Add some margin to the <hr>
            dailyNewsList.appendChild(hr);
        }
    });
}

// Call the function to fetch and display Daily News
fetchDailyNews();
