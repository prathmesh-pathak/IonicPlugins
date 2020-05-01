import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public barcodeScanner: BarcodeScanner) { }

  Encode() {
    var textToEncode = window.prompt("Enter text : ")
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, textToEncode)
      .then(data => {
        alert(JSON.stringify(data));
      }, (err) => {
        alert(JSON.stringify(err));
      })
  }

  Scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      alert(barcodeData.text);
    }, (err) => {
      alert(JSON.stringify(err));
    })
  }

}
