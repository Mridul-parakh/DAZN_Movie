var express = require('express');
var router = express.Router();
const movies_model = require('../models/movies.ts');

const ValidateUser = async (req: any, res: any, next: any) => {
    try {
        let { role } = req.body;
        if ((role + "").toLowerCase() !== "admin")
            return res.status(401).send({ message: "U are not authorized to make this req..!" });
        next();
    } catch (e) {
        return res.status(500).send({ message: 'Something went wrong...!' })
    }
}
router.get('/movies', async (req: any, res: any, next: any) => {
    try {
        let data = await movies_model.find().lean();
        if (data.length == 0)
            return res.status(404).send({ message: "No Data Found...!" });
        return res.status(200).send({ data });
    } catch (e) {
        return res.status(500).send({ message: 'Something went wrong...!' })
    }
})

router.get('/search', async (req: any, res: any, next: any) => {
    try {
        let { title, genre } = req.query;
        var obj: any = {
            '$or': []
        }
        if (title) {
            obj.$or.push({ title })
        }
        if (genre)
            obj.$or.push({ genre })
        if (!title && !genre)
            return res.status(400).send({ message: "Please send proper query params..!" });
        let data = await movies_model.find(obj).lean();
        if (data.length == 0)
            return res.status(404).send({ message: "No Data Found...!" });
        return res.status(200).send({ data });
    } catch (e) {
        return res.status(500).send({ message: 'Something went wrong...!' })
    }
});
router.post('/movies/:id', ValidateUser, async (req: any, res: any, next: any) => {
    try {
        let id = req.params.id,
            { title, genre, rating, strem_link } = req.body;
        let data_exist = await movies_model.findOne({ id }).lean()
        if (data_exist) {
            return res.status(400).send({ message: "Movie already exist...!" })
        } else {
            await movies_model.create(
                { title, genre, rating, strem_link, id }
            )
        }
        return res.status(201).send({ message: "Movie added successfully...!" });
    } catch (e) {
        return res.status(500).send({ message: 'Something went wrong...!' })
    }
});
router.put('/movies/:id', async (req: any, res: any, next: any) => {
    try {
        let id = req.params.id,
            { title, genre, rating, strem_link } = req.body;

        let data_exist = await movies_model.findOne({ id }).lean()
        if (data_exist) {
            await movies_model.updateOne(
                { id },
                { $set: { title, genre, rating, strem_link } }
            )
        } else {
            return res.status(400).send({ message: "Movie not exist...!" })
        }
        return res.status(200).send({ message: "Movie updated successfully...!" });
    } catch (e) {
        return res.status(500).send({ message: 'Something went wrong...!' })
    }
});
router.delete('/movies/:id', async (req: any, res: any, next: any) => {
    try {
        let id = req.params.id;
        await movies_model.deleteOne({ id }).lean();
        return res.status(200).send({ message: "Movie deleted successfully..!" })
    } catch (e) {
        return res.status(500).send({ message: 'Something went wrong...!' })
    }
})


module.exports = router;