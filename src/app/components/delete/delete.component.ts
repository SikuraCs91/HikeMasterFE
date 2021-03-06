import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TourList} from '../../interfaces/tour-list';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input()
  tourList: TourList;

  // @Output()
  // action: EventEmitter<void>;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  onModalClose(): void {
    // this.action.emit();
    this.activeModal.close();
  }

}
