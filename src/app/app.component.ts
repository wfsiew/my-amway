import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PRODUCTS, PRODUCT_LIST, AUDIENCE } from './shared/pricing';
import { AssociateRecipient } from './shared/audience/associate';
import { PlatinumRecipient } from './shared/audience/platinum';
import { DiamondRecipient } from './shared/audience/diamond';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'my-amway';
  mform: FormGroup;
  total = 0.00;
  cart = {};

  readonly PRODUCTS = PRODUCTS;
  readonly PRODUCT_LIST = PRODUCT_LIST;
  readonly AUDIENCE = AUDIENCE;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.mform = this.fb.group(
      {
        target: ['Associate']
      }
    );
  }

  handleOnChange(e) {
    this.cart[e.code] = e.qty;
  }

  onSubmit() {
    const f = this.mform.value;
    console.log(this.cart)
    if (f.target === 'Associate') {
      this.total = AssociateRecipient.getPricing(this.cart);
    }
    
    else if (f.target === 'Platinum') {
      this.total = PlatinumRecipient.getPricing(this.cart);
    }

    else if (f.target === 'Diamond') {
      this.total = DiamondRecipient.getPricing(this.cart);
    }
  }
}
