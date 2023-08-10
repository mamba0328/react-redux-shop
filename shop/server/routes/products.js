const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define your routes and handlers here
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data', 'guitars.json'); // Update the path and filename
    res.sendFile(filePath)
});

router.get('/:id', (req, res) => {
    const filePath = path.join(__dirname, '../data', 'guitars.json'); // Update the path and filename

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading JSON file');
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            const productWithId = jsonData.find(product => +product.code === +req.params.id)
            res.json(productWithId);
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send('Error parsing JSON data');
        }
    });

});
// Export the router so it can be used in other files
module.exports = router;