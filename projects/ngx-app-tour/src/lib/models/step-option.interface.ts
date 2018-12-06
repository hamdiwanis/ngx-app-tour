import { UrlSegment } from '@angular/router';

export interface IStepOption {
  stepId?: string;
  anchorId?: string;
  title?: string;
  content?: string;
  route?: string | string[] | UrlSegment[];
  nextStep?: number | string;
  prevStep?: number | string;
  preventScrolling?: boolean;
  prevBtnTitle?: string;
  nextBtnTitle?: string;
  endBtnTitle?: string;
  disableBackdrop?: boolean;
  backdropColor?: string;
  backdropRadius?: string;
  enableRippleEffect?: boolean;
  rippleColor?: string;
  stepTemplate?;
  allowInteractions?: boolean;
  nextOn?: string;
  placement?: 'topLeft' | 'top' | 'topRight' | 'leftTop' | 'left' | 'leftBottom'
    | 'rightTop' | 'right'| 'rightBottom'| 'bottomLeft' | 'bottom'| 'bottomRight';
}
