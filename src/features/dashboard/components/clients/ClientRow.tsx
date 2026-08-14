import React from 'react';
import { Button } from '@heroui/react';

interface Client {
  name: string;
  email: string;
  phone: string;
  document: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

interface ClientRowProps {
  client: Client;
  onEdit: (client: Client) => void;
}

export const ClientRow: React.FC<ClientRowProps> = ({ client, onEdit }) => {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors">
      <td className="p-4">
        <span className="font-semibold text-slate-900 block">{client.name}</span>
      </td>
      <td className="p-4">
        <span className="text-xs font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-bold">
          {client.document || 'No registrado'}
        </span>
      </td>
      <td className="p-4">
        <div className="flex flex-col text-xs text-slate-650 space-y-0.5">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {client.email}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {client.phone}
          </span>
        </div>
      </td>
      <td className="p-4">
        <span className="text-slate-800 font-semibold bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-xs">
          {client.ordersCount}
        </span>
      </td>
      <td className="p-4">
        <span className="font-bold text-slate-900">S/. {client.totalSpent.toFixed(2)}</span>
      </td>
      <td className="p-4">
        <span className="text-xs text-slate-600">
          {client.lastOrderDate
            ? new Date(client.lastOrderDate).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
            : 'Sin pedidos'}
        </span>
      </td>
      <td className="p-4 text-right">
        <Button
          size="sm"
          className="font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg h-8 cursor-pointer px-3 transition-all"
          onClick={() => onEdit(client)}
        >
          Editar
        </Button>
      </td>
    </tr>
  );
};
