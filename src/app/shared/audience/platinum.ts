import { PRODUCTS, AUDIENCE_DISCOUNT } from '../pricing';

export class PlatinumRecipient {

  static recipient = 'Platinum';

  static getPricing(cart) {
    let n = 0;
    let total = 0;

    for (let k in cart) {
      let q = cart[k];
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

          total += PRODUCTS[k];
          ++n;
        }

        continue;
      }

      total += (PRODUCTS[k] - (PRODUCTS[k] * AUDIENCE_DISCOUNT[PlatinumRecipient.recipient])) * q;
    }

    return total;
  }
}