
import {
    S3Client
} from "@aws-sdk/client-s3";

export const minimizeText =(text,mobile)=>{
    const textSize = mobile ? 100 : 200
 let minText = text
 let minifay = false
    if(text.length >textSize){
         minText = text.substring(0,textSize) 
         minifay = true
    }
    return {minText,minifay}
}

//  get object key
export const getObjectKeyFromUrl = (cdnUrl,imageUrl)=>{
    if(imageUrl){
        return imageUrl?.substring(imageUrl?.indexOf(cdnUrl) + cdnUrl.length)
    }
    return ""
}

// aws config
export const EBP_S3_Images_BUCKET_NAME = import.meta.env.VITE_AWS_S3_BUCKET;
export const EBP_BUCKET_REGION = import.meta.env.VITE_AWS_REGION;

export const EBP_s3Client = new S3Client({
  region: EBP_BUCKET_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_accessKeyId,
    secretAccessKey: import.meta.env.VITE_AWS_secretAccessKey,
  },
});
export const EBP_Images_CDN_BaseUrl = import.meta.env
.VITE_AWS_ImagesBucket_cloudFront_CDN;