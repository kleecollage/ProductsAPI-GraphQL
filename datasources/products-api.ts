import { RESTDataSource } from '@apollo/datasource-rest';

export class ProductsAPI extends RESTDataSource {
	override baseURL = 'http://localhost:3000/';

	async getAllProducts() {
    const { products } = await this.get(`/products/`);

    return products;
  }

  async getProductById(id: string) {
    const { product } = await this.get(`/products/${encodeURI(id)}`);

    return product;
  }

  async createProduct(name: string, price: number, stock: number) {
    const { product } = await this.post(`/products/`, {
      body: {
        name,
        price,
        stock,
      }
    });

    return product;
  }

  async updateProduct(id: string, name: string, price: number, stock: number) {
    const { product } = await this.patch(`/products/${encodeURI(id)}`, {
      body: {
        name,
        price,
        stock,
      }
    });
    console.log('product updated: ', product)

    return product;
  }

  async deleteProduct(id: string) {
    const { product } = await this.delete(`/products/${encodeURI(id)}`);

    return product;
  }
}
