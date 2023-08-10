const express = require('express');
const products = require('./routes/products')

const app = express();
const port = process.env.PORT || 5000;

// API routes
app.use('/api/products', products);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});