import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';


const modules: any= [MatToolbarModule,MatIconModule,MatListModule,MatDialogModule,MatInputModule,ScrollingModule,MatButtonModule]

@NgModule({
  declarations: [],
  imports: [CommonModule,...modules],
})
export class MaterialModule {}
