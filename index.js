//scrapping with nodejs
import fetch from 'node-fetch'
import cheerio from 'cheerio' 
import fs from 'fs/promises'

const newestQuestions = []
async function fetchData(url){
    try {
        const response = await fetch(url)
    const data = await response.text()
   getQuestions(data)
    } catch (error) {
        console.error(error)
    }
    //console.log(data)
}
fetchData("https://www.livre-audio-enfant.com/");

async function getQuestions(html){
    const $ = cheerio.load(html)

    $(".home-cards", html).each(function(){
        //console.log($(this).text())
        //console.log($(this).children("a").attr("href"))

        const newestQuestion = {
            id : newestQuestions.length + 1,
            title : $(this).text().trim,
            url : 'https://www.livre-audio-enfant.com/${$(this).children("a").attr("href")}'

        }
        newestQuestions.push(newestQuestion)
    })
    //console.log(newestQuestions) //datajson, async function
    //await fs.writeFile("data.json", JSON.stringify(newestQuestions))
    try {
        await fs.writeFile("data.json", JSON.stringify(newestQuestions))
    } catch (error) {
        console.error(error)
        
    }
}
/*
setInterval(() =>{
    fetchData("https://www.livre-audio-enfant.com/");

}, 1000 * 60 * 60)*/