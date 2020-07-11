let cheerio = require("cheerio");
let fs = require("fs");
let request = require("request");
let matchFile = require("./match.js");

function allMatchHandler(url) {
    request(url, cb);
}

function cb(err, header, body) {
    // request is successfully processed
    if (err == null && header.statusCode == 200) {
        console.log("recieved Response");
        // console.log("Html recieved");
        parseHtml(body);
        // fs=> file system
        // fs.writeFileSync("page.html", body);
    } else if (header.statusCode == 404) {
        console.log("Page Not found");
    } else {
        console.log(err);
        console.log(header);
    }
}

let results = [];

function parseHtml(body) {
    let $ = cheerio.load(body);
    // .match-cta-container a
    let allMatches = $(".col-md-8.col-16");

    for (let i = 0; i < allMatches.length; i++) {
        let allAnchors = $(allMatches[i]).find(".match-cta-container a");
        let scorecardA = allAnchors[0];
        let link = $(scorecardA).attr("href");
        let cLInk = "https://www.espncricinfo.com/" + link;
        // console.log(cLInk);
        results.push(cLInk);
    }

    for (let i = allMatches.length - 1; i >= 0; i--) {
        matchFile.expfn(results[i]);
    }

}


module.exports.allMatchHandler = allMatchHandler;