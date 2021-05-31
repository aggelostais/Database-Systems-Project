const fs = require('fs')
fs.readFile('./customer.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const customers = JSON.parse(jsonString)
        
        customers.forEach(customer => {
            const target = customer.id_number;

            for(let i = 0; i < customers.length; i++){
                if(customer.nfc_id != customers[i].nfc_id && target === customers[i].id_number){
                    console.log(customer);
                    console.log(customers[i]);
                }
            }
        });

        console.log('END');
    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})