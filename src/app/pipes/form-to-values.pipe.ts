import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formToValues',
  pure: false,
})
export class FormToValuesPipe implements PipeTransform {

  transform(value: any): any {
    if (!value || !value.length) {
      return;
    }

    const rows = [];

    Object.keys(value).forEach((_, rowIndex) => {
      const columns = [];
      Object.keys(value[rowIndex]).forEach((__, columnIndex) => {
        columns.push(value[rowIndex][columnIndex]);
      });
      rows.push(columns);
    });

    return rows;
  }

}
