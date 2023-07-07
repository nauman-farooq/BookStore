function searchProducts() {
  var searchInput = document.getElementById('search-input').value.toLowerCase().trim();
  var productTitles = document.querySelectorAll('.products__title');

  productTitles.forEach(function(title) {
    var productTitle = title.textContent.toLowerCase();
    var productCard = title.closest('.products__card');

    if (searchInput !== '' && productTitle.includes(searchInput)) {
      productCard.style.display = 'block';
    } else {
      productCard.style.display = 'none';
    }
  });

  var productsSection = document.getElementById('products');
  if (searchInput !== '') {
    productsSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Scroll to the top of the webpage
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', searchProducts);
