const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get('/', (req,res) => {
    res.send('WORKING');
})

app.listen(PORT, () => {
    console.log(`LISTENING ON PORT: ${PORT}`);
})