import { Component, Input, ViewChild }		    	from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CropperComponent } from 'angular-cropperjs';

@Component({
	selector: 'cropper-page',
	templateUrl: 'cropper.page.html',
    styleUrls: ['cropper.page.scss']
})
export class CropperModal {
	@Input() image: string;
	@ViewChild('angularCropper') public angularCropper: CropperComponent;
	config: any = {
	    aspectRatio : 16/16,
	    dragMode : 'move',
	    background : true,
	    movable: true,
	    rotatable : true,
	    scalable: true,
	    zoomable: true,
	    checkCrossOrigin: false
  	};
	constructor(
		public modalCtrl: ModalController
	) {
	}
	closeModal(dismiss) {
        this.modalCtrl.dismiss(dismiss);
    }    
    doSave(){
    	this.modalCtrl.dismiss(this.angularCropper.cropper.getCroppedCanvas().toDataURL());
    }
    rotateLeft(){
    	this.angularCropper.cropper.rotate(-15);
    }
    rotateRight(){
    	this.angularCropper.cropper.rotate(15);
    }
}