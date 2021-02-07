var request = require('request');
var fs = require('fs');

var docsLidos = 0;
var actualLines = [];
var myArgs = process.argv.slice(2);
var arrayLinks = fs.readFileSync('links.txt').toString().split("\n");

switch (myArgs[0]) {
case '-h':
    console.log('Execute: node missshot.js <email/user/password>');
    console.log('###############################################');
    console.log('Example: "node missshot.js test@test.com"');
    console.log('Example: "node missshot.js alfredtheuser"');
    console.log('Example: "node missshot.js pass1234"');
    console.log('###############################################');
    break;
case '--help':
    console.log('Execute: node missshot.js <email/user/password>');
    console.log('###############################################');
    console.log('Example: "node missshot.js test@test.com"');
    console.log('Example: "node missshot.js alfredtheuser"');
    console.log('Example: "node missshot.js pass1234"');
    console.log('###############################################');
    break;
default:
    console.log('\n')
    console.log("##::::'##:'####::'######:::'######:::'######::'##::::'##::'#######::'########:")
    console.log("###::'###:. ##::'##... ##:'##... ##:'##... ##: ##:::: ##:'##.... ##:... ##..::'")
    console.log("####'####:: ##:: ##:::..:: ##:::..:: ##:::..:: ##:::: ##: ##:::: ##:::: ##::::'")
    console.log("## ### ##:: ##::. ######::. ######::. ######:: #########: ##:::: ##:::: ##::::'")
    console.log("##. #: ##:: ##:::..... ##::..... ##::..... ##: ##.... ##: ##:::: ##:::: ##::::'")
    console.log("##:.:: ##:: ##::'##::: ##:'##::: ##:'##::: ##: ##:::: ##: ##:::: ##:::: ##::::'")
    console.log("##:::: ##:'####:. ######::. ######::. ######:: ##:::: ##:. #######::::: ##::::'")
    console.log("..:::::..::....:::......::::......::::......:::..:::::..:::.......::::::..:::::'")
    console.log("Developed by. Carlos Giongo")
    console.log('\n')
    keyword = myArgs[0];
    console.log("KEYWORD IS: "+keyword);
    console.log("Searching, this can take a while... (press ctrl+c anytime to stop)");
    //Logica para procurar pela keyword nos documentos
    for(i in arrayLinks) {
        request.get(arrayLinks[i], function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var text = body;
                var arrayLines = text.toString().split("\n"); 
                for(i in arrayLines) {
                    var test = arrayLines[i];
                    if(test.includes(keyword)){
                        console.log("FIND: "+arrayLines[i]+"\n FILE: "+docsLidos+"/12370");
                        actualLines[i] = arrayLines[i];
                        if (fs.existsSync("logfile.txt")) {
                            fs.appendFile('logfile.txt', actualLines[i], err => {
                                if (err) {
                                  console.error(err)
                                  return
                                }
                            })
                        } else{
                            fs.writeFile('logfile.txt', actualLines[i], err => {
                                if (err) {
                                  console.error(err)
                                  return
                                }
                            })
                        }
                    }
                }
            }          
            docsLidos++; 
        });
    }
}
