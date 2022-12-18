import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


const materialArr: any= [MatToolbarModule,MatIconModule]

@NgModule({
  declarations: [],
  imports: [CommonModule,MatToolbarModule,MatIconModule ],
})
export class MaterialModule {}
