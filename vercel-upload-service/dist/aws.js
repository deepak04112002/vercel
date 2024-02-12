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
exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: "064ccf20a310188c3690b0ae14ad03d3",
    secretAccessKey: "a0dc13264cfce99ce734d9c5c0777da437aabf08e673b63e97aaeee328a0ce41",
    endpoint: "https://3a5ff7d80fe92d5b8a8b02860ad63dbc.r2.cloudflarestorage.com"
});
//id-064ccf20a310188c3690b0ae14ad03d3
//key-a0dc13264cfce99ce734d9c5c0777da437aabf08e673b63e97aaeee328a0ce41
//endpoint-https://3a5ff7d80fe92d5b8a8b02860ad63dbc.r2.cloudflarestorage.com
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("called");
    const fielContent = fs_1.default.readFileSync(localFilePath);
    const responce = yield s3.upload({
        Body: fielContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(responce);
});
exports.uploadFile = uploadFile;
