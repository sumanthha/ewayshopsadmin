import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { ApiserviceService } from "../../../../services/apiservice.service";
import { DeleteSubCategoriesComponent } from "../sub-categories/delete-subcategory/delete-subcategories.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as fileSaver from "file-saver";
export interface subcategoryData {
    id: number;
    subcatname: string;
    pacatname: string;
}
let categoryData: subcategoryData[] = [];
@Component({
    selector: "app-sub-categories",
    templateUrl: "./sub-categories.component.html",
    styleUrls: ["./sub-categories.component.scss"],
    animations: fuseAnimations,
})
export class SubCategoriesComponent implements OnInit {
    id: any;
    categoryList: any = [];
    selectedFile: File;
    imgType: boolean = true;
    displayedColumns: string[] = [
        "category_Code",
        "category_Name",
        "category",
        "action",
    ];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    subcategoryTable: MatTableDataSource<any>;
    Getcategory: any;
    //delete template select
    @ViewChild("deleteSubCate", { static: true })
    deleteSubCate: TemplateRef<any>;
    selected_file: string;

    constructor(
        private dialog: MatDialog,
        private apiService: ApiserviceService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        //call api and store response to this array
        this.apiService.listSubcategory().subscribe((response) => {
            this.Getcategory = [];
            if (response["status"] == "OK") {
                response["data"].forEach((item, index) => {
                    let obj = {
                        sno: index + 1,
                        category: item["parent"]["category_name"],
                        category_Code: item["category_code"],
                        category_Name: item["category_name"],
                    };
                    this.Getcategory.push(obj);
                });
            }
            categoryData = this.Getcategory;
            this.subcategoryTable = new MatTableDataSource(this.Getcategory);
            setTimeout(
                () => (this.subcategoryTable.paginator = this.paginator)
            );
            setTimeout(() => (this.subcategoryTable.sort = this.sort));
        });
    }

    searchUser(filterValue: string) {
        this.subcategoryTable.filter = filterValue.trim().toLowerCase();
        if (this.subcategoryTable.paginator) {
            this.subcategoryTable.paginator.firstPage();
        }
    }
    // deleterSubcategory(id: any) {
    //   this.dialog.open(this.deleteSubCate);
    //   this.id = id;
    // }
    deleterSubcategory(id: any, name: any) {
        let del = id;
        const confirmDialog = this.dialog.open(DeleteSubCategoriesComponent, {
            data: {
                title: "Confirm Remove SubCategory",
                message:
                    "Are you sure, you want to remove SubCategory: " + name,
            },
        });
        confirmDialog.afterClosed().subscribe((result) => {
            if (result === true) {
                this.apiService.deleteSubcategory(del).subscribe((response) => {
                    if (response["status"] == "OK") {
                        this.snackBar.open(
                            "Sub Category Deleted Successfully",
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
    confirmdeleteCategory() {
        alert("sub cate deleted" + this.id);
    }
    downloadFile() {
        this.apiService.sub_fileDownload().subscribe((response) => {
            let blob: any = new Blob([response], {
                type: "text/csv;charset=utf-8",
            });
            const url = window.URL.createObjectURL(blob);
            fileSaver.saveAs(blob, "Sub_Category.csv");
            // window.location.href = response;
        });
    }
    onFileSelect(event) {
        this.selected_file = "";
        this.selectedFile = <File>event.target.files[0];
        this.imgType = true;
        const formData = new FormData();
        formData.append("csv", this.selectedFile);
        this.apiService
            .subCategory_bulkupload(formData)
            .subscribe((response) => {
                this.snackBar.open(response["data"], "Close", {
                    duration: 3000,
                });
                this.ngOnInit();
            });
    }
}
