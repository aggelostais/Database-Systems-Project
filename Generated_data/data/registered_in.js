const fs = require('fs')

fs.readFile('./customer.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const customers = JSON.parse(jsonString)
        
        fs.readFile('./timestamps.json', 'utf8', (err, secondString) => {
            const timestamps = JSON.parse(secondString)
            let resgistered_in_list = [];

            for (let i = 0; i < customers.length; i++) {
                const item = {
                    nfc_id: customers[i].nfc_id,
                    service_id: 1,
                    registration_time: timestamps[Math.floor(Math.random() * 100)].timestamp
                }
                resgistered_in_list.push(item);
                
                const next_time = pickLaterTime(item.registration_time);

                if(Math.floor(Math.random() * 2)){
                    const item = {
                        nfc_id: customers[i].nfc_id,
                        service_id: 5,
                        registration_time: next_time
                    }
                    resgistered_in_list.push(item);
                }
                if(Math.floor(Math.random() * 2)){
                    const item = {
                        nfc_id: customers[i].nfc_id,
                        service_id: 6,
                        registration_time: next_time
                    }
                    resgistered_in_list.push(item);
                }
                if(Math.floor(Math.random() * 2)){
                    const item = {
                        nfc_id: customers[i].nfc_id,
                        service_id: 7,
                        registration_time: next_time
                    }
                    resgistered_in_list.push(item);
                }
            }

            const return_string = JSON.stringify(resgistered_in_list);
            fs.writeFile('./registered_in.json', return_string, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
        })

    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})


function isLater(timestamp_before, timestamp_after){
    return (new Date(timestamp_after) > new Date(timestamp_before));
}

function pickLaterTime(timestamp){
    let year = new Date(timestamp).getFullYear();
    let month = new Date(timestamp).getMonth() + 1;
    let day = new Date(timestamp).getDate();
    let Hours = new Date(timestamp).getHours();
    let Mins = new Date(timestamp).getMinutes();
    let Secs = new Date(timestamp).getSeconds();
    if(day === 31){
        day = 1;
        if(month === 12){
            month = 1;
            year++;
        }
        else{
            month++;
        }
    }
    else{
        day++;
    }

    const res = new Date(year, month, day, Hours, Mins, Secs);

    return dateToString(res);
}

function dateToString(date){
    let month = date.getMonth();
    if(month < 10) month  = "0" + month;
    let day = date.getDate();
    if(day < 10) day  = "0" + day;
    let hours = date.getHours();
    if(hours < 10) hours  = "0" + hours;
    let mins = date.getMinutes();
    if(mins < 10) mins  = "0" + mins;
    let secs = date.getSeconds();
    if(secs < 10) secs  = "0" + secs;

    return date.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + mins + ":" + secs;
}