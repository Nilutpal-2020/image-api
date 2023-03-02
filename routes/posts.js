const router = require('express').Router();
const multer = require('multer');

let Post = require('../models/post.model');

const Storage = multer.diskStorage({
    destination: 'Images',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: Storage
}).single('uploadImage')

router.get("/", async (req, res) => {
    await Post.find({userId: req.user})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", async (req, res) => {
    await upload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
            const title = req.body.title;
            const address = req.body.address;
            const stay_info = req.body.stay_info;
            const description = req.body.description;
            const image = {
                data: req.file.filename,
                contentType: 'image/jpeg'
            }
        
            const newPost = new Post({
                title,
                address,
                stay_info,
                description,
                image
            });

            newPost.save()
                .then(() => res.json("Post Added!"))
                .catch(err => res.status(400).json(`Error: ${err}`));
        }
    })
});

router.delete('/delete/:id', async (req, res) => {
    const post = await Post.findOne({_id: req.params.id});

    if (!post)
        return res
            .status(400)
            .json({msg: "No Post Found"});
    
    await Post.findByIdAndDelete(req.params.id)
        .then(() => res.json("Post Deleted!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;