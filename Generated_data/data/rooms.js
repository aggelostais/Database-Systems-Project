const fs = require('fs')
fs.readFile('./area.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const areas = JSON.parse(jsonString)
        
        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 80; j++) {

                const id = 100*i + j;
                const new_room = {
                    area_id: id,
                    beds: Math.floor(Math.random() * 4) + 1,
                    area_name: 'room_' + id,
                    area_description: 'room_' + id
                };
                
                areas.push(new_room);
                
            }
        }

        const return_string = JSON.stringify(areas);
        fs.writeFile('./newAreas.json', return_string, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})