import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseJson'
})
export class ParseJsonPipe implements PipeTransform {

  transform(value: string): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('Invalid JSON string:', error);
      return null;
    }
  }

}
