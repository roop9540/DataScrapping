const express = require("express");
const cheerio = require("cheerio");
const axios = require('axios');
const { response } = require("express");
const request = require('request');
const { Model } = require("./database");

const app = express();
app.use(express.json());
app.use(express.urlencoded())
let arr = [];


//const url = "https://loksabha.nic.in/Members/AlphabeticalList.aspx";

app.get('/scrape', (req, res)=>{
    
    request("https://loksabha.nic.in/Members/AlphabeticalList.aspx", (error, response, html) => {
    if (!error && response.statusCode === 200) {
        
      // Load the HTML into cheerio
      const $ = cheerio.load(html);

      // Find all the items on the page
     $('table.member_list_table tbody tr').each((i, item) => {
        // Extract the data for each item
    let url = $(item).find("td a").attr("href");

    // let title = $(item).find("td.titleColumn a").text();
    // let rating = $(item).find("td.imdbRating").text();
    arr.push(`https://loksabha.nic.in/Members/${url}`);
    
   // console.log({url:url})
    

        // Create a new model instance
        // const instance = new Model({
        // //   title: title,
        // //   rating: rating,
        //   url:url
        // });

        // // Save the instance to the database
        // instance.save((error) => {
        //   if (error) {
        //     console.error(error);
        //   }
        // });
       
      });
    
      
     

      res.send(arr)
    } else {
      res.send('Error scraping website.');
    }
  });

  
})
app.get('/scrape/users', async(req, res)=>{
    arr.map((value, index)=>{
        console.log(value);
    request(value, (error, response, html) => {
        console.log(value);
   if (!error && response.statusCode === 200) {
        
      // Load the HTML into cheerio
      const $ = cheerio.load(html);

      // Find all the items on the page
     $('#pnlDiv1 :nth-child(2) table').each((i, item) => {
        let check = $(item).find("tbody tr").text();
        console.log(check);
        // Extract the data for each item
        // let name =  $(item).find("td").text();
        // // let title = $(item).find("td.titleColumn a").text();
        // // let rating = $(item).find("td.imdbRating").text();
        // console.log(name)
  
    

      
      });
    
      
     

      res.send("Suuceesfully")
      
    } else {
      res.send('Error scraping website.');
    }
  })
  
})
})
//app.post('/scrape')
app.listen(8000, ()=>{
    console.log("listening to port 3000")
})