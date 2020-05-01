import { Component, OnInit } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(public diagnostic: Diagnostic,
    public shake: Shake,
    public camera: Camera) { }

  locationFlag: any;
  bluetoothFlag: any;
  imagePath: any;

  ngOnInit() {
    const watch = this.shake.startWatch(60).subscribe(() => {
      const options: CameraOptions = {
        quality: 100,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imagePath = base64Image;
      }, (err) => {
        alert(err);
      });
    })

    this.diagnostic.getLocationAuthorizationStatus()
      .then(state => {
        if (state == this.diagnostic.locationMode.LOCATION_OFF) {
          this.locationFlag = state;
        }
        else {
          this.locationFlag = "Location is ON";
        }
      })

    this.diagnostic.getBluetoothState()
      .then(state => {
        if (state == this.diagnostic.bluetoothState.POWERED_ON) {
          this.bluetoothFlag = state;
        }
        else {
          this.bluetoothFlag = "Bluetooth is off";
        }
      }, err => {
        alert(err);
      })
  }

}
