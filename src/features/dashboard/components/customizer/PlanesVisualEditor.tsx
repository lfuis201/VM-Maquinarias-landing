import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { FloppyDisk } from '@gravity-ui/icons';
import type { LandingPlan } from '../../../landing/types/landingPlan';

interface PlanesVisualEditorProps {
  plans: LandingPlan[];
  onSavePlan: (plan: LandingPlan) => void;
  onCreatePlan: (plan: Partial<LandingPlan>) => void;
  onDeletePlan: (id: number) => void;
  isLoading: boolean;
}

export const PlanesVisualEditor: React.FC<PlanesVisualEditorProps> = ({
  plans,
  onSavePlan,
  onCreatePlan,
  onDeletePlan,
}) => {
  const [localPlans, setLocalPlans] = useState<LandingPlan[]>(plans);
  const [editingFeatures, setEditingFeatures] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    setLocalPlans(plans);
  }, [plans]);

  const handleFieldChange = (idx: number, field: keyof LandingPlan, value: any) => {
    setLocalPlans(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleFeatureChange = (planIdx: number, featureIdx: number, value: string) => {
    setLocalPlans(prev => {
      const updated = [...prev];
      const features = [...(updated[planIdx].features || [])];
      features[featureIdx] = value;
      updated[planIdx] = { ...updated[planIdx], features };
      return updated;
    });
  };

  const handleAddFeature = (planIdx: number) => {
    setLocalPlans(prev => {
      const updated = [...prev];
      const features = [...(updated[planIdx].features || []), 'Nueva característica'];
      updated[planIdx] = { ...updated[planIdx], features };
      return updated;
    });
  };

  const handleRemoveFeature = (planIdx: number, featureIdx: number) => {
    setLocalPlans(prev => {
      const updated = [...prev];
      const features = updated[planIdx].features.filter((_, i) => i !== featureIdx);
      updated[planIdx] = { ...updated[planIdx], features };
      return updated;
    });
  };

  const handleSaveSingle = (plan: LandingPlan) => {
    onSavePlan(plan);
  };

  const handleAddNewPlan = () => {
    onCreatePlan({
      name: 'Nuevo Plan',
      description: 'Descripción del plan',
      priceMensual: 0,
      priceAnual: 0,
      features: ['Característica 1', 'Característica 2'],
      cta: 'Comenzar',
      popular: false,
      color: 'slate',
      sortOrder: localPlans.length,
      isActive: true,
    });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Editor Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-emerald-900">Editor Visual — Planes y Precios</h4>
          <p className="text-xs text-emerald-600/80 mt-0.5">Edita nombre, descripción, precios y características de cada plan directamente. Guarda cada plan individualmente.</p>
        </div>
        <Button
          type="button"
          onPress={handleAddNewPlan}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 h-9 rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Agregar Plan
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {localPlans.map((plan, idx) => (
          <div
            key={plan.id || idx}
            className={`bg-white rounded-3xl border-2 p-6 flex flex-col justify-between relative transition-all ${
              plan.popular ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' : 'border-slate-200 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Plan Header Badge */}
            <div className="absolute -top-3 left-4 flex items-center gap-2">
              <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-md">
                Plan #{idx + 1}
              </span>
              {plan.popular && (
                <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md">
                  ⭐ POPULAR
                </span>
              )}
            </div>

            <div className="space-y-4 pt-2">
              {/* Plan Name */}
              <div className="relative group border border-dashed border-slate-200 hover:border-emerald-500 focus-within:border-emerald-600 rounded-lg p-2 transition-all">
                <input
                  type="text"
                  value={plan.name || ''}
                  onChange={(e) => handleFieldChange(idx, 'name', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-lg font-bold text-slate-900"
                  placeholder="Nombre del plan"
                />
                <div className="absolute -top-2 right-2 bg-emerald-600 text-white text-[8px] font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Nombre
                </div>
              </div>

              {/* Description */}
              <div className="relative group border border-dashed border-slate-200 hover:border-emerald-500 focus-within:border-emerald-600 rounded-lg p-2 transition-all">
                <textarea
                  value={plan.description || ''}
                  onChange={(e) => handleFieldChange(idx, 'description', e.target.value)}
                  rows={2}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs text-slate-500 leading-relaxed resize-none"
                  placeholder="Descripción del plan"
                />
                <div className="absolute -top-2 right-2 bg-emerald-600 text-white text-[8px] font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Descripción
                </div>
              </div>

              {/* Prices Row */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100">
                <div className="relative group border border-dashed border-slate-200 hover:border-blue-500 focus-within:border-blue-600 rounded-lg p-2 transition-all text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Mensual</div>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-sm font-bold text-slate-600">S/</span>
                    <input
                      type="number"
                      value={plan.priceMensual ?? 0}
                      onChange={(e) => handleFieldChange(idx, 'priceMensual', parseFloat(e.target.value) || 0)}
                      className="w-20 bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-2xl font-black text-slate-900 text-center"
                    />
                  </div>
                </div>
                <div className="relative group border border-dashed border-slate-200 hover:border-blue-500 focus-within:border-blue-600 rounded-lg p-2 transition-all text-center">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Anual</div>
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="text-sm font-bold text-slate-600">S/</span>
                    <input
                      type="number"
                      value={plan.priceAnual ?? 0}
                      onChange={(e) => handleFieldChange(idx, 'priceAnual', parseFloat(e.target.value) || 0)}
                      className="w-20 bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-2xl font-black text-slate-900 text-center"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Text */}
              <div className="relative group border border-dashed border-slate-200 hover:border-emerald-500 focus-within:border-emerald-600 rounded-lg p-2 transition-all">
                <input
                  type="text"
                  value={plan.cta || ''}
                  onChange={(e) => handleFieldChange(idx, 'cta', e.target.value)}
                  className="w-full bg-transparent border-none p-0 focus:outline-none focus:ring-0 text-xs font-bold text-emerald-700"
                  placeholder="Texto del botón CTA"
                />
                <div className="absolute -top-2 right-2 bg-emerald-600 text-white text-[8px] font-bold px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Botón CTA
                </div>
              </div>

              {/* Toggles Row */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plan.popular || false}
                    onChange={(e) => handleFieldChange(idx, 'popular', e.target.checked)}
                    className="w-3.5 h-3.5 rounded accent-emerald-600"
                  />
                  <span className="text-[10px] font-bold text-slate-600">Popular</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plan.isActive !== false}
                    onChange={(e) => handleFieldChange(idx, 'isActive', e.target.checked)}
                    className="w-3.5 h-3.5 rounded accent-emerald-600"
                  />
                  <span className="text-[10px] font-bold text-slate-600">Activo</span>
                </label>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Características</span>
                  <button
                    type="button"
                    onClick={() => setEditingFeatures(prev => ({ ...prev, [idx]: !prev[idx] }))}
                    className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                  >
                    {editingFeatures[idx] ? 'Listo' : 'Editar'}
                  </button>
                </div>

                {editingFeatures[idx] ? (
                  <div className="space-y-1.5">
                    {(plan.features || []).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleFeatureChange(idx, fIdx, e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-lg px-2 py-1 text-[11px] text-slate-700 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx, fIdx)}
                          className="w-5 h-5 rounded bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center text-xs font-bold cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddFeature(idx)}
                      className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center gap-1"
                    >
                      <span>+</span> Agregar característica
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {(plan.features || []).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                        <svg className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Plan Actions */}
            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100">
              <Button
                type="button"
                onPress={() => handleSaveSingle(localPlans[idx])}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-9 rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FloppyDisk className="w-3.5 h-3.5" />
                Guardar
              </Button>
              {plan.id && (
                <Button
                  type="button"
                  onPress={() => plan.id && onDeletePlan(plan.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs h-9 px-3 rounded-xl cursor-pointer"
                >
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
