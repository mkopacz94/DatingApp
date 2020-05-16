import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  show(title: string, message: string): Promise<boolean> {
    const modalReference = this.modalService.open(ModalComponent, { centered: true });
    modalReference.componentInstance.title = title;
    modalReference.componentInstance.message = message;
    return modalReference.result;
  }
}
