import express from 'express';
const cors = require('cors');
import simpleGit from 'simple-git';
import { generate } from './utils';
import path from 'path';
import { getAllFiles } from './file';
import { uploadFile } from './aws';
import { createClient } from 'redis';
const publisher = createClient();
publisher.connect();

const PORT = 8006;
const app = express();
app.use(cors());
app.use(express.json());

app.post('/deploy', async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();//qwe12
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
    //put this to s3
    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    files.forEach(async file => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    })

    publisher.lPush("build-queue", id);

    res.json({
        id: id
    })
})
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})
//id-064ccf20a310188c3690b0ae14ad03d3
//key-a0dc13264cfce99ce734d9c5c0777da437aabf08e673b63e97aaeee328a0ce41
//endpoint-https://3a5ff7d80fe92d5b8a8b02860ad63dbc.r2.cloudflarestorage.com