import {Component, HostListener, Input, OnInit} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SignupComponent} from '../signup/signup.component';
import {User, UserLogin} from '../../interfaces/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSticky: boolean = false;
  @Input()
  buttonLink: string;
  user: User;

  constructor(private modalService: NgbModal, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  get getUserName(): string {
    return this.userService.user !== undefined ? this.userService.user.userName : '';
  }

  openLogin(): void {
    this.modalService.open(LoginComponent);
  }

  openSigin(): void {
    this.modalService.open(SignupComponent);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 130;
  }

}
