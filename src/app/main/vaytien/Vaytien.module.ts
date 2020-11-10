import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VaytienComponent } from './vaytien/Vaytien.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [VaytienComponent, VaytienComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'vaytien',
        component: VaytienComponent,
      },
  ]),  
  ]
})
export class VaytienModule { }
