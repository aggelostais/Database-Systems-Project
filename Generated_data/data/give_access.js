const fs = require('fs')

let occupied_room = new Array(581).fill(0);

function RandomRoom(){
    while(1){
        const sub_room = Math.floor(Math.random() * 80) + 1; //random integer from 1 to 80
        const floor = Math.floor(Math.random() * 5) + 1; //random integer from 1 to 5

        const room = 100 * floor + sub_room;

        if(!occupied_room[room]) {
            occupied_room[room] = 1;
            return room;
        }
    }
}

function addTwoDays(timestamp){
    let year = new Date(timestamp).getFullYear();
    let month = new Date(timestamp).getMonth() + 1;
    let day = new Date(timestamp).getDate();
    let Hours = new Date(timestamp).getHours();
    let Mins = new Date(timestamp).getMinutes();
    let Secs = new Date(timestamp).getSeconds();
    if(day === 30){
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
        day += 2;
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


fs.readFile('./customer.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const customers = JSON.parse(jsonString)

        let areas = fs.readFileSync('./newAreas.json', {encoding:'utf8', flag:'r'});
        areas = JSON.parse(areas);
        
        fs.readFile('./registered_in.json', 'utf8', (err, secondString) => {
            const registered_in = JSON.parse(secondString)

            let has_access = [];

            customers.forEach(customer => {
                console.log(customer.nfc_id);
                const curr_reg = registered_in.filter(reg => 
                    reg.nfc_id === customer.nfc_id
                );
                console.log(curr_reg);

                curr_reg.forEach(reg => {
                    const room = RandomRoom();
                    if(reg.service_id === 1){   // give access to room
                        has_access.push({
                            nfc_id: reg.nfc_id,
                            area_id: room,
                            start: reg.registration_time,
                            end: addTwoDays(reg.registration_time)
                        })
                    }

                    if(reg.service_id === 5){   // give access to gyms
                        for(let i = 21; i <= 24; i++){
                            has_access.push({
                                nfc_id: reg.nfc_id,
                                area_id: i,
                                start: reg.registration_time,
                                end: addTwoDays(reg.registration_time)
                            })
                        }    
                    }

                    if(reg.service_id === 6){   // give access to saunas
                        for(let i = 25; i <= 34; i++){
                            has_access.push({
                                nfc_id: reg.nfc_id,
                                area_id: i,
                                start: reg.registration_time,
                                end: addTwoDays(reg.registration_time)
                            })
                        }    
                    }

                    if(reg.service_id === 7){   // give access to gyms
                        for(let i = 11; i <= 20; i++){
                            has_access.push({
                                nfc_id: reg.nfc_id,
                                area_id: i,
                                start: reg.registration_time,
                                end: addTwoDays(reg.registration_time)
                            })
                        }    
                    }

                    if(reg.service_id === 1){   // give default access
                        // restaurants
                        for(let i = 7; i <= 10; i++){
                            has_access.push({
                                nfc_id: reg.nfc_id,
                                area_id: i,
                                start: reg.registration_time,
                                end: addTwoDays(reg.registration_time)
                            })
                        }    

                        // bars
                        for(let i = 1; i <= 6; i++){
                            has_access.push({
                                nfc_id: reg.nfc_id,
                                area_id: i,
                                start: reg.registration_time,
                                end: addTwoDays(reg.registration_time)
                            })
                        }    

                        // hair salon
                        for(let i = 35; i <= 35; i++){
                            has_access.push({
                                nfc_id: reg.nfc_id,
                                area_id: i,
                                start: reg.registration_time,
                                end: addTwoDays(reg.registration_time)
                            })
                        }    

                        // all elevators
                        for(let i = 56; i <= 60; i++){
                            has_access.push({
                                nfc_id: reg.nfc_id,
                                area_id: i,
                                start: reg.registration_time,
                                end: addTwoDays(reg.registration_time)
                            })
                        }   

                        // just one corridor based on the room

                        const floor = Math.floor(room/100);
                        const sub_room = room % 100 - 1;
                        const group = Math.floor(sub_room/20);
                        let section = "south";
                        switch(group) {
                            case 0:
                                section = "south";
                                break;
                            case 1:
                                section = "north";
                                break;
                            case 2:
                                section = "east";
                                break;
                            default:
                                section = "west";
                        }

                        const corridor = areas.filter(area => 
                            area.area_name === "corridor_" + floor + "_" + section
                        )
                        has_access.push({
                            nfc_id: reg.nfc_id,
                            area_id: corridor[0].area_id,
                            start: reg.registration_time,
                            end: addTwoDays(reg.registration_time)
                        })
                        
                    }
                    
                });
            });

            const return_string = JSON.stringify(has_access);
            fs.writeFile('./has_access.json', return_string, err => {
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