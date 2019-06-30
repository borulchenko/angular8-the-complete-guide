import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any, fieldToSort: string): any {
    if (value.length === 0) {
      return value;
    }

    return value.sort(this.compareServers(fieldToSort));
  }

  private compareServers(fieldToSort) {
    return function (a, b) {
      if (a[fieldToSort] < b[fieldToSort]) {
        return -1;
      }
      if (a[fieldToSort] > b[fieldToSort]) {
        return 1;
      }
      return 0;
    };
  }
}
