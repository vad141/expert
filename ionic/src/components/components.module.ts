import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ControlMessagesCmp, DynamicFormQuestionComponent, DynamicFormComponent }  from './components.export';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFormQuestionComponent, DynamicFormComponent,
    ControlMessagesCmp
  ],
  exports: [
    DynamicFormQuestionComponent, DynamicFormComponent,
    ControlMessagesCmp
  ],
   schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ComponentsModule {}
