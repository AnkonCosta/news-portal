const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
};
const displayCategory = (categories) => {
    // console.log(categories);
    const displayCategoryElement = document.getElementById('display-categories');
    categories.forEach(category => {
        console.log(category);
        const displayCategoryDiv = document.createElement('div');
        displayCategoryDiv.classList.add('fw-semibold')
        displayCategoryDiv.innerHTML = `<div onclick="specificCategory()">
        ${category.category_name}</div>`;
        displayCategoryElement.appendChild(displayCategoryDiv)
    })

}


const specificCategory = () => {
    console.log('working')
}




const loadNews = () => {
    const url = ``
}



loadCategories()