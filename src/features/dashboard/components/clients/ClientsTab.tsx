import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientsTable } from './ClientsTable';
import { ClientFormModal } from './ClientFormModal';
import { ClientsService } from '../../services/clientsService';
import type { Client } from '../../services/clientsService';

const mockClients: Client[] = [
  {
    name: 'Roberto Carlos Alva',
    email: 'roberto.alva@outlook.com',
    phone: '984512304',
    document: '10458796531',
    ordersCount: 1,
    totalSpent: 775.00,
    lastOrderDate: '2026-06-03T10:15:30Z',
  },
  {
    name: 'Sofía Maribel Condori',
    email: 'sofia.condori@gmail.com',
    phone: '913129204',
    document: '47589632',
    ordersCount: 1,
    totalSpent: 350.00,
    lastOrderDate: '2026-06-04T08:24:00Z',
  },
  {
    name: 'Gaston Acurio S.A.C.',
    email: 'compras@acuriorestaurantes.pe',
    phone: '998451236',
    document: '20556214789',
    ordersCount: 1,
    totalSpent: 1065.00,
    lastOrderDate: '2026-06-04T15:45:10Z',
  },
  {
    name: 'Alejandra Romero Díaz',
    email: 'alejandra.romero@hotmail.com',
    phone: '951478962',
    document: '71452896',
    ordersCount: 1,
    totalSpent: 290.00,
    lastOrderDate: '2026-06-02T14:30:00Z',
  },
  {
    name: 'Carlos Humberto Torres',
    email: 'carlos.torres@corporacion.pe',
    phone: '922448811',
    document: '09876543',
    ordersCount: 1,
    totalSpent: 0.00,
    lastOrderDate: '2025-05-28T09:12:00Z',
  }
];

export const ClientsTab: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Fetch clients from backend
  const { data: clientsData, isLoading, error: fetchError } = useQuery({
    queryKey: ['clients'],
    queryFn: ClientsService.getClients,
    retry: 1,
  });

  // Fallback to mock data if backend fails/is offline
  const clients = clientsData || (fetchError ? mockClients : []);

  // Create Client Mutation
  const createMutation = useMutation({
    mutationFn: ClientsService.createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsModalOpen(false);
      setSelectedClient(null);
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || 'Error al registrar el cliente';
      alert(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  });

  // Update Client Mutation
  const updateMutation = useMutation({
    mutationFn: ({ email, data }: { email: string; data: { name: string; phone: string } }) =>
      ClientsService.updateClient(email, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsModalOpen(false);
      setSelectedClient(null);
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || err.message || 'Error al actualizar el cliente';
      alert(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  });

  const handleFormSubmit = (clientData: {
    originalEmail?: string;
    name: string;
    email: string;
    phone: string;
    document: string;
  }) => {
    if (clientData.originalEmail) {
      updateMutation.mutate({
        email: clientData.originalEmail,
        data: { name: clientData.name, phone: clientData.phone }
      });
    } else {
      createMutation.mutate({
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        document: clientData.document,
      });
    }
  };

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };

  // Filtered Clients
  const filteredClients = clients.filter(client => {
    return (
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.document.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6 text-left animate-fade-in">
      {/* Title & Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Directorio de Clientes</h2>
          <p className="text-xs text-slate-500">Administra la base de datos de compradores, empresas registradas y el volumen de compras acumuladas.</p>
        </div>
        <div>
          <Button
            size="sm"
            onClick={handleCreateClick}
            className="font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-10 px-4 cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Registrar Cliente
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre, correo, RUC o celular..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-slate-900 text-xs outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <span className="flex items-center gap-2 font-bold text-sm text-slate-650">
            <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando directorio de clientes...
          </span>
        </div>
      ) : (
        /* Clients List Table */
        <ClientsTable
          clients={filteredClients}
          onEdit={handleEditClick}
        />
      )}

      {/* Creation and Edit Client Modal */}
      <ClientFormModal
        client={selectedClient}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClient(null);
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
