import { app } from "@/atoms/kuepa"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LeadForm } from "./lead-form"
import { LeadTable } from "./lead-table"
import { useLeads } from "./use-leads"
import { PlusCircle, Search } from "lucide-react"

export interface LeadsProps {}

export default function Leads (props?: LeadsProps) {
  const {
    leads,
    programs,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    selectedLead,
    handleOpenModal,
    handleCloseModal,
    handleSuccess
  } = useLeads();

  useEffect(() => {
    app.set({
      ...(app.get() || {}),
      app: 'kuepa',
      module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb:[
        { title: 'Leads', url: '/leads' }
      ]
    })
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-900">Prospectos (Leads)</h1>
          <p className="text-gray-500 mt-1">Gestiona los interesados en programas académicos.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg transition-all">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Lead
        </Button>
      </div>

      <Card className="border-purple-100 shadow-md">
        <CardHeader className="bg-white border-b border-purple-50 pb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Buscar por nombre, correo o número..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-purple-100 focus-visible:ring-purple-500"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <LeadTable 
            leads={leads} 
            loading={loading} 
            searchTerm={searchTerm} 
            onEditLead={handleOpenModal} 
          />
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-purple-900">
              {selectedLead ? 'Editar Prospecto' : 'Nuevo Prospecto'}
            </DialogTitle>
            <DialogDescription className="hidden">
              Formulario para {selectedLead ? 'editar' : 'crear'} un prospecto.
            </DialogDescription>
          </DialogHeader>
          <LeadForm 
            lead={selectedLead} 
            programs={programs} 
            onSuccess={handleSuccess} 
            onCancel={handleCloseModal} 
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}