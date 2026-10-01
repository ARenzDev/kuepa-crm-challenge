import { Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export interface LeadTableProps {
  leads: any[];
  loading: boolean;
  searchTerm: string;
  onEditLead: (lead: any) => void;
}

export function LeadTable({ leads, loading, searchTerm, onEditLead }: LeadTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="bg-purple-50/50">
        <TableRow>
          <TableHead className="w-[80px]">Número</TableHead>
          <TableHead>Nombre Completo</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center h-24 text-gray-500">
              {searchTerm 
                ? "No se encontraron prospectos que coincidan con tu búsqueda." 
                : "No hay prospectos registrados. Haz clic en 'Nuevo Lead' para comenzar."}
            </TableCell>
          </TableRow>
        ) : (
          leads.map((lead) => (
            <TableRow key={lead._id} className="hover:bg-purple-50/40 transition-colors cursor-pointer" onClick={() => onEditLead(lead)}>
              <TableCell className="font-medium text-gray-500">#{lead.incremental}</TableCell>
              <TableCell className="font-semibold text-gray-900">{lead.full_name}</TableCell>
              <TableCell className="text-gray-600">{lead.email}</TableCell>
              <TableCell className="text-gray-600">{lead.mobile_phone}</TableCell>
              <TableCell>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                  lead.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                }`}>
                  {lead.status === 'active' ? 'Activo' : lead.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onEditLead(lead); }} className="text-purple-600 hover:text-purple-800 hover:bg-purple-100">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
