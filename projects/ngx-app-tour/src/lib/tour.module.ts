import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TourStepComponent } from './components/tour-step/tour-step.component';
import { TourAnchorDirective } from './directive/tour-anchor.directive';
import { NzPopoverModule } from './ng-zorro/popover';
import { TourBackdropService } from './services/tour-backdrop.service';
import { TourService } from './services/tour.service';

export { TourAnchorDirective, TourService };

@NgModule({
  declarations: [TourAnchorDirective, TourStepComponent],
  entryComponents: [TourStepComponent],
  exports: [TourAnchorDirective],
  imports: [CommonModule, OverlayModule, NzPopoverModule],
})
export class NgxAppTour {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxAppTour,
      providers: [
        TourBackdropService,
        TourService
      ],
    };
  }
}