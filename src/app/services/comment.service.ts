import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

const COMMENT_KEY = 'comment';
import {Comment} from '../interfaces/comment';

@Injectable({
  providedIn: 'root'

})

export class CommentService {
  comment: Comment;
  commentChange: BehaviorSubject<Comment> = new BehaviorSubject<Comment>({subject: '', text: '', date: null});

  constructor(private http: HttpClient) {
    this.commentChange.subscribe((comment) => {
      this.comment = comment;
      if (comment.date && comment.text && comment.subject.length > 0) {
        localStorage.setItem(COMMENT_KEY, JSON.stringify({
          subject: comment.subject,
          text: comment.text,
          date: comment.date
        }));
      }
    });
  }

  sendComment(comment: Comment): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/comment', {
      subject: comment.subject,
      text: comment.text,
      date: comment.date
    });
  }
}