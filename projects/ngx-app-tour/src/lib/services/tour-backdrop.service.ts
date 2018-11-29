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
      position: 'fixed',
      'box-shadow': `0 0 0 9999px ${shadowColor}`,
      'z-index': '100',
      'border-radius': radius ? radius : '100%',
      transition: 'transform 0.1s ease-in-out'
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
      const scaleX = boundingRect.width / this.currentBoundingRect.width;
      const scaleY = boundingRect.height / this.currentBoundingRect.height;

      const translateX = boundingRect.x - this.currentBoundingRect.x;
      const translateY = boundingRect.y - this.currentBoundingRect.y;

      styles = {
        ...styles,
        transform: `scale(${scaleX}, ${scaleY}) translate(${translateX}px, ${translateY}px)`
      };
    }

    this.currentBoundingRect = boundingRect;

    requestAnimationFrame(() => {
      for (const name of Object.keys(styles)) {
        this.renderer.setStyle(this.backdropElement, name, styles[name]);
      }
    });

    setTimeout(() => {
      styles = {
        width: this.currentBoundingRect.width + 'px',
        height: this.currentBoundingRect.height + 'px',
        top: this.currentBoundingRect.top + 'px',
        left: this.currentBoundingRect.left + 'px',
        transition: 'none',
        transform: 'none'
      };

      requestAnimationFrame(() => {
        for (const name of Object.keys(styles)) {
          this.renderer.setStyle(this.backdropElement, name, styles[name]);
        }
      });
    }, popUpFadeTime);
  }
}
