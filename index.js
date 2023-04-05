import fetch from 'node-fetch'
import cheerio from 'cheerio'

async function search(event) { 
  event.preventDefault()
  const searchInput = document.getElementById('search-input').value
  const url = `https://www.amazon.fr/s?k=${searchInput}`
  try {
    const response = await fetch(url)
    const data = await response.text()
    const products = getProducts(data)
    displayProducts(products)
  } catch (error) {
    console.error(error)
  }
}

function getProducts(html) {
  const $ = cheerio.load(html)
  const products = []
  $(".s-result-item", html).each(function(){
    const title = $(this).find('h2').text().trim()
    const price = $(this).find('.a-price-whole').text().trim()
    const url = $(this).find('a').attr('href')
    const product = {
      title,
      price,
      url
    }
    products.push(product)
  })
  return products
}

function displayProducts(products) {
  const resultDiv = document.getElementById('result')
  resultDiv.innerHTML = ''
  products.forEach((product) => {
    const productDiv = document.createElement('div')
    const titleElement = document.createElement('h2')
    titleElement.textContent = product.title
    const priceElement = document.createElement('p')
    priceElement.textContent = `Prix: ${product.price} €`
    const urlElement = document.createElement('a')
    urlElement.textContent = 'Voir sur Amazon'
    urlElement.href = `https://www.amazon.fr${product.url}`
    productDiv.appendChild(titleElement)
    productDiv.appendChild(priceElement)
    productDiv.appendChild(urlElement)
    resultDiv.appendChild(productDiv)
  })
}
