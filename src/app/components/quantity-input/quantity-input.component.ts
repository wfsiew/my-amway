import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-input',
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.css']
})
export class QuantityInputComponent implements OnInit {

  @Input() productCode: string;
  @Output() onChange = new EventEmitter();
  qty = 0;

  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    this.qty = this.qty + 1;
    this.onChange.emit({ qty: this.qty, code: this.productCode });
  }

  onMinus() {
    if (this.qty > 0) {
      this.qty = this.qty - 1;
      this.onChange.emit({ qty: this.qty, code: this.productCode });
    }
  }
}
