import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  PRODUCTS = {
    'kone': 3488.99,
    'ironhide': 3299.99,
    'ironhide-cartridge': 529.99,
    'fox-float': 66.00,
    'shimano-derailuer': 67.60,
    'santa-cruz': 185.50
  }

  PRODUCT_LIST = [
    {
      name: 'Kone',
      code: 'kone'
    },
    {
      name: 'Ironhide',
      code: 'ironhide'
    },
    {
      name: 'Ironhide Cartridge',
      code: 'ironhide-cartridge'
    },
    {
      name: 'Fox + Float',
      code: 'fox-float'
    },
    {
      name: 'Shimano + Derailuer',
      code: 'shimano-derailuer'
    },
    {
      name: 'SANTA CRUZ',
      code: 'santa-cruz'
    }
  ];

  AUDIENCE = ['Associate', 'Platinum', 'Diamond'];

  AUDIENCE_DISCOUNT = {
    'Associate': 0.05,
    'Platinum': 0.15,
    'Diamond': 0.20
  }

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
      this.total = this.getAssociatePricing();
    }
    
    else if (f.target === 'Platinum') {
      this.total = this.getPlatinumPricing();
    }

    else if (f.target === 'Diamond') {
      this.total = this.getDiamondPricing();
    }
  }

  getAssociatePricing() {
    let n = 0;
    let total = 0;

    for (let k in this.cart) {
      let q = this.cart[k];
      if (k === 'santa-cruz') {
        n = 0;
        for (let i = 0; i < q; i++) {
          if (n === 2) {
            n = 0;
            continue;
          }

          total += this.PRODUCTS[k];
          ++n;
        }

        continue;
      }

      total += (this.PRODUCTS[k] - (this.PRODUCTS[k] * this.AUDIENCE_DISCOUNT['Associate'])) * q;
    }

    return total;
  }

  getPlatinumPricing() {
    let n = 0;
    let total = 0;

    for (let k in this.cart) {
      let q = this.cart[k];
      if (k === 'kone') {
        if (q >= 5) {
          total += 2888.99 * q;
          continue;
        }
      }

      if (k === 'ironhide') {
        total += 3000 * q;
        continue;
      }

      if (k === 'ironhide-cartridge') {
        n = 0;
        for (let i = 0; i < q; i++) {
          if (n === 4) {
            n = 0;
            continue;
          }

          total += this.PRODUCTS[k];
          ++n;
        }

        continue;
      }

      total += (this.PRODUCTS[k] - (this.PRODUCTS[k] * this.AUDIENCE_DISCOUNT['Platinum'])) * q;
    }

    return total;
  }

  getDiamondPricing() {
    let n = 0;
    let total = 0;

    for (let k in this.cart) {
      let q = this.cart[k];
      if (k === 'kone') {
        if (q >= 3) {
          total += 2588.99 * q;
          continue;
        }
      }

      if (k === 'ironhide') {
        total += 2500 * q;
        continue;
      }

      if (k === 'ironhide-cartridge') {
        n = 0;
        for (let i = 0; i < q; i++) {
          if (n === 2) {
            n = 0;
            continue;
          }

          total += this.PRODUCTS[k];
          ++n;
        }

        continue;
      }

      total += (this.PRODUCTS[k] - (this.PRODUCTS[k] * this.AUDIENCE_DISCOUNT['Diamond'])) * q;
    }

    return total;
  }
}
