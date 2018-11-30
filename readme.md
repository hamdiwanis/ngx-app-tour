# Ngx-App-Tour

[Demo](https://hamdiwanis.github.io/ngx-app-tour).

> This library built on the great lib ngx-tour by [isaacplmann](https://github.com/isaacplmann.)  It also uses the popover component by my favourite angular ui lib [ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd).

### Installation

```
npm install ngx-app-tour
```

Add lib styles to your app for ex styles in angular.json:
```
"styles": [
              "node_modules/ngx-app-tour/styles/styles.css",
             ...
            ],
```

###  Usage
Add in your root module:
```
@NgModule({
  imports: [
    ...
    NgxAppTour.forRoot()
  ],
})
export class AppModule { }
```

Add in every other module you use it in:
```
@NgModule({
  imports: [
    ...
    NgxAppTour
  ],
})
export class AppModule { }
```

Add in every other module you use it in:
```
@NgModule({
  imports: [
    ...
    NgxAppTour
  ],
})
export class AppModule { }
```

Mark your tour steps with tourAnchor and give it an id:
```
<div tourAnchor="id"></div>
```

Enject TourService in a component:
```
constructor(public tourService: TourService) {}
```

Use the TourService to init tour tour:
```
this.tourService.initialize(steps[], defaults);
```

Use the TourService to control the tour:
```
this.tourService.start();
this.tourService.stop();
this.tourService.pause();
this.tourService.resume();
```

Use the TourService to listen for tour events:
```
this.tourService.events$.subscribe(e => do something)
```

Use custom step template:
```
<ng-template #stepTemplate let-step="step">
    <div class="step-container">
        <div class="custom-step-content">
            {{ step?.content }}
        </div>
        <div class="step-actions">
            <button class="step-btn" [disabled]="!tourService.hasPrev(step)" (click)="tourService.prev()">
                prev
            </button>
            <button class="step-btn" [disabled]="!tourService.hasNext(step)" (click)="tourService.next()">
                next
            </button>
            <button class="step-btn" (click)="tourService.end()">{{ step?.endBtnTitle }}</button>
        </div>
    </div>
</ng-template>
```

```
    @ViewChild('stepTemplate') stepTemplate;
 
    // then use it with a single step
    this.tourService.initialize([
       ...
       {
        ...
         stepTemplate: this.stepTemplate
       },
       ...
     ]);
     
     // or as default template
     
     this.tourService.initialize([...], {stepTemplate: this.stepTemplate});
     
```

Use touranchor--is-active class to style active step:
```
.touranchor--is-active{
    // your styles
}
```


### Tour Step API
Add in your root module:

| Prop | Type |
| ------ | ------ |
| stepId | string |
| anchorId | string |
| title | string |
| content | string |
| route | string - string[] - UrlSegment[] |
| nextStep | number | string |
| prevStep | number | string |
| preventScrolling | boolean |
| prevBtnTitle | string |
| nextBtnTitle | string |
| endBtnTitle | string |
| disableBackdrop | boolean |
| backdropColor | string |
| enableRippleEffect | boolean|
| rippleColor | string|
| backdropRadius | string |
| stepTemplate | template |
| placement | 'topLeft' - 'top' - 'topRight' - 'leftTop' - 'left' - 'leftBottom'
    - 'rightTop' - 'right' - 'rightBottom'| 'bottomLeft' - 'bottom' - 'bottomRight' |

