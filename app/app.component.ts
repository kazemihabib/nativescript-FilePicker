import { Component } from "@angular/core";



/*Add below lines*/
import { FilePicker } from "./dialogs/file_picker/file_picker_dialog";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import {ViewContainerRef} from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    constructor(private modalService: ModalDialogService,private viewContainerRef: ViewContainerRef){ }

/*Add below lines*/
    openFilePicker(){

        let options: ModalDialogOptions = {
            context: { startPath: "/" , extensions:['mp4'],ignoreExtensions:[]},
            viewContainerRef: this.viewContainerRef
        };


        this.modalService.showModal(FilePicker, options).then((res: string) => {
            console.log(res);
        });
    }
 }
