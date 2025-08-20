import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iemployee } from '../../../shared/iemployee';
import { Ivendor } from '../../../shared/ivendor';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SeafarersService {
  constructor(private httpClient: HttpClient) {}

  getAllSeafarers(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/MarineServices/GetAllSeafarers`,
      {
        params: {
          Direction: 'ltr',
          InCT: '',
        },
      }
    );
  }
  fillEmployee() {
    return this.httpClient.get<Iemployee[]>(
      `${environment.baseUrl}/api/POS/FillEmployee`,
      {
        params: { Id: 0, text: '', Direction: 'ltr', InCT: '' },
      }
    );
  }

  fillVendor() {
    return this.httpClient.get<Ivendor[]>(
      `${environment.baseUrl}/api/LegalAffairs/FillVendor`,
      {
        params: { Id: 0, text: '', Direction: 'ltr', InCT: '' },
      }
    );
  }

  saveSeafarer(payload: any) {
    return this.httpClient.post(
      `${environment.baseUrl}/api/MarineServices/SaveSeafarer`,
      payload,
      {
        params: { InCT: '' },
      }
    );
  }

  activateAndInActivateSeafarer(
    Id: number,
    status: number,
    empId: number
  ): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/MarineServices/ActivateAndInActivateSeafarer?Id=${Id}&InCT=&Status=${status}&EmpId=${empId}`,
      {}
    );
  }
}
