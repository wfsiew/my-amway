import { PRODUCTS, AUDIENCE_DISCOUNT } from '../pricing';

export class DiamondRecipient {

  static recipient = 'Diamond';

  static getPricing(cart) {
    let n = 0;
    let total = 0;

    for (let k in cart) {
      let q = cart[k];
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

          total += PRODUCTS[k];
          ++n;
        }

        continue;
      }

      total += (PRODUCTS[k] - (PRODUCTS[k] * AUDIENCE_DISCOUNT[DiamondRecipient.recipient])) * q;
    }

    return total;
  }
}