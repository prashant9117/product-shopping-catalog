import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product(1,'Product 1, 250')).toBeTruthy();
  });
});
