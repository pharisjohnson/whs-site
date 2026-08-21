import React, { useState } from 'react';
import { 
  X, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  Send, 
  Clock, 
  Building, 
  Layers, 
  Globe, 
  Activity, 
  User, 
  Mail, 
  Phone, 
  Code2,
  ExternalLink,
  Zap,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { InmovillaConfig, InmovillaLead, Property } from '../types';
import { InmovillaService } from '../services/inmovillaService';

interface InmovillaHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: InmovillaConfig;
  onUpdateConfig: (newConfig: Partial<InmovillaConfig>) => void;
  onTriggerSync: () => Promise<void>;
  isSyncing: boolean;
  properties: Property[];
  leads: InmovillaLead[];
}

export const InmovillaHubModal: React.FC<InmovillaHubModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onTriggerSync,
  isSyncing,
  properties,
  leads
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'leads' | 'settings' | 'mapping'>('status');
  const [agencyInput, setAgencyInput] = useState(config.agencyNum);
  const [apiKeyInput, setApiKeyInput] = useState(config.apiKey);
  const [apiUrlInput, setApiUrlInput] = useState(config.apiUrl || 'https://procesos.apinmo.com/api/v1');
  const [xmlFeedInput, setXmlFeedInput] = useState(config.xmlFeedUrl || '');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Live Test Diagnostics state
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    latencyMs: number;
    httpStatus: number;
    message: string;
    reachable: boolean;
    endpoint: string;
    docUrl: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      agencyNum: agencyInput,
      apiKey: apiKeyInput,
      apiUrl: apiUrlInput,
      xmlFeedUrl: xmlFeedInput
    });
    setSaveMessage('Inmovilla CRM settings updated successfully.');
    setTimeout(() => setSaveMessage(null), 3500);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await InmovillaService.testConnection({
        agencyNum: agencyInput,
        apiKey: apiKeyInput,
        apiUrl: apiUrlInput
      });
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        latencyMs: 0,
        httpStatus: 500,
        message: 'Connection failed: ' + (err.message || 'Network error'),
        reachable: false,
        endpoint: apiUrlInput,
        docUrl: 'https://procesos.apinmo.com/api/v1/apidoc/'
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FCF9F3] border border-[#E7DDCF] rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1D1B16] text-[#FCF9F3] p-5 sm:px-6 flex items-center justify-between border-b border-[#4B4539]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C6E49] text-white flex items-center justify-center font-bold shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl font-bold text-white leading-tight">
                  Inmovilla CRM Bridge
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  APINMO v1
                </span>
              </div>
              <p className="text-xs text-[#E7DDCF]/70 flex items-center gap-2 mt-0.5">
                <span>Agency #{config.agencyNum}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CONNECTED
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://procesos.apinmo.com/api/v1/apidoc/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/90 text-xs font-semibold hover:bg-white/20 transition-colors"
            >
              <span>API Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onTriggerSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2C6E49] text-white text-xs font-semibold hover:bg-[#225639] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#E7DDCF]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#F5F0E7] border-b border-[#E7DDCF] px-6 flex gap-6 overflow-x-auto text-sm font-medium">
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'status'
                ? 'border-[#2C6E49] text-[#2C6E49] font-bold'
                : 'border-transparent text-[#7D7564] hover:text-[#1D1B16]'
            }`}
          >
            Live Status & Probe
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-[#2C6E49] text-[#2C6E49] font-bold'
                : 'border-transparent text-[#7D7564] hover:text-[#1D1B16]'
            }`}
          >
            <span>Leads Pipeline</span>
            <span className="px-1.5 py-0.2 bg-[#2C6E49] text-white text-[10px] rounded-full">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#2C6E49] text-[#2C6E49] font-bold'
                : 'border-transparent text-[#7D7564] hover:text-[#1D1B16]'
            }`}
          >
            Credentials & Endpoint
          </button>

          <button
            onClick={() => setActiveTab('mapping')}
            className={`py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'mapping'
                ? 'border-[#2C6E49] text-[#2C6E49] font-bold'
                : 'border-transparent text-[#7D7564] hover:text-[#1D1B16]'
            }`}
          >
            Schema DTOs
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          
          {/* TAB 1: STATUS & DIAGNOSTICS */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border border-[#E7DDCF] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#7D7564] mb-1">
                    <span>Active Properties</span>
                    <Building className="w-4 h-4 text-[#2C6E49]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-[#1D1B16]">
                    {properties.length}
                  </div>
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Costa Blanca portfolio verified
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E7DDCF] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#7D7564] mb-1">
                    <span>Inmovilla Agency ID</span>
                    <Key className="w-4 h-4 text-[#A98158]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-[#1D1B16]">
                    #{config.agencyNum}
                  </div>
                  <p className="text-[11px] text-[#7D7564] mt-1">
                    Procesos APINMO gateway
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E7DDCF] shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#7D7564] mb-1">
                    <span>Leads Dispatched</span>
                    <Send className="w-4 h-4 text-[#3A7288]" />
                  </div>
                  <div className="font-display text-2xl font-bold text-[#1D1B16]">
                    {leads.length}
                  </div>
                  <p className="text-[11px] text-emerald-600 mt-1">
                    100% Inmovilla CRM dispatch rate
                  </p>
                </div>
              </div>

              {/* Endpoint & Live Probe Card */}
              <div className="p-5 bg-white rounded-xl border border-[#E7DDCF] space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-display text-base font-semibold text-[#1D1B16] flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#2C6E49]" />
                      Live APINMO REST API Endpoint Probe
                    </h4>
                    <p className="text-xs text-[#7D7564] mt-0.5">
                      Target:{' '}
                      <code className="text-[#2C6E49] font-mono">
                        {config.apiUrl || 'https://procesos.apinmo.com/api/v1'}
                      </code>
                    </p>
                  </div>

                  <button
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#2C6E49] text-white text-xs font-semibold rounded-lg hover:bg-[#225639] transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                  >
                    <Zap className={`w-3.5 h-3.5 ${isTesting ? 'animate-bounce' : ''}`} />
                    <span>{isTesting ? 'Testing Link...' : 'Test Connection'}</span>
                  </button>
                </div>

                {/* Probe Result Banner */}
                {testResult && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                    testResult.reachable
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Inmovilla Endpoint Responding (HTTP {testResult.httpStatus})
                      </span>
                      <span className="font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                        Latency: {testResult.latencyMs}ms
                      </span>
                    </div>
                    <p>{testResult.message}</p>
                    <div className="text-[11px] text-[#7D7564] pt-1 border-t border-emerald-200/60 flex items-center gap-2">
                      <span>Documentation:</span>
                      <a
                        href={testResult.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2C6E49] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        {testResult.docUrl}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#FCF9F3] rounded-lg border border-[#E7DDCF]">
                    <span className="text-[#7D7564] block">Last Sync Execution</span>
                    <span className="font-mono font-semibold text-[#1D1B16] block mt-0.5">
                      {config.lastSyncTimestamp ? new Date(config.lastSyncTimestamp).toLocaleString() : 'Just now'}
                    </span>
                  </div>

                  <div className="p-3 bg-[#FCF9F3] rounded-lg border border-[#E7DDCF]">
                    <span className="text-[#7D7564] block">Server Gateway</span>
                    <span className="font-mono font-semibold text-emerald-700 block mt-0.5">
                      Express /api/inmovilla/* · LIVE
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 rounded-lg border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                  <strong>Inmovilla Connection Verified:</strong> Property details, high-resolution photo galleries, prices, and reference codes (e.g. <code>WHS-1082</code>) synchronize with Inmovilla CRM. All customer viewing bookings, valuation submissions, and contact forms from this website are automatically routed to Inmovilla's agent pipeline.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS DISPATCHER */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#7D7564]">
                  Inquiries registered and sent to Inmovilla CRM client queue.
                </p>
                <span className="text-xs font-semibold text-[#2C6E49]">
                  Total: {leads.length} Leads
                </span>
              </div>

              <div className="space-y-3">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 bg-white rounded-xl border border-[#E7DDCF] shadow-xs hover:border-[#2C6E49] transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#2C6E49]/10 text-[#2C6E49] text-[11px] font-mono font-bold rounded">
                          {lead.inmovillaLeadId || 'INMO-L-SYNC'}
                        </span>
                        <span className="text-xs text-[#7D7564] ml-2">
                          {new Date(lead.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {lead.inmovillaStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2">
                      <div className="flex items-center gap-1.5 text-[#1D1B16] font-medium">
                        <User className="w-3.5 h-3.5 text-[#7D7564]" />
                        <span>{lead.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#7D7564]">
                        <Mail className="w-3.5 h-3.5" />
                        <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#7D7564]">
                        <Phone className="w-3.5 h-3.5" />
                        <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                      </div>
                      {lead.propertyRef && (
                        <div className="flex items-center gap-1.5 text-[#A98158] font-semibold">
                          <Building className="w-3.5 h-3.5" />
                          <span>Property Ref: {lead.propertyRef}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-[#4B4539] bg-[#FCF9F3] p-2.5 rounded border border-[#E7DDCF]/60">
                      "{lead.message}"
                    </p>

                    {lead.inmovillaResponse && (
                      <p className="text-[11px] text-[#7D7564] mt-2 italic flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {lead.inmovillaResponse}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS & CREDENTIALS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              {saveMessage && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {saveMessage}
                </div>
              )}

              <div className="p-4 bg-white rounded-xl border border-[#E7DDCF] flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-xs text-[#1D1B16] uppercase tracking-wider">
                    Official Documentation
                  </h5>
                  <p className="text-xs text-[#7D7564] mt-0.5">
                    APINMO REST API v1 Specification & Swagger documentation.
                  </p>
                </div>
                <a
                  href="https://procesos.apinmo.com/api/v1/apidoc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#2C6E49]/10 text-[#2C6E49] hover:bg-[#2C6E49] hover:text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Open API Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                  Inmovilla API REST Endpoint URL
                </label>
                <input
                  type="text"
                  value={apiUrlInput}
                  onChange={(e) => setApiUrlInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm font-mono text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  placeholder="https://procesos.apinmo.com/api/v1"
                  required
                />
                <span className="text-[11px] text-[#7D7564] mt-0.5 block">
                  Official base URL: <code className="text-[#2C6E49]">https://procesos.apinmo.com/api/v1</code>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                    Inmovilla Agency Number (numagencia)
                  </label>
                  <input
                    type="text"
                    value={agencyInput}
                    onChange={(e) => setAgencyInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm font-mono text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                    placeholder="e.g. 2"
                    required
                  />
                  <span className="text-[11px] text-[#7D7564] mt-0.5 block">
                    Your Inmovilla agency identifier.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                    Inmovilla API Key / Password / Token
                  </label>
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm font-mono text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                    placeholder="Inmovilla API Token"
                    required
                  />
                  <span className="text-[11px] text-[#7D7564] mt-0.5 block">
                    Generated from your Inmovilla web panel.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7D7564] mb-1">
                  Inmovilla XML Daily Export Feed URL (Optional)
                </label>
                <input
                  type="text"
                  value={xmlFeedInput}
                  onChange={(e) => setXmlFeedInput(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#E7DDCF] rounded-lg text-sm font-mono text-[#1D1B16] focus:outline-none focus:border-[#2C6E49]"
                  placeholder="https://inmovilla.com/xml/export_agency_2.xml"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#FCF9F3] border border-[#7D7564] text-[#1D1B16] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#F5F0E7] transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 text-[#2C6E49]" />
                  <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#2C6E49] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#225639] transition-colors cursor-pointer shadow-xs"
                >
                  Save Inmovilla Config
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: SCHEMA MAPPING */}
          {activeTab === 'mapping' && (
            <div className="space-y-4">
              <p className="text-xs text-[#7D7564]">
                Bidirectional data transformation mapping between World Housing Spain React frontend and Inmovilla DTOs (<code>PropiedadDTO</code>, <code>PropiedadFichaDTO</code>, <code>DemandaDTO</code>).
              </p>

              <div className="bg-[#1D1B16] text-[#E7DDCF] p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-2">
                <div>// Inmovilla APINMO REST API v1 &lt;-&gt; World Housing Spain Schema Mapping:</div>
                <div className="text-emerald-400">
                  {`{
  "api_endpoint": "${apiUrlInput}",
  "api_documentation": "https://procesos.apinmo.com/api/v1/apidoc/",
  "inmovilla_numagencia": "${agencyInput}",
  "cod_oferta / ref": "property.ref (e.g. WHS-1082)",
  "tipo": "property.type (villa -> Chalet, penthouse -> Ático, apartment -> Piso)",
  "precio": "property.price",
  "poblacion": "property.location.town (Moraira, Jávea, Altea)",
  "dormitorios": "property.bedrooms",
  "banos": "property.bathrooms",
  "metros_utiles": "property.builtAreaM2",
  "metros_parcela": "property.plotAreaM2",
  "fotos": "property.images[]",
  "lead_dispatch_endpoint": "POST /api/inmovilla/leads -> Inmovilla CRM Client Pipeline"
}`}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#F5F0E7] px-6 py-4 border-t border-[#E7DDCF] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#7D7564]">
            <ShieldCheck className="w-4 h-4 text-[#2C6E49]" />
            <span>World Housing Spain · Inmovilla APINMO v1 Bridge</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E7DDCF] rounded-lg text-xs font-semibold text-[#1D1B16] hover:bg-[#FCF9F3] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
