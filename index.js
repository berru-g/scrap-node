//scrapping with nodejs
import fetch from 'node-fetch'
import cheerio from 'cheerio' 

async function fetchData(url){
    const response = await fetch(url)
    const data = await response.text()
   getQuestions(data)
    //console.log(data)
}
fetchData("https://www.livre-audio-enfant.com/")

function getQuestions(html){
    const $ = cheerio.load(html)

    $(".home-cards", html).each(function(){
        console.log($(this).text())
        console.log($(this).children("a").attr("href"))
    })
}