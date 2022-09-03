const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => (console.log(error)))
};
const displayCategory = (categories) => {
    const displayCategoryElement = document.getElementById('display-categories');
    categories.forEach(category => {
        const displayCategoryDiv = document.createElement('div');
        displayCategoryDiv.classList.add('fw-semibold')
        displayCategoryDiv.innerHTML = `
        <a onclick="loadSpecificCategory('${category.category_id}')" class="text-decoration-none text-success" href="#">${category.category_name}s</a>`;


        displayCategoryElement.appendChild(displayCategoryDiv)
    })

}



const loadSpecificCategory = (id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySpecificCategory(data.data))
        .catch(error => (console.log(error)))
    toggleSpinner(true)
}

const displaySpecificCategory = (categories) => {
    // console.log(categories);

    const newsFoundNo = document.getElementById('news-found-no');
    newsFoundNo.innerHTML = ``;
    const newsFoundPara = document.createElement('p');
    newsFoundPara.innerText = `${categories.length} news found`;

    newsFoundNo.appendChild(newsFoundPara)

    // no news found on category 
    const categoryNotFound = document.getElementById('category-not-found');
    if (categories.length === 0) {
        categoryNotFound.classList.remove('d-none');

    }
    else {
        categoryNotFound.classList.add('d-none');

    }


    const allNewsElement = document.getElementById('all-news');
    allNewsElement.innerHTML = ``;
    categories.forEach(category => {
        console.log(category);


        const allNewsDiv = document.createElement('div')
        allNewsDiv.innerHTML = `
        <div data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails('${category._id}')" class="card mb-3 shadow-lg rounded">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${category.thumbnail_url}" class="img-fluid rounded-start middle-img" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title text-success">${category.title}</h5>
                            <p class="card-text fw-semibold  pt-5">${category.details.slice(0, 400)}...</p>
                           <div class="d-flex align-items-center justify-content-between">
                           <div class="d-flex align-items-center justify-content-between">
                            <img  height="25px" width="25px" class="img-fluid rounded-circle me-2 my-4" src="${category.author.img}" alt="">
                           <div >
                           <p class="card-text fw-semibold  text-success"><small class="text-muted"></small>${category.author.name ? category.author.name : 'No author name found'}</p>
                           
                           </div>
                           </div>

                           <div class="inline">
                           <i class="fa-sharp text-success fa-solid fa-eye"> ${category.total_view}</i>
                           </div>
                           </div>
                           
                        </div>
                    </div>
                </div>
            </div>

        `;
        allNewsElement.appendChild(allNewsDiv);

    })
    toggleSpinner(false)

}

const loadDetails = (news_id) => {


    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data[0]))
        .catch(error => (console.log(error)))
}


const showDetails = (category) => {
    const showTitle = document.getElementById('exampleModalLabel');
    const showAuthor = document.getElementById('author-id');
    const showDate = document.getElementById('publish-date-id');
    const showImg = document.getElementById('img-id');
    const showPara = document.getElementById('para-id');
    showTitle.innerText = category.title;
    showAuthor.innerText = category.author.name ? category.author.name : 'No author found';
    showDate.innerText = category.author.published_date ? category.author.published_date : 'No publish found';
    showImg.src = category.image_url;
    showPara.innerText = category.details;
    console.log(category);
}

const toggleSpinner = (isLoading) => {
    const toggleSpinnerElement = document.getElementById('spinner');
    if (isLoading) {
        toggleSpinnerElement.classList.remove('d-none');
    }
    else {
        toggleSpinnerElement.classList.add('d-none');

    }
}


loadCategories()