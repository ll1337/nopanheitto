const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send('jee moi')
})

app.listen(port, () =>
    console.log('logaa kyl hehe')
)