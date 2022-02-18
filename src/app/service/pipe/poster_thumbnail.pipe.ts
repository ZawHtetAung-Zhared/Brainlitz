import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posterThumbnail'
})
export class PosterThumbnailPipe implements PipeTransform {
  transform(data): any {
    if (data != undefined || data != null) {
      const key = Object.keys(data);
      const thumbnailUrl = data['640x360'];
      return thumbnailUrl;
    } else {
      return null;
    }
  }
}
