const fs = require('fs')

function dateToString(date){
    let month = date.getMonth() + 1;
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

let areas = fs.readFileSync('./newAreas.json', {encoding:'utf8', flag:'r'});
areas = JSON.parse(areas);

let has_access = fs.readFileSync('./has_access.json', {encoding:'utf8', flag:'r'});
has_access = JSON.parse(has_access);

let visit_events = [];
let use_events = [];

for (let nfc_id = 1; nfc_id <= 100; nfc_id++){
    const room_record = has_access.find(record => record.nfc_id === nfc_id && record.area_id > 99);

    const arival_time = room_record.start;
    const leaving_time = room_record.end;

    const room = room_record.area_id;
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
    const corridor_id = areas.find(area => 
        area.area_name === "corridor_" + floor + "_" + section
    ).area_id;

    const room_beds = areas.find(record => record.area_id === room).beds;
    let room_cost = 80;
    switch(room_beds) {
        case 1:
            room_cost = 80;
            break;
        case 2:
            room_cost = 110;
            break;
        case 3:
            room_cost = 140;
            break;
        default:
            room_cost = 200;
    }

    let conf_room_access = has_access.find(record => record.nfc_id === nfc_id && record.area_id > 10 && record.area_id < 21);

    conf_room_access = (conf_room_access) ? true : false;

    let gym_access = has_access.find(record => record.nfc_id === nfc_id && record.area_id > 20 && record.area_id < 25);

    gym_access = (gym_access) ? true : false;

    let sauna_access = has_access.find(record => record.nfc_id === nfc_id && record.area_id > 24 && record.area_id < 35);

    sauna_access = (sauna_access) ? true : false;

    const today = new Date(arival_time);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Describe routine
    let now = today;

    if(today.getHours() < 22){
        now.setHours(Math.floor(Math.random() * 2) + 22);   // 22 or 23
        now.setMinutes(Math.floor(Math.random() * 60));     // 0 ... 59
    }
    let next_now = new Date(now);

    // charged for room
    use_events.push({
        nfc_id,
        service_id: 1,
        charge_time: arival_time,
        amount: room_cost,
        charge_description: "room booking"
    })

    // enters elevator
    next_now.setMinutes(next_now.getMinutes() + 1);
    visit_events.push({
        nfc_id,
        area_id: Math.floor(Math.random() * 5) + 56,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters corridor
    next_now.setMinutes(next_now.getMinutes() + 2);
    visit_events.push({
        nfc_id,
        area_id: corridor_id,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters room
    next_now.setHours(next_now.getHours() + 10);
    visit_events.push({
        nfc_id,
        area_id: room,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters corridor
    next_now.setMinutes(next_now.getMinutes() + 2);
    visit_events.push({
        nfc_id,
        area_id: corridor_id,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters elevator
    next_now.setMinutes(next_now.getMinutes() + 1);
    visit_events.push({
        nfc_id,
        area_id: Math.floor(Math.random() * 5) + 56,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // 10 mins pass
    next_now.setMinutes(next_now.getMinutes() + 10);
    now = new Date(next_now);
    // enters restaurant
    next_now.setHours(next_now.getHours() + 1);
    visit_events.push({
        nfc_id,
        area_id: Math.floor(Math.random() * 4) + 7,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // charged by restaurant
    use_events.push({
        nfc_id,
        service_id: 2,
        charge_time: dateToString(now),
        amount: Number((Math.random() * 15 + 10).toFixed(2)), // 10.00 - 24.99
        charge_description: "restaurant"
    })

    // 2 hours pass
    next_now.setHours(next_now.getHours() + 2);
    now = new Date(next_now);

    // if not registered yet
    if(now < tomorrow) { 
        now = new Date(tomorrow);
        now.setMinutes(now.getMinutes() + 30);
        next_now = new Date(now);
    }

    if(conf_room_access){
        // enters conf room
        next_now.setHours(next_now.getHours() + 1);
        visit_events.push({
            nfc_id,
            area_id: Math.floor(Math.random() * 10) + 11,
            from: dateToString(now),
            to: dateToString(next_now)
        })
        now = new Date(next_now);

        // charged for using conf room
        use_events.push({
            nfc_id,
            service_id: 7,
            charge_time: dateToString(now),
            amount: 3.50,
            charge_description: "conference room use"
        })
    }
    // 10 mins pass
    next_now.setMinutes(next_now.getMinutes() + 10);
    now = new Date(next_now);

    if(gym_access){
        // enters gym
        next_now.setMinutes(next_now.getMinutes() + 40);
        visit_events.push({
            nfc_id,
            area_id: Math.floor(Math.random() * 4) + 21,
            from: dateToString(now),
            to: dateToString(next_now)
        })
        now = new Date(next_now);

        // charged for using gym
        use_events.push({
            nfc_id,
            service_id: 5,
            charge_time: dateToString(now),
            amount: 4.00, // 10.00 - 24.99
            charge_description: "gym use"
        })
    }
    // 10 mins pass
    next_now.setMinutes(next_now.getMinutes() + 10);
    now = new Date(next_now);

    if(sauna_access){
        // enters sauna
        next_now.setMinutes(next_now.getMinutes() + 10);
        visit_events.push({
            nfc_id,
            area_id: Math.floor(Math.random() * 10) + 25,
            from: dateToString(now),
            to: dateToString(next_now)
        })
        now = new Date(next_now);

        // charged for using sauna
        use_events.push({
            nfc_id,
            service_id: 6,
            charge_time: dateToString(now),
            amount: 2.00, // 10.00 - 24.99
            charge_description: "sauna use"
        })
    }

    // 10 mins pass
    next_now.setMinutes(next_now.getMinutes() + 10);
    now = new Date(next_now);

    // enters restaurant
    next_now.setHours(next_now.getHours() + 1);
    visit_events.push({
        nfc_id,
        area_id: Math.floor(Math.random() * 4) + 7,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // charged by restaurant
    use_events.push({
        nfc_id,
        service_id: 2,
        charge_time: dateToString(now),
        amount: Number((Math.random() * 15 + 10).toFixed(2)), // 10.00 - 24.99
        charge_description: "restaurant"
    })

    // 10 mins pass
    next_now.setMinutes(next_now.getMinutes() + 10);
    now = new Date(next_now);

    // enters hair salon
    next_now.setMinutes(next_now.getMinutes() + 30);
    visit_events.push({
        nfc_id,
        area_id: 35,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // charged by hair salon
    use_events.push({
        nfc_id,
        service_id: 4,
        charge_time: dateToString(now),
        amount: Number((Math.random() * 22 + 8).toFixed(2)), // 8.00 - 29.99
        charge_description: "hair salon"
    })

    // 10 mins pass
    next_now.setMinutes(next_now.getMinutes() + 10);
    now = new Date(next_now);

    // enters bar
    next_now.setHours(next_now.getHours() + 1);
    visit_events.push({
        nfc_id,
        area_id: Math.floor(Math.random() * 6) + 1,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // charged by bar
    use_events.push({
        nfc_id,
        service_id: 3,
        charge_time: dateToString(now),
        amount: Number((Math.random() * 20 + 5).toFixed(2)), // 5.00 - 24.99
        charge_description: "bar"
    })

    // 10 mins pass
    next_now.setMinutes(next_now.getMinutes() + 10);
    now = new Date(next_now);

    if(now.getHours() < 21){
        now.setHours(21);
        next_now = new Date(now);
    }

    // enters elevator
    next_now.setMinutes(next_now.getMinutes() + 1);
    visit_events.push({
        nfc_id,
        area_id: Math.floor(Math.random() * 5) + 56,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters corridor
    next_now.setMinutes(next_now.getMinutes() + 2);
    visit_events.push({
        nfc_id,
        area_id: corridor_id,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters room
    next_now.setHours(next_now.getHours() + 10);

    if(next_now > new Date(leaving_time)){
        next_now = new Date(leaving_time);
        next_now.setMinutes(next_now.getMinutes() - 30);
    }

    visit_events.push({
        nfc_id,
        area_id: room,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters corridor
    next_now.setMinutes(next_now.getMinutes() + 2);
    visit_events.push({
        nfc_id,
        area_id: corridor_id,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // enters elevator
    next_now.setMinutes(next_now.getMinutes() + 1);
    visit_events.push({
        nfc_id,
        area_id: Math.floor(Math.random() * 5) + 56,
        from: dateToString(now),
        to: dateToString(next_now)
    })
    now = new Date(next_now);

    // if there is time for one more meal
    let temp = new Date(next_now);
    temp.setHours(temp.getHours() + 3);
    if(temp < new Date(leaving_time)){
        // 2 hours pass
        next_now.setHours(next_now.getHours() + 2);
        now = new Date(next_now);
        // enters restaurant
        next_now.setHours(next_now.getHours() + 1);
        visit_events.push({
            nfc_id,
            area_id: Math.floor(Math.random() * 4) + 7,
            from: dateToString(now),
            to: dateToString(next_now)
        })
        now = new Date(next_now);

        // charged by restaurant
        use_events.push({
            nfc_id,
            service_id: 2,
            charge_time: dateToString(now),
            amount: Number((Math.random() * 15 + 10).toFixed(2)), // 10.00 - 24.99
            charge_description: "restaurant"
        })
    }

}

let result = JSON.stringify(visit_events);
fs.writeFileSync('./visit.json', result);

result = JSON.stringify(use_events);
fs.writeFileSync('./use.json', result);