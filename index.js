const express = require('express');
const router = express();
const bodyParser = require('body-parser');


let KakaoAPI = async function(){

    router.use(bodyParser.urlencoded({extended: false}));
    router.use(bodyParser.json());


    /* server setting port 3000 */
    router.listen(3000, () => {
        console.log("Sever start");
    });



    /* Kakao api request /keyboard */
    router.get('/keyboard', (req, res) => {
       const menu = {
               "type" : "text"
       };

       console.log("/keyboard");


        console.log(req.params);

        // console.log(res);

        res.set({
           "content-type" : "application/json; charset=utf8"
       }).send(JSON.stringify(menu));



    });




    /* Kakao api responds message from user chat commands.
        It is handling logic from user commands.
     */
    router.post('/message', (req, res) => {


        console.log(req.body.content);
        let reqMessage = req.body.content;


        let message = {
            "message": {
                "text" : ""
            },
            "keyboard": {
                "type" : "text"
            }
        };

        switch(reqMessage.trim()){
            case "/hello":

                message = {
                  "message" : {
                      "text" : "Hello World!"
                    },
                    "Keyboard" : {
                      "type" : "text"
                    }
                };
                break;
            case "/help":
                message = {
                    "message" : {
                        "text" : "Available commands are /hello /help /bye"
                    },
                    "Keyboard" : {
                        "type" : "text"
                    }
                };
                break;
            case "/bye":
                message = {
                    "message" : {
                        "text" : "bye"
                    },
                    "Keyboard" : {
                        "type" : "text"
                    }
                };
                break;
        }

       const params = {
           user_key: req.body.user_key,     // unique user identifier
           type: req.body.type,             // body type. It determines user input type
           content: req.body.content        // content. User messages.
       };

        console.log(params);

       res.set({
           "content-type" : "application/json; charset=utf8"
       }).send(JSON.stringify(message));
    });

    console.log("test");

}();

module.exports = exports = KakaoAPI;