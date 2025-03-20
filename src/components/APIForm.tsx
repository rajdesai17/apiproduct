import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Info, Lock, Server, Settings2, Shield, Database } from 'lucide-react';

type Step = 1 | 2 | 3 | 4 | 5;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type AuthMethod = 'OAuth' | 'API Key' | 'JWT';

interface Product {
  _id: string;
  name: string;
  description: string;
}

interface APIFormData {
  name: string;
  apiId: string;
  version: string;
  productName: string;
  masterCollection: string;
  recordLimit: number;
  description: string;
  method: HttpMethod | null;
  endpoint: string;
  defaultCondition: string;
  requiresAuth: boolean;
  authMethod: AuthMethod | null;
  roles: string[];
  databaseName: string;
  collectionName: string;
}

const DEFAULTS = {
  VERSIONS: ['v1', 'v2', 'v3'],
  COLLECTIONS: ['Users', 'Orders', 'Products'],
  AUTH_METHODS: ['OAuth', 'API Key', 'JWT'] as AuthMethod[],
  ROLES: ['Admin', 'User', 'Guest', 'Public']
};

const APIForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<APIFormData>({
    name: '', apiId: '', version: '', productName: '',
    masterCollection: '', recordLimit: 100, description: '',
    method: null, endpoint: '/api/v1/', defaultCondition: '',
    requiresAuth: false, authMethod: null, roles: [],
    databaseName: '', collectionName: ''
  });

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
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
      setProducts([]); // Set empty array on error
    }
  };

  const updateFormData = <K extends keyof APIFormData>(field: K, value: APIFormData[K]) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      if (field === 'name' && typeof value === 'string') {
        newData.apiId = value.toLowerCase().replace(/\s+/g, '-');
        newData.endpoint = `/api/v1/${newData.apiId}`;
      }
      return newData;
    });
  };

  const methods = [
    { type: 'GET', color: 'bg-emerald-500' },
    { type: 'POST', color: 'bg-blue-500' },
    { type: 'PUT', color: 'bg-amber-500' },
    { type: 'DELETE', color: 'bg-red-500' }
  ] as const;

  const renderTooltip = (text: string) => (
    <div className="group relative inline-block ml-1">
      <Info className="h-3 w-3 text-gray-400 cursor-help" />
      <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-1 text-xs text-white bg-gray-800 rounded-lg">
        {text}
      </div>
    </div>
  );

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3, 4, 5].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`step-indicator ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  step <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step === 1
                  ? 'Details'
                  : step === 2
                  ? 'Method'
                  : step === 3
                  ? 'Security'
                  : step === 4
                  ? 'Database'
                  : 'Review'}
              </span>
            </div>
            {step < 5 && (
              <div
                className={`step-line ${
                  step < currentStep ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Let's set up your API</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  API Name {renderTooltip("Enter a unique name for your API")}
                </label>
                <input
                  type="text"
                  placeholder="Enter API Name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  API ID {renderTooltip("Auto-generated from API name")}
                </label>
                <input
                  type="text"
                  className="form-input bg-gray-50"
                  value={formData.apiId}
                  onChange={(e) => updateFormData('apiId', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Version</label>
                <select
                  className="form-select"
                  value={formData.version}
                  onChange={(e) => updateFormData('version', e.target.value)}
                >
                  <option value="">Select Version</option>
                  {DEFAULTS.VERSIONS.map(version => (
                    <option key={version} value={version}>{version}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Product</label>
                <select
                  className="form-select"
                  value={formData.productName}
                  onChange={(e) => updateFormData('productName', e.target.value)}
                >
                  <option value="">{products.length === 0 ? 'No products available' : 'Select Product'}</option>
                  {products.map((product) => (
                    <option key={product._id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Collection</label>
                <select
                  className="form-select"
                  value={formData.masterCollection}
                  onChange={(e) => updateFormData('masterCollection', e.target.value)}
                >
                  <option value="">Select Collection</option>
                  {DEFAULTS.COLLECTIONS.map(collection => (
                    <option key={collection} value={collection}>{collection}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Record Limit {renderTooltip("Maximum records per request")}
                </label>
                <input
                  type="number"
                  placeholder="Max limit"
                  className="form-input"
                  value={formData.recordLimit}
                  onChange={(e) => updateFormData('recordLimit', parseInt(e.target.value))}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="form-textarea"
                  placeholder="Enter API Description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Configure API Methods & Endpoints</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Select API Method {renderTooltip("Choose the HTTP method for your API")}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {methods.map(({ type, color }) => (
                    <button
                      key={type}
                      className={`method-button ${
                        formData.method === type
                          ? `${color} text-white`
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      onClick={() => updateFormData('method', type)}
                    >
                      <Server className="h-4 w-4" />
                      <span className="text-sm font-medium">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Endpoint URL {renderTooltip("The URL path for your API")}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.endpoint}
                  onChange={(e) => updateFormData('endpoint', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Default Condition {renderTooltip("Default query condition")}
                </label>
                <input
                  type="text"
                  placeholder="Enter Default Condition"
                  className="form-input"
                  value={formData.defaultCondition}
                  onChange={(e) => updateFormData('defaultCondition', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Secure Your API</h2>
            <div className="space-y-4">
              <div className="auth-toggle">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-gray-700" />
                    <span className="text-sm text-gray-700">Require authentication?</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.requiresAuth}
                      onChange={(e) => updateFormData('requiresAuth', e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {formData.requiresAuth && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Authentication Method {renderTooltip("Choose how users will authenticate")}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {DEFAULTS.AUTH_METHODS.map(method => (
                        <button
                          key={method}
                          onClick={() => updateFormData('authMethod', method)}
                          className={`method-button ${
                            formData.authMethod === method
                              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <Shield className="h-4 w-4" />
                          <span className="text-sm">{method}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Authorization Roles {renderTooltip("Select access roles")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULTS.ROLES.map(role => (
                        <button
                          key={role}
                          onClick={() => {
                            const newRoles = formData.roles.includes(role)
                              ? formData.roles.filter(r => r !== role)
                              : [...formData.roles, role];
                            updateFormData('roles', newRoles);
                          }}
                          className={`role-chip ${
                            formData.roles.includes(role)
                              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Configure Database</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">MongoDB Configuration</span>
                </div>
                <p className="text-sm text-blue-700">Configure your MongoDB database settings below.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Database Name {renderTooltip("Enter the name of your MongoDB database")}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Database Name"
                    className="form-input"
                    value={formData.databaseName}
                    onChange={(e) => updateFormData('databaseName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Collection Name {renderTooltip("Enter the name of your MongoDB collection")}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Collection Name"
                    className="form-input"
                    value={formData.collectionName}
                    onChange={(e) => updateFormData('collectionName', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Review Your API Settings</h2>
            <div className="review-card">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Basic Details</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {formData.name}</p>
                    <p><span className="text-gray-600">ID:</span> {formData.apiId}</p>
                    <p><span className="text-gray-600">Version:</span> {formData.version}</p>
                    <p><span className="text-gray-600">Product:</span> {formData.productName}</p>
                    <p><span className="text-gray-600">Collection:</span> {formData.masterCollection}</p>
                    <p><span className="text-gray-600">Limit:</span> {formData.recordLimit}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Configuration</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Method:</span> {formData.method}</p>
                    <p><span className="text-gray-600">Endpoint:</span> {formData.endpoint}</p>
                    <p><span className="text-gray-600">Auth:</span> {formData.requiresAuth ? 'Required' : 'Not required'}</p>
                    {formData.requiresAuth && (
                      <>
                        <p><span className="text-gray-600">Auth Method:</span> {formData.authMethod}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {formData.roles.map(role => (
                            <span key={role} className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-700 shadow-sm">
                              {role}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Database Configuration</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-600">Database:</span> {formData.databaseName}</p>
                  <p><span className="text-gray-600">Collection:</span> {formData.collectionName}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">Description</h3>
                <p className="text-sm text-gray-700">{formData.description}</p>
              </div>
            </div>
          </div>
        );
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
                {renderStepIndicator()}
                <div className="mb-6 min-h-[400px] overflow-y-auto">{renderStep()}</div>
                <div className="flex justify-between items-center">
                  {currentStep > 1 ? (
                    <button
                      onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
                      className="back-button"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 5 ? (
                    <button
                      onClick={() => setCurrentStep((prev) => (prev + 1) as Step)}
                      className="continue-button"
                      disabled={currentStep === 1 && !formData.name}
                    >
                      <span>Continue</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => console.log('API Created:', formData)}
                      className="continue-button"
                    >
                      <span>Create API</span>
                      <Settings2 className="h-4 w-4 ml-1" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIForm;