const { Fish } = require('../models')
module.exports = {
    // indx with serach blog
    async index (req, res) {
        try {
            let fishs = null
            const search = req.query.search
            // console.log('search key: ' + search)
            if (search) {
                fishs = await Fish.findAll({
                    where: {
                        $or: [
                            'name',
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['updatedAt', 'DESC']]
                })
            } else {
                fishss = await Fish.findAll({
                    order: [['updatedAt', 'DESC']]
                })
            }
            res.send(fishss)
        } catch (err) {
            res.status(500).send({
                 error: 'an error has occured trying to fetch the blogs'
            })
        }
    },
    // create comment
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            const fish = await Fish.create(req.body)
            res.send(fish.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create fish incorrect'
            })
        }
    },
    // edit fish, suspend, active
    async put(req, res) {
        try {
            await Fish.update(req.body, {
                where: {
                    id: req.params.fishId
                }
            })
            res.send(req.body)
        } catch (err) {
            216
            req.status(500).send({
                error: 'Update fish incorrect'
            })
        }
    },
    // delete fish
    async remove(req, res) {
        try {
            const fish = await Fish.findOne({
                where: {
                    id: req.params.fishId
                }
            })
            if (!fish) {
                return res.status(403).send({
                    error: 'The fish information was incorrect'
                })
            }
            await fish.destroy()
            res.send(fish)
        } catch (err) {
            req.status(500).send({
                error: 'The fish information was incorrect'
            })
        }
    },
    // get product by id
    async show(req, res) {
        try {
            const fish = await Fish.findById(req.params.fishId)
            res.send(fish)
        } catch (err) {
            req.status(500).send({
                error: 'The fish information was incorrect'
            })
        }
    }
}