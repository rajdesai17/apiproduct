import React, { useState } from 'react';
import { Info, Package } from 'lucide-react';

interface ProductFormData {
  name: string;
  type: string;
  description: string;
}

const PRODUCT_TYPES = [
  'API Service',
  'Web Application', 
  'Mobile App',
  'Desktop Software',
  'Database Service',
  'Other'
];

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    type: '',
    description: ''
  });

  const renderTooltip = (text: string) => (
    <div className="group relative inline-block ml-1">
      <Info className="h-3 w-3 text-gray-400 cursor-help" />
      <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-1 text-xs text-white bg-gray-800 rounded-lg">
        {text}
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting product data:', formData);
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      if (!response.ok) {
        let errorMessage = 'Failed to create product';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Parse the response text as JSON only if the response was ok
      const data = JSON.parse(responseText);
      console.log('Product created successfully:', data);
      
      alert('Product created successfully!');
      setFormData({ name: '', type: '', description: '' });
    } catch (error) {
      console.error('Error creating product:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to create product. Please try again.');
      }
    }
  };

  return (
    <div className="form-container flex items-center justify-center min-h-screen">
      <div className="max-w-[800px] w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex">
            <div className="gradient-side w-[160px]" />
            <div className="flex-1 p-6">
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Create New Product</h2>
                  <p className="text-sm text-gray-600">Fill in the details to create a new product</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Name {renderTooltip("Enter a unique name for your product")}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Product Name"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Type {renderTooltip("Select the type of product")}
                    </label>
                    <select
                      className="form-select"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                    >
                      <option value="">Select Product Type</option>
                      {PRODUCT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description {renderTooltip("Provide a detailed description of your product")}
                    </label>
                    <textarea
                      className="form-textarea"
                      placeholder="Enter Product Description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="continue-button"
                    >
                      <span>Create Product</span>
                      <Package className="h-4 w-4 ml-1" />
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

export default ProductForm;