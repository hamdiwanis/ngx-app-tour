import {
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  OnInit, Renderer2,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import withinviewport from 'withinviewport';


import { first } from 'rxjs/operators';
import { TourBackdropService } from '../services/tour-backdrop.service';
import { IStepOption } from '../models/step-option.interface';
import { TourStepComponent } from '../components/tour-step/tour-step.component';
import { TourService, TourState } from '../services/tour.service';

@Directive({
  selector: '[tourAnchor]'
})
export class TourAnchorDirective implements OnInit, OnDestroy {
  @Input() public tourAnchor: string;
  public tourStep: TourStepComponent;
  public menuCloseSubscription: Subscription;

  @HostBinding('class.touranchor--is-active') public isActive: boolean;

  constructor(
    public elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private tourService: TourService,
    private tourBackdrop: TourBackdropService
  ) {}

  public ngOnInit(): void {
    const factory: ComponentFactory<TourStepComponent> = this.resolver.resolveComponentFactory(TourStepComponent);
    const tourComponent = this.viewContainer.createComponent(factory);
    this.tourStep = tourComponent.instance;
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), tourComponent.location.nativeElement);
    this.tourStep.setOverlayOrigin(this);

    this.tourService.register(this.tourAnchor, this);
  }

  public ngOnDestroy(): void {
    this.tourService.unregister(this.tourAnchor);
  }

  public showTourStep(step: IStepOption): void {
    this.isActive = true;
    this.tourStep.step = step;
    this.tourStep.nzPlacement = step.placement;
    this.tourStep.stepTemplate = step.stepTemplate;

    if (!step.preventScrolling) {
      if (!withinviewport(this.elementRef.nativeElement, {sides: 'bottom'})) {
        (<HTMLElement>this.elementRef.nativeElement).scrollIntoView(false);
      } else if (
        !withinviewport(this.elementRef.nativeElement, {sides: 'left top right'})
      ) {
        (<HTMLElement>this.elementRef.nativeElement).scrollIntoView(true);
      }
    }

    this.tourStep.show();

    if (!step.disableBackdrop) {
      this.tourBackdrop.show(this.elementRef, step.backdropRadius, step.backdropColor);
    } else {
      this.tourBackdrop.close();
    }

    step.prevBtnTitle = step.prevBtnTitle || 'Prev';
    step.nextBtnTitle = step.nextBtnTitle || 'Next';
    step.endBtnTitle = step.endBtnTitle || 'End';

    if (this.menuCloseSubscription) {
      this.menuCloseSubscription.unsubscribe();
    }
    this.menuCloseSubscription = this.tourStep.closed$
      .pipe(first())
      .subscribe(() => {
        if (this.tourService.getStatus() !== TourState.OFF) {
          this.tourService.end();
          this.tourBackdrop.close();
        }
      });
  }

  public hideTourStep(): void {
    this.isActive = false;
    if (this.menuCloseSubscription) {
      this.menuCloseSubscription.unsubscribe();
    }
    this.tourStep.hide();
    if (this.tourService.getStatus() === TourState.OFF) {
      this.tourBackdrop.close();
    }
  }
}
