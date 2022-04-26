import {ElementRef, HostListener, Directive, OnInit} from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  constructor(public element:ElementRef) {
  }

  ngOnInit():void {
    console.log('ngOnInit adjust')
    setTimeout(() => this.adjust(), 100);
  }

  adjust():void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    if(textArea) {
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.height = (textArea.scrollHeight > 80 ? 80 : (textArea.scrollHeight - 13)) + "px";
    }
  }
}