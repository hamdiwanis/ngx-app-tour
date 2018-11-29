import { ChangeDetectorRef, Component, EventEmitter, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStepOption } from '../../models/step-option.interface';
import { fadeAnimation } from '../../ng-zorro/core/animation/fade-animations';
import { NzPopoverComponent } from '../../ng-zorro/popover';
import { TourService, TourState } from '../../services/tour.service';


@Component({
  selector: 'ngx-tour-step',
  templateUrl: './tour-step.component.html',
  styleUrls: ['./tour-step.component.css'],
  animations: [fadeAnimation]
})
export class TourStepComponent extends NzPopoverComponent implements OnDestroy {
  stepTemplate;
  _hasBackdrop = true;
  step: IStepOption = {};
  closed$: EventEmitter<boolean> = new EventEmitter();
  closeSubscription: Subscription;

  constructor(public tourService: TourService, public cdr: ChangeDetectorRef) {
    super(cdr);

    this.closeSubscription = this.nzVisibleChange.subscribe(isVisible => {
      if (!isVisible) {
        this.closed$.emit();
      }
    });
  }

  ngOnDestroy() {
    this.closeSubscription.unsubscribe();
  }


  /**
   * Configures hot keys for controlling the tour with the keyboard
   */
  @HostListener('window:keydown.Escape')
  public onEscapeKey(): void {
    if (
      this.tourService.getStatus() === TourState.ON
    ) {
      this.tourService.end();
    }
  }

  @HostListener('window:keydown.ArrowRight')
  public onArrowRightKey(): void {
    if (
      this.tourService.getStatus() === TourState.ON &&
      this.tourService.hasNext(this.tourService.currentStep)
    ) {
      this.tourService.next();
    }
  }

  @HostListener('window:keydown.ArrowLeft')
  public onArrowLeftKey(): void {
    if (
      this.tourService.getStatus() === TourState.ON &&
      this.tourService.hasPrev(this.tourService.currentStep)
    ) {
      this.tourService.prev();
    }
  }
}
