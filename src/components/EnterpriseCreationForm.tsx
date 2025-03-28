import React, { useState, useEffect } from 'react';
import { Database, Info, Save, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
}

interface API {
  _id: string;
  name: string;
  productId: string;
}

interface APIWithCondition {
  apiId: string;
  apiName: string;
  mandatoryConditions: string;
}

interface ProductWithAPIs {
  productId: string;
  productName: string;
  apis: APIWithCondition[];
}

interface EnterpriseFormData {
  enterpriseName: string;
  products: ProductWithAPIs[];
}

const EnterpriseCreationForm: React.FC = () => {
  const [formData, setFormData] = useState<EnterpriseFormData>({
    enterpriseName: '',
    products: []
  });
  
  const [products, setProducts] = useState<Product[]>([]);
  const [apis, setApis] = useState<API[]>([]);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);
  
  // Fetch products and APIs on component mount
  useEffect(() => {
    fetchProducts();
    fetchAPIs();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // For demo purposes, let's set some dummy data
      setProducts([
        { _id: 'p1', name: 'Customer Management' },
        { _id: 'p2', name: 'Order Processing' },
        { _id: 'p3', name: 'Inventory System' }
      ]);
    }
  };

  const fetchAPIs = async () => {
    try {
      const response = await fetch('/api/apis');
      if (!response.ok) {
        throw new Error('Failed to fetch APIs');
      }
      const data = await response.json();
      setApis(data);
    } catch (error) {
      console.error('Error fetching APIs:', error);
      // For demo purposes, let's set some dummy data
      setApis([
        { _id: 'a1', name: 'Get Customers', productId: 'p1' },
        { _id: 'a2', name: 'Add Customer', productId: 'p1' },
        { _id: 'a3', name: 'Get Orders', productId: 'p2' },
        { _id: 'a4', name: 'Create Order', productId: 'p2' },
        { _id: 'a5', name: 'Update Inventory', productId: 'p3' }
      ]);
    }
  };

  const renderTooltip = (text: string) => (
    <div className="group relative inline-block ml-1">
      <Info className="h-3 w-3 text-gray-400 cursor-help" />
      <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-1 text-xs text-white bg-gray-800 rounded-lg">
        {text}
      </div>
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enterprise Setup Data:', formData);
    alert('Enterprise setup saved successfully!');
  };

  const toggleProductExpand = (productId: string) => {
    setExpandedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addProduct = (product: Product) => {
    // Check if product is already added
    if (formData.products.some(p => p.productId === product._id)) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      products: [
        ...prev.products, 
        { 
          productId: product._id, 
          productName: product.name, 
          apis: [] 
        }
      ]
    }));
    
    // Auto-expand the newly added product
    setExpandedProducts(prev => [...prev, product._id]);
  };

  const removeProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.productId !== productId)
    }));
    
    // Remove from expanded products if needed
    setExpandedProducts(prev => prev.filter(id => id !== productId));
  };

  const addAPI = (productId: string, api: API) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product => {
        if (product.productId === productId) {
          // Check if API already exists
          if (product.apis.some(a => a.apiId === api._id)) {
            return product;
          }
          
          return {
            ...product,
            apis: [
              ...product.apis,
              {
                apiId: api._id,
                apiName: api.name,
                mandatoryConditions: ''
              }
            ]
          };
        }
        return product;
      })
    }));
  };

  const removeAPI = (productId: string, apiId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product => {
        if (product.productId === productId) {
          return {
            ...product,
            apis: product.apis.filter(api => api.apiId !== apiId)
          };
        }
        return product;
      })
    }));
  };

  const updateAPICondition = (productId: string, apiId: string, conditions: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product => {
        if (product.productId === productId) {
          return {
            ...product,
            apis: product.apis.map(api => {
              if (api.apiId === apiId) {
                return {
                  ...api,
                  mandatoryConditions: conditions
                };
              }
              return api;
            })
          };
        }
        return product;
      })
    }));
  };

  // Get available APIs for a product (those not already selected)
  const getAvailableAPIs = (productId: string) => {
    const selectedProduct = formData.products.find(p => p.productId === productId);
    if (!selectedProduct) return [];
    
    const selectedApiIds = selectedProduct.apis.map(api => api.apiId);
    return apis.filter(api => 
      api.productId === productId && !selectedApiIds.includes(api._id)
    );
  };

  return (
    <div className="form-container flex items-center justify-center min-h-screen">
      <div className="max-w-[700px] w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex">
            <div className="gradient-side w-[160px]" />
            <div className="flex-1 p-6">
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Enterprise Creation</h2>
                  <p className="text-sm text-gray-600">Configure your enterprise with products and APIs</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Enterprise Name {renderTooltip("Enter a name for your enterprise")}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Enterprise Name"
                      className="form-input"
                      value={formData.enterpriseName}
                      onChange={(e) => setFormData({...formData, enterpriseName: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-medium text-gray-700">
                        Select Products {renderTooltip("Choose products for this enterprise")}
                      </label>
                      <select 
                        className="text-xs border border-gray-200 rounded px-2 py-1"
                        value=""
                        onChange={(e) => {
                          const selectedProduct = products.find(p => p._id === e.target.value);
                          if (selectedProduct) {
                            addProduct(selectedProduct);
                          }
                        }}
                      >
                        <option value="">Add a product</option>
                        {products.filter(p => !formData.products.some(fp => fp.productId === p._id))
                          .map(product => (
                            <option key={product._id} value={product._id}>
                              {product.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {formData.products.length === 0 ? (
                      <div className="p-4 border border-dashed border-gray-200 rounded-lg text-center text-gray-500 text-sm">
                        No products selected. Please add a product from the dropdown.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.products.map(product => (
                          <div key={product.productId} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div 
                              className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                              onClick={() => toggleProductExpand(product.productId)}
                            >
                              <div className="font-medium text-sm">{product.productName}</div>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className="text-gray-500 hover:text-red-500 mr-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeProduct(product.productId);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                {expandedProducts.includes(product.productId) ? 
                                  <ChevronUp className="h-4 w-4" /> : 
                                  <ChevronDown className="h-4 w-4" />
                                }
                              </div>
                            </div>
                            
                            {expandedProducts.includes(product.productId) && (
                              <div className="p-3 bg-white">
                                <div className="flex justify-between items-center mb-2">
                                  <div className="text-xs font-medium text-gray-700">
                                    Selected APIs
                                  </div>
                                  <select
                                    className="text-xs border border-gray-200 rounded px-2 py-1"
                                    value=""
                                    onChange={(e) => {
                                      const selectedApi = apis.find(a => a._id === e.target.value);
                                      if (selectedApi) {
                                        addAPI(product.productId, selectedApi);
                                      }
                                    }}
                                  >
                                    <option value="">Add an API</option>
                                    {getAvailableAPIs(product.productId).map(api => (
                                      <option key={api._id} value={api._id}>
                                        {api.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                
                                {product.apis.length === 0 ? (
                                  <div className="p-3 border border-dashed border-gray-200 rounded-lg text-center text-gray-500 text-xs">
                                    No APIs selected. Please add APIs from the dropdown.
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    {product.apis.map(api => (
                                      <div key={api.apiId} className="p-3 border border-gray-100 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                          <div className="text-sm">{api.apiName}</div>
                                          <button
                                            type="button"
                                            className="text-gray-500 hover:text-red-500"
                                            onClick={() => removeAPI(product.productId, api.apiId)}
                                          >
                                            <X className="h-3 w-3" />
                                          </button>
                                        </div>
                                        <div>
                                          <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Mandatory Conditions {renderTooltip("Define required conditions for this API")}
                                          </label>
                                          <input
                                            type="text"
                                            placeholder="e.g., userId != null"
                                            className="form-input text-sm"
                                            value={api.mandatoryConditions}
                                            onChange={(e) => updateAPICondition(
                                              product.productId, 
                                              api.apiId, 
                                              e.target.value
                                            )}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="continue-button"
                      disabled={!formData.enterpriseName || formData.products.length === 0}
                    >
                      <span>Save Enterprise</span>
                      <Save className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseCreationForm;