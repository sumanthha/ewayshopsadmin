import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ApiserviceService } from "../../../../services/apiservice.service";
import { DeleteCategoriesComponent } from "../categories/delete-category/delete-categories.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { NgxUiLoaderService } from "ngx-ui-loader";
import * as S3 from "aws-sdk/clients/s3";
import * as fileSaver from "file-saver";
export interface categoryData {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: number;
    address: string;
    landmark: string;
    email: string;
    imgUrl: string;
    selectedFile: File;
}
let categoryData: categoryData[] = [];
@Component({
    selector: "app-categories",
    templateUrl: "./categories.component.html",
    styleUrls: ["./categories.component.scss"],
    animations: fuseAnimations,
})
export class CategoriesComponent implements OnInit {
    categoryList: any = [];
    displayedColumns: string[] = ["category_Code", "category_Name", "action"];
    @ViewChild("secondDialog", { static: true }) secondDialog: TemplateRef<any>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    Getcategory: any = [];
    categoryTable: MatTableDataSource<any>;
    selectedFile: File;
    imgUrl: string;
    imgType: boolean = true;
    selected_file: string;
    constructor(
        private uiLoader: NgxUiLoaderService,
        private http: HttpClient,
        private dialog: MatDialog,
        private apiService: ApiserviceService,
        private snackBar: MatSnackBar
    ) {}

    deleterCategory(id: any, name: any) {
        let del = id;
        const confirmDialog = this.dialog.open(DeleteCategoriesComponent, {
            data: {
                title: "Confirm Remove Category",
                message: "Are you sure, you want to remove Category: " + name,
            },
        });
        confirmDialog.afterClosed().subscribe((result) => {
            if (result === true) {
                this.apiService.deleteCategory(del).subscribe((response) => {
                    if (response["status"] == "OK") {
                        this.snackBar.open(
                            "Category Deleted successfully",
                            "Close",
                            {
                                duration: 3000,
                            }
                        );
                    } else {
                        this.snackBar.open(response["data"], "Close", {
                            duration: 3000,
                        });
                    }

                    this.ngOnInit();
                });
            }
        });
    }
    ngOnInit(): void {
        this.apiService.listCategory().subscribe((response) => {
            this.Getcategory = [];
            if (response["status"] == "OK") {
                response["data"].forEach((item, index) => {
                    let obj = {
                        sno: index + 1,
                        category_Code: item["category_code"],
                        category_Name: item["category_name"],
                    };
                    this.Getcategory.push(obj);
                });
            }
            this.categoryTable = new MatTableDataSource(this.Getcategory);
            setTimeout(() => (this.categoryTable.paginator = this.paginator));
            setTimeout(() => (this.categoryTable.sort = this.sort));
        });
    }
    searchUser(filterValue: string) {
        this.categoryTable.filter = filterValue.trim().toLowerCase();
        if (this.categoryTable.paginator) {
            this.categoryTable.paginator.firstPage();
        }
    }
    downloadFile() {
        this.apiService.fileDownload().subscribe((response) => {
            let blob: any = new Blob([response], {
                type: "text/csv;charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "category.csv");
            // window.location.href = response;
        });
    }
    onFileSelect(event) {
        this.selected_file = "";
        this.selectedFile = <File>event.target.files[0];
        this.imgType = true;

        this.apiService
            .category_bulkupload(this.selectedFile)
            .subscribe((response) => {
                this.snackBar.open(response["data"], "Close", {
                    duration: 3000,
                });
                this.ngOnInit();
            });
    }
}
