import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

/* ADD below line */
import {FilePicker} from "./dialogs/file_picker/file_picker_dialog";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        /* ADD below line */
        FilePicker
    ],
    providers: [
    ],
    /* ADD below line */
    entryComponents: [FilePicker],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
