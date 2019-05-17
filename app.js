const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const Marketo = require('node-marketo-rest');


const marketo = new Marketo({
  endpoint: 'https://072-HIP-855.mktorest.com/rest',
  identity: 'https://072-HIP-855.mktorest.com/identity',
  clientId: '178eeb32-a753-4276-aba0-60d369d6068a',
  clientSecret: 'X7pQcIhBcGFNu5ZO5tFr7cnBebaSQ5gH'
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'view','index.html'))
});

app.post('/getLeadid',(req,res,next)=>{
    
    let value = req.body.data.replace('&','%26')
    let marketo_instance = "https://072-HIP-855.mktorest.com"
    let endpoint = "/rest/v1/leads.json"
    let auth_token =  "?access_token=" + "fadc5ed8-e04e-489d-b71e-e414a2d5c505:ab"
    let filter_type_and_values = `&filterType=cookies&filterValues=${value}&fields=cookies,email`
    let url =  marketo_instance + endpoint + auth_token + filter_type_and_values;
    axios.get(url)
  .then(function (response) {
    res.status(200)
    res.send({id: response.data.result[0].id});
  })
  .catch(function (error) {
    console.log(error);
  });
})

app.post('/triggerCampaign',(req,res,next)=>{
    let sum = req.body.data
    
    
    marketo.campaign.request(1718,[{id :1017006}],[ { name : "{{my.sum}}", value : sum }]).then(function(data){
      if(data.success){
        res.status(200);
        res.send({
          data: "DONE"
        })
      }
    })
    
})

app.listen(4000);