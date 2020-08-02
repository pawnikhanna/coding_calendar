var request = require('request');
const arg = process.argv[2];

async function getContests(){
    request('https://clist.by/get/events/', function (error, response, body) {
    if (error) {
        console.log(error)
    }

    let result = JSON.parse(body);
    let currDate = new Date();

    switch (arg) {
        case "past" :
        console.log ('PAST EVENTS');
        result.forEach(function(elem) {
            let end = elem.end;
            end = new Date(end);
            if (end < currDate) {
                console.log(elem);
        }
        })
        break;
        case "ongoing" :
        console.log ('ONGOING EVENTS');
        result.forEach(function(elem) {
            let start = elem.start;
            start = new Date(start);
            let end = elem.end;
            end = new Date(end);
            if (currDate < end && currDate >= start) {
                console.log(elem);
            }
        })
        break;
        case "upcoming" :
        console.log ('UPCOMING EVENTS');
        result.forEach(function(elem) {
            let start = elem.start;
            start = new Date(start);
            if (start > currDate) {
                console.log(elem);
            }
        })
        break;
        default:
            console.log('Wrong Choice');
    }
});
}
getContests();
