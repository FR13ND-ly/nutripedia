import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'community/';

  sendFriendRequest(data: any) {
    return this.http.post(`${this.apiUrl}friend-request/send/`, data);
  }

  resolveFriendRequest(data: any) {
    return this.http.put(`${this.apiUrl}friend-request/resolve/`, data);
  }

  getFriendRequests(userId: any) {
    return this.http.get(`${this.apiUrl}friend-request/get/${userId}/`);
  }

  getFriendsByUser(userId: any) {
    return this.http.get(`${this.apiUrl}friends/get/${userId}/`);
  }

  createGroup(data: any) {
    return this.http.post(`${this.apiUrl}group/create/`, data);
  }

  getGroup(groupId: any) {
    return this.http.get(`${this.apiUrl}group/get/${groupId}/`);
  }

  getGroupsByUser(userId: any) {
    return this.http.get(`${this.apiUrl}group/get-by-user/${userId}/`);
  }

  updateGroup(data: any) {
    return this.http.put(`${this.apiUrl}group/update/`, data);
  }

  createMembership(data: any) {
    return this.http.post(`${this.apiUrl}group/membership/create/`, data);
  }

  cancelMembership(data: any) {
    return this.http.post(`${this.apiUrl}group/membership/cancel/`, data);
  }

  createArticle(data: any) {
    return this.http.post(`${this.apiUrl}group/article/create/`, data);
  }

  updateArticle(data: any) {
    return this.http.put(`${this.apiUrl}group/article/update/`, data);
  }

  deleteArticle(id: any) {
    return this.http.get(`${this.apiUrl}group/article/delete/${id}/`);
  }

  like(data: any) {
    return this.http.put(`${this.apiUrl}group/article/like/`, data);
  }

  getProfile(userId: any) {
    return this.http.get(`${this.apiUrl}profile/get/${userId}/`);
  }
}
