import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import fs = require("file-system");
import platformModule = require("platform");

import {
    FlexboxLayout,
    FlexDirection,
    FlexWrap,
    JustifyContent,
    AlignItems,
    AlignContent,
    AlignSelf
} from "ui/layouts/flexbox-layout";

declare var java: any;

@Component({
    selector: 'modal-content',
    templateUrl: "dialogs/file_picker/file_picker.html",
    styleUrls: [ "dialogs/file_picker/file_picker.css"]
})
export class FilePicker {

    public listOfFilesAndFolders: fsData[] = [];
    public currentDirectory: string = '/sdcard';
    public startPath:string;
    //extenstions priority is more than ignoreExtensions
    //list of extensions we want to show

    public extensions:[string];

    //list of extensions we want to ignore
    public ignoreExtensions:[string]

    constructor(private params: ModalDialogParams) {
         this.startPath = params.context.startPath;
         this.extensions = params.context.extensions.map((value)=> value.toUpperCase());
         this.ignoreExtensions = params.context.ignoreExtensions.map((value)=> value.toUpperCase());
    }

    private onItemTap(args) {
        let item = this.listOfFilesAndFolders[args.index];
        if(item.isBackButton)
            return this.back();
        let path = item.path;

        if (!item.isFile) {
            this.refreshList(path);
        }

        else
            this.params.closeCallback(item.path);


    }

    public ngOnInit() {
        this.refreshList(this.startPath);
    }

    private back() {

        let file = new java.io.File(this.currentDirectory);

        if (file.getParent() != null) {
            let parent = file.getParent();
            this.refreshList(parent);
        }

    }

    private refreshList(path: string) {
        this.currentDirectory = path;
        console.log(this.currentDirectory);
        this.listOfFilesAndFolders = [];
        //two lists for files and folders to show folders first then files
        let listOfFiles: fsData[] = [];
        let listOfFolders: fsData[] = [];
        let filesAndFolders = fs.Folder.fromPath(path);

        filesAndFolders.eachEntity((entity) => {
            let file = new java.io.File(entity.path);
            if (!file.canRead() || file.isHidden())
                return true;

            
            let ent;

            if(file.isFile()){
                let ext = entity.path.split('.').slice(-1)[0];
                //If extensions property used
                if(this.extensions.length > 0)
                {
                    //if not ext exist in extensions
                    if(this.extensions.indexOf(ext.toUpperCase()) < 0)
                        return true;
                }

                //If ignoreExtensions property used

                else if(this.ignoreExtensions.length > 0)
                {
                    if(this.ignoreExtensions.indexOf(ext.toUpperCase()) >= 0)
                    {
                        return true;
                    }
                }

                ent = new fsData();
                ent.isFile = true;
                listOfFiles.push(ent);
            }
            else{
                ent = new fsData();
                ent.isFile = false;
                listOfFolders.push(ent);
            }

            ent.name = entity.name;
            ent.path = entity.path;
            ent.isBackButton = false;



            return true;
        });

        let backButton = new fsData();
        backButton.name="..";
        backButton.isFile=false;
        backButton.path=null;
        backButton.isBackButton = true;

        this.listOfFilesAndFolders = listOfFolders.concat(listOfFiles);
        this.listOfFilesAndFolders.unshift(backButton);
    }

}

class fsData {
    public name: string;
    public isFile: boolean;
    public path: string;
    public isBackButton:boolean = false;

}