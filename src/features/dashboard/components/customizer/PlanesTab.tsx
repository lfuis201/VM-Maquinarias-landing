import React from 'react';
import { toast } from '@heroui/react';
import { PlanesVisualEditor } from './PlanesVisualEditor';
import { useLandingPlansQuery, useCreatePlanMutation, useUpdatePlanMutation, useDeletePlanMutation } from '../../../landing/hooks/useLandingPlans';
import type { LandingPlan } from '../../../landing/types/landingPlan';

export const PlanesTab: React.FC = () => {
  const { data: plans, isLoading: isQuerying } = useLandingPlansQuery();
  const createMutation = useCreatePlanMutation();
  const updateMutation = useUpdatePlanMutation();
  const deleteMutation = useDeletePlanMutation();

  const isLoading = isQuerying || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  if (!plans) {
    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
          <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin relative z-10"></div>
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Cargando Planes</h3>
          <p className="text-xs text-slate-500 font-medium">Obteniendo los planes desde el servidor...</p>
        </div>
      </div>
    );
  }

  const handleSavePlan = async (plan: LandingPlan) => {
    try {
      if (plan.id) {
        const { id, createdAt, updatedAt, ...data } = plan as any;
        await updateMutation.mutateAsync({ id: plan.id, data });
        toast.success(`Plan "${plan.name}" actualizado correctamente.`);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al guardar.';
      toast.danger(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleCreatePlan = async (plan: Partial<LandingPlan>) => {
    try {
      await createMutation.mutateAsync(plan);
      toast.success('Nuevo plan creado correctamente.');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al crear.';
      toast.danger(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleDeletePlan = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este plan? Esta acción no se puede deshacer.')) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Plan eliminado correctamente.');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Error al eliminar.';
      toast.danger(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  return (
    <PlanesVisualEditor
      plans={plans}
      onSavePlan={handleSavePlan}
      onCreatePlan={handleCreatePlan}
      onDeletePlan={handleDeletePlan}
      isLoading={isLoading}
    />
  );
};
