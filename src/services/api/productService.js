import { getApperClient } from '@/services/apperClient';

class ProductService {
  constructor() {
    this.tableName = 'product_c';
  }

  // Transform database record to UI format
  transformProduct(record) {
    return {
      Id: record.Id,
      title: record.title_c || record.Name,
      category: record.category_c,
      subcategory: record.subcategory_c,
      brand: record.brand_c,
      price: record.price_c,
      originalPrice: record.original_price_c,
      discount: record.discount_c || 0,
      images: record.images_c ? record.images_c.split('\n').filter(Boolean) : [],
      sizes: record.sizes_c ? record.sizes_c.split('\n').filter(Boolean) : [],
      colors: record.colors_c ? record.colors_c.split('\n').filter(Boolean) : [],
      description: record.description_c,
      rating: record.rating_c,
      reviewCount: record.review_count_c,
      inStock: record.in_stock_c,
      tags: record.tags_c ? record.tags_c.split('\n').filter(Boolean) : []
    };
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        orderBy: [{
          "fieldName": "Id",
          "sorttype": "DESC"
        }],
        pagingInfo: {
          "limit": 100,
          "offset": 0
        }
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Error fetching products:", response.message);
        throw new Error(response.message);
      }

      return response.data.map(record => this.transformProduct(record));
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        throw new Error('ApperClient not available');
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, id, params);

      if (!response.success) {
        console.error(`Error fetching product ${id}:`, response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Product not found");
      }

      return this.transformProduct(response.data);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      throw error;
    }
  }

  async getByCategory(category) {
    try {
      const products = await this.getAll();
      return products.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    } catch (error) {
      console.error("Error filtering products by category:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async search(query) {
    try {
      const products = await this.getAll();
      const searchTerm = query.toLowerCase();
      return products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.subcategory?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error("Error searching products:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getFeatured() {
    try {
      const products = await this.getAll();
      // Return products with high ratings or marked as featured
      return products
        .filter(p => p.rating >= 4.5)
        .slice(0, 8);
    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error);
      throw error;
    }
  }

  async getSaleItems() {
    try {
      const products = await this.getAll();
      // Return products with discounts
      return products.filter(p => p.discount > 0);
    } catch (error) {
      console.error("Error fetching sale items:", error?.response?.data?.message || error);
      throw error;
    }
  }

  // Filter methods
  async filterProducts(filters) {
    try {
      const products = await this.getAll();
      let filtered = [...products];

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
    } catch (error) {
      console.error("Error filtering products:", error?.response?.data?.message || error);
      throw error;
    }
  }

  // Get unique filter values
  async getFilterOptions() {
    try {
      const products = await this.getAll();
      
      const categories = [...new Set(products.map(p => p.category))];
      const brands = [...new Set(products.map(p => p.brand))];
      const sizes = [...new Set(products.flatMap(p => p.sizes || []))];
      const colors = [...new Set(products.flatMap(p => p.colors || []))];

      return {
        categories,
        brands,
        sizes,
        colors
      };
    } catch (error) {
      console.error("Error fetching filter options:", error?.response?.data?.message || error);
      throw error;
    }
  }
}

export const productService = new ProductService();