const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app =express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))


// app.post("/failure", (req,res)=>{
//     console.log("failure");
//     res.sendFile(__dirname + "/signup.html");
// //    response.redirect("/");
// });


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});
 
app.post("/",(req,res)=>{
   const firstName = (req.body.fName);
   const secondName = (req.body.lName);
   const email = (req.body.email);
   
   const data = {
       members:[
           {
             email_address:email,
             status:"subscribed",
             merge_fields:{
                FNAME :firstName,
                LNAME : secondName,
             }} ]    
    };
   
     const jsonData = JSON.stringify(data);
     
    const url = "https://us5.api.mailchimp.com/3.0/lists/20788c953b";
    const options = {
        method:"POST",
        auth:"renuka2:112079b46df96de52e1e515162d3af5b-us5"
    }

    const request = https.request(url, options,(response)=>{
    if(response.statusCode===200){
        
        res.sendFile(__dirname + "/success.html");
    }
    else{
        console.log("rr")
        res.sendFile(__dirname + "/failure.html");
    }


    response.on("data",(data)=>{
           console.log(JSON.parse(data));
       })
    });
     request.write(jsonData);
     request.end();  
     

});




app.listen(process.env.PORT || 3000,()=>{
    console.log("listening on 3000");
})
