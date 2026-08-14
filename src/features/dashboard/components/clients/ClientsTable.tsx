import React from 'react';
import { ClientRow } from './ClientRow';
import type { Client } from '../../services/clientsService';

interface ClientsTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ clients, onEdit }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Nombre / Razón Social</th>
              <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Documento (RUC/DNI)</th>
              <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Contacto</th>
              <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Pedidos</th>
              <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Monto Total Invertido</th>
              <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider">Último Pedido</th>
              <th className="p-4 text-slate-600 font-bold text-xs uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientRow
                key={client.email}
                client={client}
                onEdit={onEdit}
              />
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500 font-semibold">
                  No se encontraron clientes en el directorio.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
