import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedianFilterService {

  median(array): number {
    const mid = Math.floor(array.length / 2);
    const nums = [...array].sort((a, b) => a - b);
    return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }

  calculate(mainValues: string[][]): number[][] {
    const medianRows: number[][] = [];

    mainValues.forEach((_, rowIndex) => {
      const columns = [];
      mainValues[rowIndex].forEach((__, columnIndex) => {
        const pixel = this.calculatePixel(mainValues, rowIndex, columnIndex);
        console.log(pixel, rowIndex, columnIndex);
        columns.push(pixel);
      });
      medianRows.push(columns);
    });

    return medianRows;
  }

  calculatePixel(values, x, y) {
    const firstRow = [this.getPixel(values, x - 1, y - 1), this.getPixel(values, x, y - 1), this.getPixel(values, x + 1, y - 1)];
    const secondRow = [this.getPixel(values, x - 1, y), this.getPixel(values, x, y), this.getPixel(values, x + 1, y)];
    const thirdRow = [this.getPixel(values, x - 1, y + 1), this.getPixel(values, x, y + 1), this.getPixel(values, x + 1, y + 1)];
    const inlineValues = [].concat(...firstRow, ...secondRow, ...thirdRow);
    return this.median(inlineValues);
  }

  getPixel(values, x, y): number {
    if (!values[x] || !values[x][y]) {
      return 0;
    } else {
      return values[x][y];
    }
  }
}
