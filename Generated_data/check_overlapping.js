const { group } = require('console');
const fs = require('fs');

let events = fs.readFileSync('./data/visit.json', {encoding:'utf8', flag:'r'});
events = JSON.parse(events);

let visits = {};

for (let i = 1; i <= 100; i++) {
    visits[i] = [];
}

function overlap(event){
    const id = event.nfc_id;

    const overlapping_event = visits[id].find(element => new Date(event.from) > new Date(element.from) && new Date(event.from) < new Date(element.to));
    return overlapping_event;
}

for (let i = 0; i < events.length; i++) {
    const event = events[i];

    const overlapping_event = overlap(event);

    if(overlapping_event){
        console.log(overlapping_event);
        console.log(event);
    }

    visits[event.nfc_id].push(event);
}

