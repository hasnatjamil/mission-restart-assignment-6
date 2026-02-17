//Load all products through API calling and display it////////////
const loadProductsApi = async () => {
  //manageSpinner(true);
  const url = `https://fakestoreapi.com/products`;
  const res = await fetch(url);
  const data = await res.json();

  if (document.getElementById("product-container")) {
    displayProduct(data);
  } else if (document.getElementById("all-product-container")) {
    displayAllProducts(data);
  }

  //console.log(details);
  // manageSpinner(false);
};
loadProductsApi();

const displayProduct = (products) => {
  //console.log(products);

  // step-1. get the container & empty
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  const filteredProducts = products.filter(
    (product) => product.rating.rate >= 4.5,
  );

  // 2. get into level lessons
  for (let product of filteredProducts) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `    
    <div class="card bg-base-100 border-2 border-gray-100 m-4">
            <figure class="bg-[#E5E7EB] h-64 flex items-center justify-center">
                <img class="max-h-full object-contain p-6" src="${product.image}" />
            </figure>

            <div class="card-body">
                <div class="flex justify-between">
                    <div class="badge badge-soft badge-primary font-semibold text-[#3B25C1]"><span>${product.category}</span></div>
                    <div><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i><span>${product.rating.rate}(${product.rating.count})</span></div>
                </div>
                <h2 class="card-title font-bold text-xl"> ${product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title} </h2>
                <h3 class="font-extrabold text-xl"><span>$</span>${product.price}</h3>
                <div class="card-actions justify-between my-4">
                    <button class="btn w-30 h-8"><span><i class="fa-regular fa-eye"></i></span>Details</button>
                    <button class="btn btn-primary  w-30 h-8">
                    <span><i class="fa-brands fa-opencart"></i></span>Add</button>
                </div>
            </div>
    </div>   
    `;

    productContainer.appendChild(cardDiv);
  }
  // console.log(lessons);
  // manageSpinner(false);
};

const displayAllProducts = (products) => {
  //console.log(products);

  // step-1. get the container & empty
  const productContainer = document.getElementById("all-product-container");
  productContainer.innerHTML = "";

  // 2. get into level lessons
  for (let product of products) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `    
    <div class="card bg-base-100 border-2 border-gray-100 m-4">
            <figure class="bg-[#E5E7EB] h-64 flex items-center justify-center">
                <img class="max-h-full object-contain p-6" src="${product.image}" />
            </figure>

            <div class="card-body">
                <div class="flex justify-between">
                    <div class="badge badge-soft badge-primary font-semibold text-[#3B25C1]"><span>${product.category}</span></div>
                    <div><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i><span>${product.rating.rate}(${product.rating.count})</span></div>
                </div>
                <h2 class="card-title font-bold text-xl"> ${product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title} </h2>
                <h3 class="font-extrabold text-xl"><span>$</span>${product.price}</h3>
                <div class="card-actions justify-between my-4">
                    <button class="btn w-30 h-8"><span><i class="fa-regular fa-eye"></i></span>Details</button>
                    <button class="btn btn-primary  w-30 h-8">
                    <span><i class="fa-brands fa-opencart"></i></span>Add</button>
                </div>
            </div>
    </div>   
    `;

    productContainer.appendChild(cardDiv);
  }
  // console.log(lessons);
  // manageSpinner(false);
};

//Loading spinner
const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("product-container").classList.add("hidden");
  } else {
    document.getElementById("product-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// loading categories as buttons
const loadCategories = async () => {
  const url = `https://fakestoreapi.com/products/categories`;
  const res = await fetch(url);
  const details = await res.json();

  displayCategories(details);
};
loadCategories();

const displayCategories = (categories) => {
  console.log(categories);

  // 1. get the container & empty
  const categoryContainer = document.getElementById("category-container");

  // 2. get into categories
  for (let category of categories) {
    const button = document.createElement("button");

    // ID safe বানাতে apostrophe & space remove করবো
    const safeCategory = category.replace(/[^a-zA-Z0-9]/g, "");

    button.id = `category-btn-${safeCategory}`;
    button.textContent = category;

    button.className = "btn lesson-btn w-auto h-7 rounded-xl";

    button.addEventListener("click", () => {
      loadCategory(category);
    });

    categoryContainer.appendChild(button);
  }
};

const loadCategory = (category) => {

  const safeCategory = category.replace(/[^a-zA-Z0-9]/g, "");
  const url = `https://fakestoreapi.com/products/category/${category}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      removeActive();

      const clickBtn = document.getElementById(`category-btn-${safeCategory}`);
      clickBtn.classList.add("active");

      displayAllProducts(data);
    });
};


//Remove active button
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
