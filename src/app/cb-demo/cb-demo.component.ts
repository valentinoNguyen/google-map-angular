import { Component, OnInit } from '@angular/core';
import { Clipboard } from "@angular/cdk/clipboard";
@Component({
  selector: 'app-cb-demo',
  templateUrl: './cb-demo.component.html',
  styleUrls: ['./cb-demo.component.css']
})
export class CbDemoComponent implements OnInit {
  value = "Hello world";
  code = "AAA-BBB-CCC";

  constructor(private clipboard: Clipboard) {}

  ngOnInit(){}
  generateId() {
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   });
   this.clipboard.copy(id);
   alert(`Id "${id}" is generated and copied to the clipboard`);
  }

  copy(value) {
    return `${value}\n\ncopied from timdeschryver.dev`;
  }
}
