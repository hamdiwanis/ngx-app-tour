import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TourService } from 'ngx-app-tour';

@Component({
  selector: 'app-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements AfterViewInit{
  @ViewChild('stepTemplate') stepTemplate;

  constructor(public tourService: TourService) {}

  ngAfterViewInit(){
    this.tourService.initialize([
      {
        anchorId: '1',
        content: 'this is a tour step',
        placement: 'bottom',
        backdropRadius: '0'
      }, {
        anchorId: '2',
        content: 'also a tour step',
        placement: 'right',
        backdropRadius: '100%'
      }, {
        anchorId: '3',
        content: 'the last tour step',
        placement: 'left',
        backdropRadius: '50% 0',
        backdropColor: '#673ab7a6'
      },
      {
        anchorId: '4',
        content: 'opps i lied',
        placement: 'left',
        backdropRadius: '20% 20%',
        backdropColor: '#e91e6385',
        stepTemplate: this.stepTemplate
      },
      {
        anchorId: '5',
        content: 'this time its the last one i promise',
        placement: 'left',
        backdropRadius: '0 0 50%',
        backdropColor: '#00968875'
      }
    ]);
  }
}
