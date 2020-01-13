import { Injectable } from '@angular/core';
import {IFilterOptions} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DilationFilterService {

  calculate(options: IFilterOptions): number[][] {
    const medianRows: number[][] = [];
    return medianRows;
  }

  calculatePixel(values, x, y) {
    const firstRow = [this.getPixel(values, -1, -1), this.getPixel(values, 0, -1), this.getPixel(values, 1, -1)];
    const secondRow = [this.getPixel(values, -1, 0), this.getPixel(values, 0, 0), this.getPixel(values, 1, 0)];
    const thirdRow = [this.getPixel(values, -1, 1), this.getPixel(values, 0, 1), this.getPixel(values, 1, 1)];
    const inlineValues = [].concat(...firstRow, ...secondRow, ...thirdRow);
    return inlineValues[4];
  }

  getPixel(values, x, y): number {
    if (!values[x] || !values[x][y]) {
      return 0;
    } else {
      return values[x][y];
    }
  }
}
