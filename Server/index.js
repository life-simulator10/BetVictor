const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

async function getTopPicks() {
    try {
        const siteUrl = "https://www.footballsuper.tips/todays-free-football-super-tips/";
        const { data } = await axios({
            method: "GET",
            url: siteUrl
        })

        const $ = cheerio.load(data)
        const elemSelector = "#pool_list > div > div > div.content_element.row.w-100 > div > div.poolList > a > div > div"

        const keys = [
            "matchup",
            "time",
            "teamone",
            "draw",
            "teamtwo",
            "highpercentileodds",
            "prediction"
        ]


        $(elemSelector).each((parentIdx, parentElem) => {
            let keyIdx = 0
            const betobj = {}
            $(parentElem).children().each((childIdx, childElem) => {
                const itemrowVal = $(childElem).text()
                if (itemrowVal) {
                    betobj[keys[keyIdx]] = itemrowVal
                    keyIdx++
                }
            })
            console.log(betobj)
        })
    } catch (err) {
        console.error(err)
    }
}

getTopPicks()