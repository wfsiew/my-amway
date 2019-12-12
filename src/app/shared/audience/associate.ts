import { PRODUCTS, AUDIENCE_DISCOUNT } from '../pricing';

export class AssociateRecipient {

  static recipient = 'Associate';

  static getPricing(cart) {
    let n = 0;
    let total = 0;

    for (let k in cart) {
      let q = cart[k];
      if (k === 'santa-cruz') {
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

      total += (PRODUCTS[k] - (PRODUCTS[k] * AUDIENCE_DISCOUNT[AssociateRecipient.recipient])) * q;
    }

    return total;
  }
}