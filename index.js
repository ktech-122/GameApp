const express = require("express");
const app = express()
const path = require('path')
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/playApp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    }).catch(err => {
        console.log("OH NO MONGO CONNECTION Error!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/games', async (req, res) => {
    const games = await Product.find({})
    res.render('products/index', { games })

})

app.get('/games/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Requested game ID:", id);
        const gameInfo = await Product.findById(id);
        res.render('products/show', { gameInfo });
        console.log(gameInfo);
    } catch (err) {
        console.log(err);
    }
});

app.get('/games/new/create', (req, res) => {
    res.render('products/new')
})

app.get('/games/:id/edit', async (req, res) => {
    const { id } = req.params;
    const game = await Product.findById(id);
    res.render('products/edit', { game })
})

// app.get('/games/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log("Requested game ID:", id);
//         const gameInfo = await Product.findById(id);
//         res.render('products/show', { gameInfo });
//         console.log(gameInfo);
//     } catch (err) {
//         console.log(err);
//     }
// });
app.put('/games/:id', async (req, res) => {
    const { id } = req.params;
    const game = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/games/${game._id}`);
})

// app.delete('/games/:id', async (req, res) => {
//     const { id } = req.params;
//     games = await Product.findByIdAndDelete(g => g.id !== id);
//     res.redirect('/games');
// })

app.delete('/games/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGame = await Product.findByIdAndDelete(id);
        console.log("Deleted game:", deletedGame);
        res.redirect('/games');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting game");
    }
})

app.post('/games', async (req, res) => {
    const { name, price, category } = req.body;
    try {
        const newGame = new Product({ name, price, category });
        await newGame.save();
        console.log("New game created:", newGame);
        res.redirect('/games');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating new game");
    }
})

app.get('/games/search/s', async (req, res) => {
    const { query } = req.query;
    try {
        const games = await Product.find({ name: { $regex: new RegExp(query, 'i') } });
        console.log("Games Searched:", games);

        if (games.length === 1) {
            // If there's only one game matching the search, redirect to its show page
            res.redirect(`/games/${games[0]._id}`);
        } else if (games.length === 0) {
            // If there are no matches, render a message
            res.render('products/search-no-results', { query });
        } else {
            // If there are multiple matches, render the search results page
            res.render('products/search-results', { query, games });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error finding games");
    }
});




// app.post('/games', async (req, res) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.redirect(`/gamees/${newProduct.id}`);
// })


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})