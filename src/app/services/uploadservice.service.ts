import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { AppSettings } from "../app.constant";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor() { }
    Bucketname = `${environment.bucketname}`;
    bucket = new S3(
        {
            accessKeyId: environment.accessKeyId,
            secretAccessKey: environment.secretAccessKey,
            region: environment.region
        }
    );

    async uploadfile(fileToUpload: File, mimetype?, fileName?, ) {
        try {
            let folder = ''
            const params = {
                Bucket: this.Bucketname,
                Key: fileName ? folder + fileName : folder + fileToUpload.name,
                Body: fileToUpload,
                ACL: 'public-read',
                ContentType: mimetype
            };
            return new Promise((resolve, reject) => {
                this.bucket.upload(params, function (err, data) {
                    if (err) {
                        reject(err);
                        return false;
                    } else {
                        resolve(data);
                    }
                });
            });
        } catch (err) {
            console.log("an error was occured during image uploading")
            console.error(err.message);
        }
        finally {
        }
    }
}
