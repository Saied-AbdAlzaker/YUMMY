let rowMeals = document.getElementById("rowMeals");
let searchInput = document.getElementById("searchInput");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500);
        $("body").css("overflow", "visible");
        $(".inner-loading-screen").fadeOut(500)
    })
})

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({ left: -boxWidth }, 500)
    $(".open-close-icon").addClass("fa-align-justify")
    $(".open-close-icon").removeClass("fa-x")

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 300 }, (i + 5) * 100)
    }
}

function openSideNav() {
    $(".side-nav-menu").animate({ left: 0 }, 500)
    $(".open-close-icon").addClass("fa-x")
    $(".open-close-icon").removeClass("fa-align-justify")

    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
}

openSideNav()
$(".side-nav-menu  i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

function displayMeals(meal) {

    let cartona = '';
    for (let i = 0; i < meal.length; i++) {
        cartona += ` <div class="col-md-3 g-4 cursor-pointer">
        <div onclick="getMealDetails(${meal[i].idMeal})" class="meal position-relative overflow-hidden rounded-3">
            <img class="w-100" src="${meal[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${meal[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
    }
    rowMeals.innerHTML = cartona;
}

async function getCategories() {
    $(".inner-loading-screen").fadeIn(300)
    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    res = await response.json();
    // console.log(res.categories);
    displayCategories(res.categories);
    $(".inner-loading-screen").fadeOut(300)
}

function displayCategories(category) {
    let cartona = '';
    for (let i = 0; i < category.length; i++) {
        cartona += `
        <div class="col-md-3 g-4">
                <div onclick="getCategoriesMeals('${category[i].strCategory}')" class="meal position-relative overflow-hidden rounded-3 cursor-pointer">
                    <img src="${category[i].strCategoryThumb}" alt="" class="w-100">
                    <div class="meal-layer position-absolute text-black">
                        <h3 class="text-center">${category[i].strCategory}</h3>
                        <p class="text-center">${category[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>`
    }
    rowMeals.innerHTML = cartona;
}

async function getArea() {
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    res = await response.json();
    // console.log(res.meals);
    displayArea(res.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayArea(area) {
    let cartona = '';
    for (let i = 0; i < area.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-3 cursor-pointer text-center">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${area[i].strArea}</h3>
                </div>
            </div>`
    }
    rowMeals.innerHTML = cartona;
}

async function getIngredients() {
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    rse = await response.json();
    // console.log(rse.meals);
    displayIngredients(rse.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300)
}

function displayIngredients(ingredients) {
    let cartona = '';
    for (let i = 0; i < ingredients.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${ingredients[i].strIngredient}')" class="rounded-3 cursor-pointer text-center">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${ingredients[i].strIngredient}</h3>
                    <p class="text-center">${ingredients[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>`
    }
    rowMeals.innerHTML = cartona;
}

async function getCategoriesMeals(category) {
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    rse = await response.json();
    // console.log(rse);
    displayMeals(rse.meals);
    $(".inner-loading-screen").fadeOut(300)
}
async function getAreaMeals(area) {
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    rse = await response.json();
    // console.log(rse);
    displayMeals(rse.meals);
    $(".inner-loading-screen").fadeOut(300)
}
async function getIngredientsMeals(ingredients) {
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    rse = await response.json();
    // console.log(rse);
    displayMeals(rse.meals);
    $(".inner-loading-screen").fadeOut(300)
}

async function getMealDetails(mealId) {
    closeSideNav();
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    searchInput.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    rse = await response.json();
    // console.log(rse);
    displayMealsDetails(rse.meals[0]);
    $(".inner-loading-screen").fadeOut(300)
}

function displayMealsDetails(meal) {
    searchInput.innerHTML = "";
    let ingredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}"</li>`
        }
    }
    // console.log(ingredients);

    let tags = meal.strTags?.split(",")
    let tagsStr = ``
    if (!tags) tags = []
    for (let i = 0; i < tags.length; i++) {

        tagsStr = `<li class="alert alert-danger m-2 p-1">${tags[i]}"</li>`
    }
    // console.log(tagsStr);

    let cartona = `
    <div class="col-md-4 my-2">
      <img src="${meal.strMealThumb}" class="w-100 rounded-3">
      <h2 class="text-center text-success">${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2 class="text-info">Instructions</h2>
      <p>${meal.strInstructions}"</p>
      <h3 class="text-success"><span>Area: </span>${meal.strArea}</h3>
      <h3 class="text-success"><span>Category: </span>${meal.strCategory}</h3>
      <h3 class="text-info">Recipes: </h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
      </ul>
      <h3 class="text-info">Tags: </h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
      </ul>
      <a target="_blank" href="${meal.strSource}"" class="btn btn-success">Source</a>
      <a target="_blank" href="${meal.strYoutube}"" class="btn btn-danger">Youtube</a>
    </div>`
    rowMeals.innerHTML = cartona;
}

// Saerch
function showSearchInput() {
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    searchInput.innerHTML = `<div class="container w-75">
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="(searchByName(this.value))" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="(searchByFirstLitter(this.value))" maxlength="1" type="text" class="form-control bg-transparent text-white" placeholder="Search By First Litter">
        </div>
    </div>
</div> `;
    rowMeals.innerHTML = ""
    $(".inner-loading-screen").fadeOut(300)
}

async function searchByName(item) {
    rowMeals.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
    res = await response.json();
    console.log(res);
    res.meals ? displayMeals(res.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300)
}

async function searchByFirstLitter(item) {
    $(".inner-loading-screen").fadeIn(300)
    item == "" ? item = "a" : ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`);
    res = await response.json();
    console.log(res.meals);
    res.meals ? displayMeals(res.meals) : displayMeals([]);
    $(".inner-loading-screen").fadeOut(300)
}

function showContacts() {
    $(".inner-loading-screen").fadeIn(300)
    rowMeals.innerHTML = `<div class="contact main-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control is-invalid" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger d-none w-100 mt-2 ">
                    Special Character And Number Not Valid
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control is-invalid" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger d-none w-100 mt-2">
                    Email Not Valid *example@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="tel" class="form-control is-invalid" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger d-none w-100 mt-2">
                    Enter Valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control is-invalid" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger d-none w-100 mt-2">
                    Enter Valid Age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control is-invalid" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger d-none w-100 mt-2">
                    Enter Valid Password *Minimum eight characters at least one letter and one number*
                </div>
            </div>
            <div class="col-md-6">
                <input id="resetPasswordInput" onkeyup="inputsValidation()" type="password" class="form-control is-invalid" placeholder="Enter Your RePassword">
                <div id="rePasswordAlert" class="alert alert-danger d-none w-100 mt-2">
                    Enter Valid Password
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger mt-3 px-3">Submit</button>
    </div>
</div>`

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })
    document.getElementById("resetPasswordInput").addEventListener("focus", () => {
        rePasswordInputTouched = true
    })

    submitBtn = document.getElementById("submitBtn");

    $(".inner-loading-screen").fadeOut(300)

}

let nameInputTouched = false
let emailInputTouched = false
let phoneInputTouched = false
let ageInputTouched = false
let passwordInputTouched = false
let rePasswordInputTouched = false

function inputsValidation() {

    // Alert Show Or Hidden
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")
            document.getElementById("nameInput").classList.replace("is-invalid", "is-valid")
        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
            document.getElementById("nameInput").classList.replace("is-valid", "is-invalid")
        }
    }

    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
            document.getElementById("emailInput").classList.replace("is-invalid", "is-valid")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
            document.getElementById("emailInput").classList.replace("is-valid", "is-invalid")
        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
            document.getElementById("phoneInput").classList.replace("is-invalid", "is-valid")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
            document.getElementById("phoneInput").classList.replace("is-valid", "is-invalid")
        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
            document.getElementById("ageInput").classList.replace("is-invalid", "is-valid")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
            document.getElementById("ageInput").classList.replace("is-valid", "is-invalid")
        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
            document.getElementById("passwordInput").classList.replace("is-invalid", "is-valid")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
            document.getElementById("passwordInput").classList.replace("is-valid", "is-invalid")
        }
    }

    if (rePasswordInputTouched) {
        if (rePasswordValidation()) {
            document.getElementById("rePasswordAlert").classList.replace("d-block", "d-none")
            document.getElementById("resetPasswordInput").classList.replace("is-invalid", "is-valid")
        } else {
            document.getElementById("rePasswordAlert").classList.replace("d-none", "d-block")
            document.getElementById("resetPasswordInput").classList.replace("is-valid", "is-invalid")
        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        rePasswordValidation()) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', true);
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
    // document.getElementById("nameInput").ariaValueMax.test()
}
function emailValidation() {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("emailInput").value))
    // return ( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("nameInput").value))
}
function phoneValidation() {
    return (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(document.getElementById("phoneInput").value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}
function rePasswordValidation() {
    return document.getElementById("resetPasswordInput").value == document.getElementById("passwordInput").value
}