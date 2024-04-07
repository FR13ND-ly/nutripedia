import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'raport',
  standalone: true,
})
export class RaportPipe implements PipeTransform {
  transform(items: any[], field: string): any {
    if (!Array.isArray(items) || !field) {
      return 0;
    }
    const sum = items.reduce((accumulator, currentValue) => {
      return accumulator + currentValue[field];
    }, 0);
    return sum;
  }
}
