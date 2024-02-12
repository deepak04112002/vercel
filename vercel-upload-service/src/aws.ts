import {S3} from 'aws-sdk';
import fs from 'fs';

const s3=new S3({
    accessKeyId:"064ccf20a310188c3690b0ae14ad03d3",
    secretAccessKey:"a0dc13264cfce99ce734d9c5c0777da437aabf08e673b63e97aaeee328a0ce41",
    endpoint:"https://3a5ff7d80fe92d5b8a8b02860ad63dbc.r2.cloudflarestorage.com"
})

//id-064ccf20a310188c3690b0ae14ad03d3
//key-a0dc13264cfce99ce734d9c5c0777da437aabf08e673b63e97aaeee328a0ce41
//endpoint-https://3a5ff7d80fe92d5b8a8b02860ad63dbc.r2.cloudflarestorage.com
export const uploadFile=async(fileName:string,localFilePath:string)=>{
   console.log("called");
   const fielContent=fs.readFileSync(localFilePath);
   const responce=await s3.upload({
    Body:fielContent,
    Bucket:"vercel",
    Key:fileName,
   }).promise();
   console.log(responce);
}