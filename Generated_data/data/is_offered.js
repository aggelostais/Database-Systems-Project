const fs = require('fs')
fs.readFile('./newAreas.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const areas = JSON.parse(jsonString)

        let is_offered_list = [];
        for (let i = 0; i < areas.length; i++) {

            if(areas[i].area_name.search("bar") >= 0){
                const new_obj = {
                    service_id: 3,
                    area_id: areas[i].area_id
                }
                is_offered_list.push(new_obj);
            }
            if(areas[i].area_name.search("restaurant") >= 0){
                const new_obj = {
                    service_id: 2,
                    area_id: areas[i].area_id
                }
                is_offered_list.push(new_obj);
            }
            if(areas[i].area_name.search("conf") >= 0){
                const new_obj = {
                    service_id: 7,
                    area_id: areas[i].area_id
                }
                is_offered_list.push(new_obj);
            }
            if(areas[i].area_name.search("gym") >= 0){
                const new_obj = {
                    service_id: 5,
                    area_id: areas[i].area_id
                }
                is_offered_list.push(new_obj);
            }
            if(areas[i].area_name.search("sauna") >= 0){
                const new_obj = {
                    service_id: 6,
                    area_id: areas[i].area_id
                }
                is_offered_list.push(new_obj);
            }
            if(areas[i].area_name.search("hair") >= 0){
                const new_obj = {
                    service_id: 4,
                    area_id: areas[i].area_id
                }
                is_offered_list.push(new_obj);
            }
            if(areas[i].area_name.search("room") >= 0){
                const new_obj = {
                    service_id: 1,
                    area_id: areas[i].area_id
                }
                is_offered_list.push(new_obj);
            }
            
        }

        const return_string = JSON.stringify(is_offered_list);
        fs.writeFile('./is_offered.json', return_string, err => {
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