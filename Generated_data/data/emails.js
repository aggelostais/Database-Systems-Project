const fs = require('fs')
fs.readFile('./customer.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err)
        return
    }
    try {
        const customers = JSON.parse(jsonString)
        let emails = [];

        for (let i = 0; i < customers.length; i++) {
            const count = Math.floor(Math.random() * 3) + 1;

            for (let j = 1; j <= count; j++) {
                const email = {
                    nfc_id: customers[i].nfc_id,
                    email_address: customers[i].first_name + j + '@mail.com'
                }

                emails.push(email)
            }
        }

        const return_string = JSON.stringify(emails);
        fs.writeFile('./email.json', return_string, err => {
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