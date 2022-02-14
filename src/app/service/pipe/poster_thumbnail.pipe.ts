import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posterThumbnail'
})
export class PosterThumbnailPipe implements PipeTransform {
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
