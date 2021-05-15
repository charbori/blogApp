var BookModel = require('./book');

const createBook = asyncFn => {
    return (async (req, res) => {
        const {
            title,
            authors,
            publishedDate,
            price,
            tags
        } = req.body;

        const book = new BookModel({
            title,
            authors,
            publishedDate,
            price,
            tags
        });

        try {
            await book.save();
        } catch(e) {
            return res.throw(500, e);
        }

        res.body = book;
    })
}

exports.create = createBook;
