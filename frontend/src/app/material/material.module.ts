import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';


const modules: any= [MatToolbarModule,MatIconModule,MatListModule]

@NgModule({
  declarations: [],
  imports: [CommonModule,...modules],
})
export class MaterialModule {}
