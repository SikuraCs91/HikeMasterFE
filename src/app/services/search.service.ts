import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SearchResponse} from "../interfaces/search-response";
import {SearchRequest} from "../interfaces/search-request";
import {Tour} from "../interfaces/tour";

// @ts-ignore
// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  /*getTours(): Observable<Tour[]> {
    return this.http.get<SearchResponse>(
      environment.apiEndpoint + 'tours',
      {withCredentials: true}
    )
      .pipe(map(tResp => tResp.tours));
  }*/

  searchTours(params: SearchRequest): Observable<Tour[]> {
    return this.http.post<SearchResponse>(
      environment.apiEndpoint + 'hike_route',
      params,
      {withCredentials: true}
    )
      .pipe(map(tResp => tResp.tours));
  }

}