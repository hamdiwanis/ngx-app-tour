import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { popUpFadeTime } from '../conig';

@Injectable()
export class TourBackdropService {
  // todo: use cdk instead
  // todo: make backdrop move with element
  private renderer: Renderer2;
  private backdropElement: HTMLElement;
  private currentBoundingRect;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public show(targetElement: ElementRef, radius, color) {
    const boundingRect = targetElement.nativeElement.getBoundingClientRect();

    if (!this.backdropElement) {
      this.backdropElement = this.renderer.createElement('div');
      this.renderer.addClass(this.backdropElement, 'ngx-tour_backdrop');
      this.renderer.appendChild(document.body, this.backdropElement);

      const styles = {
        position: 'fixed',
        'z-index': '100',
      };

      for (const name of Object.keys(styles)) {
        this.renderer.setStyle(this.backdropElement, name, styles[name]);
      }
    }

    this.setStyles(boundingRect, radius, color);
  }

  public close() {
    if (this.backdropElement) {
      this.renderer.removeChild(document.body, this.backdropElement);
      this.backdropElement = null;
    }
  }

  private setStyles(boundingRect: DOMRect, radius, color) {
    const shadowColor = color ? color : 'rgba(0, 0, 0, 0.7)';
    let styles: any = {
      'box-shadow': `0 0 0 9999px ${shadowColor}`,
      'border-radius': radius ? radius : '100%',
    };

    if (!this.currentBoundingRect) {
      styles = {
        ...styles,
        width: boundingRect.width + 'px',
        height: boundingRect.height + 'px',
        top: boundingRect.top + 'px',
        left: boundingRect.left + 'px'
      };
    } else {

      const fromHeight = this.currentBoundingRect.height + 'px';
      const fromWidth = this.currentBoundingRect.width + 'px';
      const fromTop = this.currentBoundingRect.top + 'px';
      const fromLeft = this.currentBoundingRect.left + 'px';

      const toHeight = boundingRect.height + 'px';
      const toWidth = boundingRect.width + 'px';
      const toTop = boundingRect.top + 'px';
      const toLeft = boundingRect.left + 'px';


      this.backdropElement.animate(
        [
          <any>{height: fromHeight, width: fromWidth, top: fromTop, left: fromLeft},
          <any>{height: toHeight, width: toWidth, top: toTop, left: toLeft}
        ], {
          duration: popUpFadeTime,
          easing: 'ease-in-out',
          fill: 'forwards'
        }
      );
    }

    this.currentBoundingRect = boundingRect;

    for (const name of Object.keys(styles)) {
      this.renderer.setStyle(this.backdropElement, name, styles[name]);
    }
  }
}
