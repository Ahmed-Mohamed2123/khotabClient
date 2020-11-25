import { Audio } from './../interfaces/audio';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'audiosFilter'
})
export class AudioFilterPipe implements PipeTransform {
  transform(audios: Audio[], searchTerm: string): Audio[] {
    if (!audios || !searchTerm) {
      return audios;
    }
    return audios.filter(audio =>
      audio.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
