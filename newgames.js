const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/playApp')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    }).catch(err => {
        console.log("OH NO MONGO CONNECTION Error!!")
        console.log(err)
    })

// const infamous = new Product({ name: 'Infamous Second Son', price: 29.99, category: 'Gaming' })

// infamous.save().then(data => console.log(data))
//     .catch(err => console.log(err))

const topGames = [
    {
        name: 'League of Legends',
        price: 29.99,
        category: 'Gaming'
    }, {
        name: 'Fornite',
        price: 9.99,
        category: 'Gaming'
    },
    {
        name: 'God of War',
        price: 69.99,
        category: 'Gaming'
    }, {
        name: 'Star Wars: Jedi Survivor',
        price: '99.99',
        category: 'Gaming'
    }, {
        name: 'EAFC',
        price: 89.99,
        category: 'Gaming'
    }
]

Product.insertMany(topGames)