import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CamdoComponent } from './camdo/Camdo.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [CamdoComponent, CamdoComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'camdo',
        component: CamdoComponent,
      },
  ]),  
  ]
})
export class CamdoModule { }
