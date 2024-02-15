import express from "express";
import { S3 } from 'aws-sdk';
const PORT = 3005;

const s3 = new S3({
    accessKeyId: "064ccf20a310188c3690b0ae14ad03d3",
    secretAccessKey: "a0dc13264cfce99ce734d9c5c0777da437aabf08e673b63e97aaeee328a0ce41",
    endpoint: "https://3a5ff7d80fe92d5b8a8b02860ad63dbc.r2.cloudflarestorage.com"
})

const app = express();

app.get('/*', async (req, res) => {
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `build/${id}${filePath}`
    }).promise();

    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ?
        "text/css" : "application/javascript"
        res.set("Content-Type",type);
        res.send(contents.Body);
})

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
})