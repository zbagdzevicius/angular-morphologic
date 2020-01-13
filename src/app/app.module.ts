import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatRadioModule, MatTableModule} from '@angular/material';
import {CdkColumnDef} from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormToValuesPipe } from './pipes/form-to-values.pipe';
import {DilationFilterService} from './services/dilation-filter.service';
import {ErosionFilterService} from './services/erosion-filter.service';
import {MedianFilterService} from './services/median-filter.service';

@NgModule({
  declarations: [
    AppComponent,
    FormToValuesPipe
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
  ],
  providers: [CdkColumnDef, DilationFilterService, ErosionFilterService, MedianFilterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
