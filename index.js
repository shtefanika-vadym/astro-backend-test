import { promises as fs } from 'fs';

import express from 'express'
const app = express()
const port = 3000

const delay = async (sec) => {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

const getPosts = async () => {
    let posts = await fs.readFile('large-data.json', 'utf-8');
    posts = JSON.parse(posts);
    await delay(2);

    return posts
}

app.get('/posts', async (req, res) => {
    let posts = await getPosts()
    res.send(posts)
})

app.get('/posts/:id', async (req, res) => {
    const postId = parseInt(req.params.id);
    const posts = await getPosts()

    if (isNaN(postId)) {
        res.status(404).send('Post not found');
    } else {
        const post = posts.find(({ id }) => id === postId);
        if (!post) res.status(404).send('Post not found');
        res.send(post);
    }
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})