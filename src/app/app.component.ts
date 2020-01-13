import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {range} from 'lodash';
import {DilationFilterService} from './services/dilation-filter.service';
import {ErosionFilterService} from './services/erosion-filter.service';
import {MedianFilterService} from './services/median-filter.service';

export type IFilter = 'median' | 'erosion' | 'dilation';

export interface FormGroupSize {
  rows: number;
  columns: number;
}

export interface IFilterOptions {
  mainValues: string[][];
  structuralElement: string[][];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mainValues: FormGroup;
  structuralElement: FormGroup;
  filters = ['median', 'erosion', 'dilation'];
  chosenFilter: IFilter;
  results: number[][];


  constructor(
    private fb: FormBuilder,
    private dilationFilterService: DilationFilterService,
    private erosionFilterService: ErosionFilterService,
    private medianFilterService: MedianFilterService,
  ) {
    this.mainValues = this.generateFormGroup({rows: 4, columns: 4});
    this.structuralElement = this.generateFormGroup({rows: 3, columns: 3});
  }

  generateFormGroup(options: FormGroupSize) {
    if (!options.rows || !options.columns) {
      throw Error('You must pass options');
    }

    const rowsArray: FormArray = this.fb.array([]);
    range(options.rows).forEach(() => {
      const columnsArray: FormArray = this.fb.array([]);
      range(options.columns).forEach(() => {
        columnsArray.push(this.fb.control(''));
      });
      rowsArray.push(columnsArray);
    });
    return this.fb.group({values: rowsArray});
  }

  calculateResult() {
    const mainValues: string[][] = this.formToValues(this.mainValues.value.values);
    // const structuralElement: string[][] = this.formToValues(this.structuralElement.value.values);
    switch (this.chosenFilter) {
      // case 'dilation': {
      //   this.results = this.dilationFilterService.calculate({mainValues, structuralElement});
      //   break;
      // }
      // case 'erosion': {
      //   this.results = this.erosionFilterService.calculate({mainValues, structuralElement});
      //   break;
      // }
      case 'median': {
        this.results = this.medianFilterService.calculate(mainValues);
        break;
      }
      default: {
        throw Error('Such filter type does not exit');
        break;
      }
    }
  }

  formToValues(formGroupValue: any): any {
    if (!formGroupValue || !formGroupValue.length) {
      return;
    }
    const rows = [];
    Object.keys(formGroupValue).forEach((_, rowIndex) => {
      const columns = [];
      Object.keys(formGroupValue[rowIndex]).forEach((__, columnIndex) => {
        columns.push(formGroupValue[rowIndex][columnIndex]);
      });
      rows.push(columns);
    });

    return rows;
  }

}
