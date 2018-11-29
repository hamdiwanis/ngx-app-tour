import { AnimationEvent } from '@angular/animations';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DEFAULT_4_POSITIONS, POSITION_MAP } from '../core/overlay/overlay-position-map';
import { toBoolean } from '../core/util/convert';

@Component({
  selector: 'nz-popover',
  template: '',
  preserveWhitespaces: false,
})

export class NzPopoverComponent {
  _hasBackdrop = false;
  _prefix = 'ant-popover-placement';
  _positions: ConnectionPositionPair[] = [...DEFAULT_4_POSITIONS];
  _classMap = {};
  _placement = 'top';
  _trigger = 'hover';
  overlayOrigin: CdkOverlayOrigin;
  isContentString: boolean;
  isTitleString: boolean;
  visibleSource = new BehaviorSubject<boolean>(false);
  visible$: Observable<boolean> = this.visibleSource.asObservable();
  @ContentChild('nzTemplate') _content: string | TemplateRef<void>;
  @ViewChild('overlay') overlay: CdkConnectedOverlay;
  @Output() readonly nzVisibleChange: EventEmitter<boolean> = new EventEmitter();

  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [key: string]: string } = {};
  @Input() nzMouseEnterDelay = 0.15; // Unit: second
  @Input() nzMouseLeaveDelay = 0.1; // Unit: second
  @Input()
  set nzContent(value: string | TemplateRef<void>) {
    this.isContentString = !(value instanceof TemplateRef);
    this._content = value;
  }

  get nzContent(): string | TemplateRef<void> {
    return this._content;
  }

  @Input()
  set nzVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this.visibleSource.value !== visible) {
      this.visibleSource.next(visible);
      this.nzVisibleChange.emit(visible);
    }
  }

  get nzVisible(): boolean {
    return this.visibleSource.value;
  }

  @Input()
  set nzTrigger(value: string) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }

  get nzTrigger(): string {
    return this._trigger;
  }

  @Input()
  set nzPlacement(value: string) {
    if (value !== this._placement) {
      this._placement = value;
      this._positions.unshift(POSITION_MAP[this.nzPlacement] as ConnectionPositionPair);
    }
  }

  get nzPlacement(): string {
    return this._placement;
  }

  // Manually force updating current overlay's position
  updatePosition(): void {
    if (this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange($event: ConnectedOverlayPositionChange): void {
    for (const key in POSITION_MAP) {
      if (JSON.stringify($event.connectionPair) === JSON.stringify(POSITION_MAP[key])) {
        this.nzPlacement = key;
        break;
      }
    }
    this.setClassMap();
    /** TODO may cause performance problem */
    this.cdr.detectChanges();
  }

  show(): void {
    this.nzVisible = true;
  }

  hide(): void {
    this.nzVisible = false;
  }

  _afterVisibilityAnimation(e: AnimationEvent): void {
    if (e.toState === 'false' && !this.nzVisible) {
      this.nzVisibleChange.emit(false);
    }
    if (e.toState === 'true' && this.nzVisible) {
      this.nzVisibleChange.emit(true);
    }
  }

  setClassMap(): void {
    this._classMap = {
      [this.nzOverlayClassName]: true,
      [`${this._prefix}-${this._placement}`]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.overlayOrigin = origin;
  }

  constructor(public cdr: ChangeDetectorRef) {
  }
}
