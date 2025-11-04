import productsData from "@/services/mockData/products.json";

class ProductService {
  constructor() {
    this.products = [...productsData];
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.products];
  }

  async getById(id) {
    await this.delay();
    const product = this.products.find(p => p.Id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  }

  async getByCategory(category) {
    await this.delay();
    return this.products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  async search(query) {
    await this.delay();
    const searchTerm = query.toLowerCase();
    return this.products.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subcategory?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async getFeatured() {
    await this.delay();
    // Return products with high ratings or marked as featured
    return this.products
      .filter(p => p.rating >= 4.5)
      .slice(0, 8);
  }

  async getSaleItems() {
    await this.delay();
    // Return products with discounts
    return this.products.filter(p => p.discount > 0);
  }

  // Filter methods
  async filterProducts(filters) {
    await this.delay();
    let filtered = [...this.products];

    if (filters.category) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      filtered = filtered.filter(p => {
        const price = p.price;
        return (!min || price >= min) && (!max || price <= max);
      });
    }

    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes && p.sizes.some(size => filters.sizes.includes(size))
      );
    }

    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors && p.colors.some(color => filters.colors.includes(color))
      );
    }

    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(p => 
        filters.brands.includes(p.brand)
      );
    }

    return filtered;
  }

  // Get unique filter values
  async getFilterOptions() {
    await this.delay();
    
    const categories = [...new Set(this.products.map(p => p.category))];
    const brands = [...new Set(this.products.map(p => p.brand))];
    const sizes = [...new Set(this.products.flatMap(p => p.sizes || []))];
    const colors = [...new Set(this.products.flatMap(p => p.colors || []))];

    return {
      categories,
      brands,
      sizes,
      colors
    };
  }
}

export const productService = new ProductService();