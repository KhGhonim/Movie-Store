import { v2 as cloudinary } from 'cloudinary';
import {Readable}  from 'stream';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.api_secret,
});
 
const options = {
  stream: true,
};
 
export async function uploadStream(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
}