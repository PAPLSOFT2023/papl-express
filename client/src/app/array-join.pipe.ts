import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFormat'
})
export class ArrayJoinPipe implements PipeTransform {

  transform(value: any): string {
    if (!Array.isArray(value)) {
      return value;
    }
    return value.map(item => item.toString()).join(', ');
  }

}
