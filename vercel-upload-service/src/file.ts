import fs from 'fs';
import path from 'path';

export const getAllFiles = (folderPath: string) => {

    let responce: string[] = [];
    const allFileAndFolder = fs.readdirSync(folderPath);

    allFileAndFolder.forEach(file => {

        const fullFilePath = path.join(folderPath, String(file));
        const stats = fs.statSync(fullFilePath);

        if (stats.isDirectory()) {
            responce = responce.concat(getAllFiles(fullFilePath));
        } else {
            responce.push(fullFilePath);
        }
    });
    return responce;
}