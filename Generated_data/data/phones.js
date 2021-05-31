const fs = require('fs')
fs.readFile('./customer.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const customers = JSON.parse(jsonString)

        fs.readFile('./random_phones.json', 'utf8', (err, phonesString) => {
            if (err) {
                console.log("Error reading file from disk:", err)
                return
            }

            const phones = JSON.parse(phonesString)

            let phones_list = [];
            let phone_index = 0;
            for (let i = 0; i < customers.length; i++) {
                const count = Math.floor(Math.random() * 2) + 1;
                
                for (let j = 0; j < count; j++) {
                    const phone = {
                        nfc_id: customers[i].nfc_id,
                        phone_number: phones[phone_index + j].phone
                    }
    
                    phones_list.push(phone)
                }
                phone_index += count;
            }
            const return_string = JSON.stringify(phones_list);
            fs.writeFile('./phones.json', return_string, err => {
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