import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import sharp from "sharp";

@Injectable()
export class ImageService {
  constructor(private readonly httpService: HttpService) {}

  async uploadImage(image: Express.Multer.File) {
    const expirationTime = 600; // 10 minutes
    const url = `https://api.imgbb.com/1/upload?expiration=${expirationTime}&key=${process.env.IMG_API_KEY}`;

    const formData = new FormData();
    const resizedImage = await sharp(image.buffer)
      .resize({ width: 256, withoutEnlargement: true })
      .toBuffer();
    formData.append("image", resizedImage.toString("base64"));

    const { data: imageData } = await firstValueFrom(
      this.httpService.post(url, formData).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data);
          throw error;
        })
      )
    );

    return {
      message: "Image successfully uploaded",
      downloadUrl: imageData.data.url,
      deleteUrl: imageData.data.delete_url,
      expirationTime: `${expirationTime / 60} minutes`,
    };
  }
}
