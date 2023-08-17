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
        $(elemSelector).each((parentIdx, parentElem) => {
            $(parentElem).children().each((childIdx, childElem) => {
                console.log($(childElem).text())
            })
        })
    } catch (err) {
        console.error(err)
    }
}

getTopPicks()