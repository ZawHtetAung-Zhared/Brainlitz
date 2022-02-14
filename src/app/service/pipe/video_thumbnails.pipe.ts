import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class VideoThumbnailPipe implements PipeTransform {
  transform(data): any {
    if (data != undefined || data != null) {
      const key = Object.keys(data);
      const thumbnailUrl = data[key[0]];
      return thumbnailUrl;
    } else {
      return null;
    }
  }
}
