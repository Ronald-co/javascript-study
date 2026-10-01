import {Product, Clothing, Appliance} from "../../data/products.js";

describe('test suite: Product Class',() => {

  it('creates a standard product', () => {
    const productDetail =  {
    id: "id001",
    image: "images/products/umbrella.jpg",
    name: "Umbrella",
    rating:{
      stars: 4.5,
      count: 124
    },
    priceCents: 200
  }
    const testProduct = new Product (productDetail);

    expect(testProduct.id).toEqual('id001');
    expect(testProduct.image).toEqual('images/products/umbrella.jpg');
    expect(testProduct.rating).toEqual({
      stars: 4.5,
      count: 124
    });
    expect(testProduct.priceCents).toEqual(200);
    expect(testProduct.getPrice()).toEqual('$2.00');
    expect(testProduct.extraInfoHTML()).toEqual('');
    expect(testProduct.getStarsUrl()).toEqual(`images/ratings/rating-${(testProduct.rating.stars)* 10}.png`);
    
  })


  it('creates a clothing product', () => {
    const productDetail = {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  }
    const testProduct = new Clothing (productDetail);

    expect(testProduct.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(testProduct.image).toEqual('images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(testProduct.rating).toEqual({
      stars: 4.5,
      count: 56
    });
    expect(testProduct.priceCents).toEqual(799);
    expect(testProduct.getPrice()).toEqual('$7.99');
    expect(testProduct.extraInfoHTML()).toContain('Size Chart');
    expect(testProduct.getStarsUrl()).toEqual(`images/ratings/rating-${(testProduct.rating.stars)* 10}.png`);
    expect(testProduct.sizeChartLink).toEqual('images/clothing-size-chart.png');

  })


  it('creates an appliance product', () => {
    const productDetail = {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: "appliance",
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
  }
    const testProduct = new Appliance (productDetail);

    expect(testProduct.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(testProduct.image).toEqual('images/products/black-2-slot-toaster.jpg');
    expect(testProduct.rating).toEqual({
      stars: 5,
      count: 2197
    });
    expect(testProduct.priceCents).toEqual(1899);
    expect(testProduct.getPrice()).toEqual('$18.99');
    expect(testProduct.extraInfoHTML()).toContain('Instructions');
    expect(testProduct.getStarsUrl()).toEqual(`images/ratings/rating-${(testProduct.rating.stars)* 10}.png`);
    expect(testProduct.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(testProduct.warrantyLink).toEqual('images/appliance-warranty.png');
    
  })
})