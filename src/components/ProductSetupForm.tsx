import React, { useState } from 'react';
import { Database, Info, RefreshCw, Save } from 'lucide-react';

interface ProductSetupFormData {
  productName: string;
  databaseName: string;
  databaseString: string;
}

const ProductSetupForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductSetupFormData>({
    productName: '',
    databaseName: '',
    databaseString: ''
  });
  const [testingConnection, setTestingConnection] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateFormData = <K extends keyof ProductSetupFormData>(
    field: K,
    value: ProductSetupFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
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
    console.log('Product Setup Data:', formData);
    // Here you would typically send the data to your backend
    alert('Product setup saved successfully!');
  };

  const testConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus('idle');
    
    try {
      // Simulate an API call to test the connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, let's say the connection is successful if the database string contains "mongodb"
      if (formData.databaseString.includes('mongodb')) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
      console.error('Connection test failed:', error);
    } finally {
      setTestingConnection(false);
    }
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
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Product Setup</h2>
                  <p className="text-sm text-gray-600">Configure your product and database connection</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product Name {renderTooltip("Enter a name for your product")}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Product Name"
                      className="form-input"
                      value={formData.productName}
                      onChange={(e) => updateFormData('productName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Database Name {renderTooltip("Enter the name of your database")}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Database Name"
                      className="form-input"
                      value={formData.databaseName}
                      onChange={(e) => updateFormData('databaseName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Database Connection String {renderTooltip("Enter your MongoDB connection string")}
                    </label>
                    <input
                      type="text"
                      placeholder="mongodb://username:password@host:port/database"
                      className="form-input"
                      value={formData.databaseString}
                      onChange={(e) => updateFormData('databaseString', e.target.value)}
                      required
                    />
                    <div className="mt-1 text-xs text-gray-500">
                      Example: mongodb://localhost:27017/mydb
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={testConnection}
                      disabled={!formData.databaseString || testingConnection}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all ${
                        testingConnection
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : connectionStatus === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : connectionStatus === 'error'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      {testingConnection ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : connectionStatus === 'success' ? (
                        <>
                          <Database className="h-4 w-4" />
                          <span>Connection Successful</span>
                        </>
                      ) : connectionStatus === 'error' ? (
                        <>
                          <Database className="h-4 w-4" />
                          <span>Connection Failed</span>
                        </>
                      ) : (
                        <>
                          <Database className="h-4 w-4" />
                          <span>Test Connection</span>
                        </>
                      )}
                    </button>
                  </div>

                  {connectionStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      Failed to connect to database. Please check your connection string and try again.
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="continue-button"
                      disabled={!formData.productName || !formData.databaseName || !formData.databaseString}
                    >
                      <span>Save Product Setup</span>
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

export default ProductSetupForm;