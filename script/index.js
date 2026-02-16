//Load all products

const loadProductsDetailsApi = async () => {
  const url = `https://fakestoreapi.com/products`;
  const res = await fetch(url);
  const details = await res.json();

  displayProductDetails(details);
  // console.log(details);
};
loadProductsDetailsApi();

const displayProductDetails = (products) => {
  console.log(products);

  // step-1. get the container & empty
  const productContainer = document.getElementById("product-container");

  // 2. get into level lessons
  for (let product of products) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `    
    <div class="card bg-base-100 w-80 border-2 border-gray-100">
            <figure class="bg-[#E5E7EB] h-96">
                <img src="${product.image}"
                    alt="Shoes" />
            </figure>
            <div class="card-body">
                <div class="flex justify-between">
                    <div class="badge badge-soft badge-primary font-semibold text-[#3B25C1]"><span>${product.category}</span></div>
                    <div><i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i><span>${product.rating.rate}(${product.rating.count})</span></div>
                </div>
                <h2 class="card-title font-bold text-xl"> ${product.title} </h2>
                <h3 class="font-extrabold text-xl"><span>$</span>${product.price}</h3>
                <div class="card-actions justify-between my-4">
                    <button class="btn w-30 h-8"><span><i class="fa-regular fa-eye"></i></span>Details</button>
                    <button class="btn btn-primary  w-30 h-8"><span><i
                                class="fa-brands fa-opencart"></i></span>Add</button>
                </div>
            </div>
    </div>   
    `;

    productContainer.append(cardDiv);
  }
  // console.log(lessons);
};
