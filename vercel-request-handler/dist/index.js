"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = require("aws-sdk");
const PORT = 3005;
const s3 = new aws_sdk_1.S3({
    accessKeyId: "064ccf20a310188c3690b0ae14ad03d3",
    secretAccessKey: "a0dc13264cfce99ce734d9c5c0777da437aabf08e673b63e97aaeee328a0ce41",
    endpoint: "https://3a5ff7d80fe92d5b8a8b02860ad63dbc.r2.cloudflarestorage.com"
});
const app = (0, express_1.default)();
app.get('/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const host = req.hostname;
    const id = host.split(".")[0];
    const filePath = req.path;
    const contents = yield s3.getObject({
        Bucket: "vercel",
        Key: `build/${id}${filePath}`
    }).promise();
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ?
        "text/css" : "application/javascript";
    res.set("Content-Type", type);
    res.send(contents.Body);
}));
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});
