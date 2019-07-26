var config = require('./config');

const express = require('express')
const axios = require('axios')
const app = express()
const AssistantV1 = require('ibm-watson/assistant/v1');
app.use(express.json());

const service = new AssistantV1({
    version: config.ibm.version,
    iam_apikey: config.ibm.apikey,
    url: config.ibm.url
});

app.post('/message', function (req, res) {
  const message = req.body.message
  routeMessage(message, function(err, response) {
      if(err) {
          console.log(err)
      }
      res.send(response)
  })
})

const routeMessage = function(message, callback) {
    service.message({
        workspace_id: config.ibm.workspace_id,
        input: {'text': message}
        })
        .then(res => {
          console.log(res);
          callback(null, res.output.text)
        })
        .catch(err => {
          console.log(err)
        });
}

app.listen(3000)