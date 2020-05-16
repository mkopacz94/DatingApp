import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ModalService } from '../_services/modal.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {

    private discardSubject : Subject<boolean> = new Subject<boolean>();

  discard(): void {
    this.discardSubject.next(true);
  }

  keep(): void {
    this.discardSubject.next(false);
  }

    constructor(private modalService: ModalService) {}

    canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
        if (component.editForm.dirty) {
            this.modalService.show('Possible loss of data',
                 'Are you sure you want to continue? Any unsaved changes will be lost?').then(
                     () =>
                     {
                         console.log('discard');
                         this.discard();
                     },
                     () =>
                     {
                         console.log('keep');
                         this.keep();
                     }
                 );

            return this.discardSubject.asObservable();
        }

        return true;
    }

}
