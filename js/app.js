const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
};
const displayCategory = (categories) => {
    const displayCategoryElement = document.getElementById('display-categories');
    categories.forEach(category => {
        const displayCategoryDiv = document.createElement('div');
        displayCategoryDiv.classList.add('fw-semibold')
        displayCategoryDiv.innerHTML = `
        <a onclick="loadSpecificCategory('${category.category_id}')" class="text-decoration-none" href="#">${category.category_name}s</a>`;

        displayCategoryElement.appendChild(displayCategoryDiv)
    })

}



const loadSpecificCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySpecificCategory(data.data))
}

const displaySpecificCategory = (categories) => {
    // console.log(categories);

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
        <div data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetails()" class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${category.title}</h5>
                            <p class="card-text pt-5">${category.details.slice(0, 400)}...</p>
                           <div class="d-flex align-items-center justify-content-between">
                           <div class="d-flex">
                            <img height="25" width="25" class="img-fluid rounded-circle me-2" src="${category.author.img}" alt="">
                           <div>
                           <p class="card-text fw-semibold"><small class="text-muted"></small>${category.author.name}</p>
                           <p class="card-text fw-semibold"><small class="text-muted"></small>${category.author.published_date}</p>
                           </div>
                           </div>

                           <div>
                           <p>Views: ${category.total_view}</p>
                           </div>
                           </div>
                           
                        </div>
                    </div>
                </div>
            </div>

        `;
        allNewsElement.appendChild(allNewsDiv)
    })

}


// loadSpecificCategory()




// const loadNews = () => {
//     const url = ``
// }




loadCategories()