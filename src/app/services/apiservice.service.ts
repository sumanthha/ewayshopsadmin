import { Injectable } from "@angular/core";
import { AppSettings } from "../app.constant";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ApiserviceService {
    private subject = new Subject<string>();

    ChangeLang(message: string) {
        this.subject.next(message);
    }
    private headers = new HttpHeaders({ "Content-Type": "application/json" });
    constructor(private app: AppSettings, private http: HttpClient) {}

    GetLang(): Observable<any> {
        return this.subject.asObservable();
    }
    loginAccount(formdata: any) {
        let url = AppSettings.API_ENDPOINT + "login/";
        let tokenHeader = new HttpHeaders();
        tokenHeader.append("Content-Type", "application/json");
        return this.http.post<Response[]>(`${url}`, formdata);
    }

    /* BRANCH MANAGER FUNCTIONS  START */
    createBranchManager(manager: any) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/create_branch_manager/";
        return this.http.post<Response[]>(`${url}`, manager);
    }
    listBranchManager() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/branch_manager/";
        return this.http.get<Response[]>(`${url}`);
    }
    viewBranchManager(id: number) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/branch_manager/" + id;
        return this.http.get<Response[]>(`${url}`);
    }
    editBranchManager(id: any, data: any) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/branch_manager/" + id;
        return this.http.put<Response[]>(`${url}`, data);
    }
    deleteBranchManager(id: number) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/branch_manager/" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    /* BRANCH MANAGER FUNCTIONS  END  */

    /* BRANCH FUNCTIONS  START */
    createBranch(branch: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/create_branch/";
        return this.http.post<Response[]>(`${url}`, branch);
    }
    listBranch() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/branch/";
        return this.http.get<Response[]>(`${url}`);
    }
    viewBranch(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/branch/" + id;
        return this.http.get<Response[]>(`${url}`);
    }
    editBranch(id: any, data: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/branch/" + id;
        return this.http.put<Response[]>(`${url}`, data);
    }
    deleteBranch(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/branch/" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    /* BRANCH FUNCTIONS  END  */

    /* CATEGORY FUNCTIONS  START */
    createCategory(category: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/category/";
        return this.http.post<Response[]>(`${url}`, category);
    }
    listCategory() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/category/";
        return this.http.get<Response[]>(`${url}`);
    }
    viewCategory(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/category/" + id;
        return this.http.get<Response[]>(`${url}`);
    }
    editCategory(id: any, data: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/category/" + id;
        return this.http.put<Response[]>(`${url}`, data);
    }
    deleteCategory(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/category/" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    fileDownload(): Observable<any> {
        return this.http.get(
            AppSettings.API_ENDPOINT + "media/sample/CategorySample.csv",
            { responseType: "blob" }
        );
    }
    category_bulkupload(file) {
        let httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Disposition': 'form-data; name="csv"; filename="category.csv"',
                // 'Content-Type': 'application/vnd.ms-excel',
                // 'Content-Disposition': 'attachment;filename=myfilename.csv'
            }),
        };
        const formData = new FormData();
        formData.append("csv", file);
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/category/bulk-upload";
        return this.http.post<Response[]>(`${url}`, formData, httpOptions);
    }
    sub_fileDownload(): Observable<any> {
        return this.http.get(
            AppSettings.API_ENDPOINT + "media/sample/SubcategorySample.csv",
            { responseType: "blob" }
        );
    }
    subCategory_bulkupload(formData) {
        let httpOptions = {
            headers: new HttpHeaders({
                // 'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA',
                // 'Content-Type': 'application/json'
            }),
        };
        let url =
            AppSettings.API_ENDPOINT +
            "bussiness_admin/subcategory/bulk-upload";
        return this.http.post(url, formData, httpOptions);
    }
    /* CATEGORY FUNCTIONS  END  */

    /* CATEGORY FUNCTIONS  START */
    createSubcategory(category: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/subcategory/";
        return this.http.post<Response[]>(`${url}`, category);
    }
    listSubcategory() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/subcategory/";
        return this.http.get<Response[]>(`${url}`);
    }
    viewSubcategory(id: number) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/subcategory/" + id;
        return this.http.get<Response[]>(`${url}`);
    }
    editSubcategory(id: any, data: any) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/subcategory/" + id;
        return this.http.put<Response[]>(`${url}`, data);
    }
    deleteSubcategory(id: number) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/subcategory/" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    /* CATEGORY FUNCTIONS  END  */

    /* CUSTOMERS MANAGE FUNCTIONS  START */
    listCustomers() {
        let url = AppSettings.API_ENDPOINT + "buyer/";
        return this.http.get<Response[]>(`${url}`);
    }
    viewCustomer(id: number) {
        let url = AppSettings.API_ENDPOINT + "buyer/" + id;
        return this.http.get<Response[]>(`${url}`);
    }
    deleteCustomer(id: number) {
        let url = AppSettings.API_ENDPOINT + "buyer/" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    editCustomer(id: any, data: any) {
        let url = AppSettings.API_ENDPOINT + "buyer-update/" + id;
        return this.http.put<Response[]>(`${url}`, data);
    }
    /* CUSTOMERS MANAGE FUNCTIONS  END  */

    /* VENDTORS MANAGE FUNCTIONS START */
    createCommission(users: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/commission/";
        return this.http.post<Response[]>(`${url}`, users);
    }
    listCommission() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/commission/";
        return this.http.get<Response[]>(`${url}`);
    }
    viewCommission(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/commission/" + id;
        return this.http.get<Response[]>(`${url}`);
    }
    deleteCommission(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/commission/" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    editCommission(id: any, data: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/commission/" + id;
        return this.http.put<Response[]>(`${url}`, data);
    }
    commissionMapping(id: any, data: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/commission/" + id;
        return this.http.post<Response[]>(`${url}`, data);
    }
    commissionUnmapped(id: any) {
        let url =
            AppSettings.API_ENDPOINT +
            "bussiness_admin/commission/unmapped/" +
            id;
        return this.http.get<Response[]>(`${url}`);
    }
    /* VENDTORS MANAGE FUNCTIONS END */

    createPayment(users: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/payment/";
        return this.http.post<Response[]>(`${url}`, users);
    }
    listPayment() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/payment/";
        return this.http.get<Response[]>(`${url}`);
    }
    viewPayment(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/payment/" + id;
        return this.http.get<Response[]>(`${url}`);
    }
    deletePayment(id: number) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/payment/" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    editPayment(id: any, data: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/payment/" + id;
        return this.http.put<Response[]>(`${url}`, data);
    }

    getAuthenticatedUser() {
        return localStorage.getItem("accessToken");
    }
    getAuthenticatedToken() {
        if (this.getAuthenticatedUser())
            return localStorage.getItem("accessToken");
    }

    /* GET ADMIN PROFILE INFO */
    adminProfile() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/";
        return this.http.get<Response[]>(`${url}`);
    }
    /* ADD VENDOR AND CUSTOMER  */
    createUsers(users: any) {
        let url = AppSettings.API_ENDPOINT + "/bussiness_admin/create_branch/";
        return this.http.post<Response[]>(`${url}`, users);
    }

    //COLORS API'S
    viewColor(id?: any) {
        let url = AppSettings.API_ENDPOINT + "color";
        let urlId = AppSettings.API_ENDPOINT + "color?pid=" + id;
        if (id) {
            return this.http.get<Response[]>(`${urlId}`);
        } else {
            return this.http.get<Response[]>(`${url}`);
        }
    }
    addColor(colorValue: any) {
        let url = AppSettings.API_ENDPOINT + "color";
        return this.http.post<Response[]>(`${url}`, colorValue);
    }
    deleteColor(id: any) {
        let url = AppSettings.API_ENDPOINT + "color?id=" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    editColor(id: any) {
        let url = AppSettings.API_ENDPOINT + "color";
        return this.http.put<Response[]>(`${url}`, id);
    }

    //SIZE API's

    viewSize(id?: any) {
        let url = AppSettings.API_ENDPOINT + "size";
        let urlId = AppSettings.API_ENDPOINT + "size?pid=" + id;
        if (id) {
            return this.http.get<Response[]>(`${urlId}`);
        } else {
            return this.http.get<Response[]>(`${url}`);
        }
    }
    addSize(playload) {
        let url = AppSettings.API_ENDPOINT + "size";
        return this.http.post<Response[]>(`${url}`, playload);
    }
    deleteSize(id: any) {
        let url = AppSettings.API_ENDPOINT + "size?id=" + id;
        return this.http.delete<Response[]>(`${url}`);
    }
    updateSize(playload) {
        let url = AppSettings.API_ENDPOINT + "size";
        return this.http.put<Response[]>(`${url}`, playload);
    }

    //MARK API's

    viewMark(id?: any) {
        let url = AppSettings.API_ENDPOINT + "mark";
        let urlId = AppSettings.API_ENDPOINT + "mark?pid=" + id;
        if (id) {
            return this.http.get<Response[]>(`${urlId}`);
        } else {
            return this.http.get<Response[]>(`${url}`);
        }
    }
    addMark(playload) {
        let url = AppSettings.API_ENDPOINT + "mark";
        return this.http.post<Response[]>(`${url}`, playload);
    }
    updateMark(playload) {
        let url = AppSettings.API_ENDPOINT + "mark";
        return this.http.put<Response[]>(`${url}`, playload);
    }

    // OLD API'S

    /* ORDER DETAISL */
    orderList() {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/order";
        return this.http.get<Response[]>(`${url}`);
    }
    orderDetails(id: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/order/";
        return this.http.post<Response[]>(`${url}`, id);
    }
    Update_OrderStatus(formdata: any) {
        let url =
            AppSettings.API_ENDPOINT + "bussiness_admin/order_status_update/";
        return this.http.put<Response[]>(`${url}`, formdata);
    }
    Update_seller_Paymentstatus(formdata: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/seller-status";
        return this.http.put<Response[]>(`${url}`, formdata);
    }
    /* ADMIN PROFILE UPDATE */
    adminProfileUpdate(id: any, formdata: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/update/";
        return this.http.put<Response[]>(`${url}`, formdata);
    }

    /* RESET PASSWORD LINK  */
    Reset_link(email: any) {
        let url = AppSettings.API_ENDPOINT + "store/forget_password/";
        return this.http.post<Response[]>(`${url}`, email);
    }
    resetPassword(data: any) {
        let url = AppSettings.API_ENDPOINT + "reset_password/";
        return this.http.post<Response[]>(`${url}`, data);
    }
    /* REPORTS API */
    reportData(data: any) {
        let url = AppSettings.API_ENDPOINT + "bussiness_admin/report";
        return this.http.post<Response[]>(`${url}`, data);
    }
    // END OLD API'S

    refreshToken() {
        var payload = {
            refresh: localStorage.getItem("refreshToken"),
        };

        let url = AppSettings.API_ENDPOINT + "login/refresh/";
        let tokenHeader = new HttpHeaders({
            "Content-Type": "application/json",
            // 'x-auth-token': localStorage.getItem("xAuthToken")
        });
        return this.http.post<Response[]>(`${url}`, payload);
    }
}
