import { useState, useEffect, useMemo } from "react"
import { leadService } from "@/services/leadService"
import { useToast } from "@/components/hooks/use-toast"

export function useLeads() {
  const [leads, setLeads] = useState<any[]>([])
  const [programs, setPrograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<any>(null)

  const { toast } = useToast()

  const fetchData = async () => {
    setLoading(true)
    try {
      const [leadsRes, programsRes] = await Promise.all([
        leadService.list(),
        leadService.getPrograms()
      ])
      
      if (leadsRes && !leadsRes.error) setLeads(leadsRes.list || [])
      if (programsRes && !programsRes.error) setPrograms(programsRes.list || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpenModal = (lead = null) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedLead(null)
  }

  const handleSuccess = () => {
    handleCloseModal()
    fetchData()
    toast({
      title: "¡Éxito!",
      description: selectedLead ? "El prospecto ha sido actualizado correctamente." : "El prospecto ha sido registrado correctamente.",
    })
  }

  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;
    const lowerSearch = searchTerm.toLowerCase();
    return leads.filter(lead => 
      lead.full_name?.toLowerCase().includes(lowerSearch) ||
      lead.email?.toLowerCase().includes(lowerSearch) ||
      lead.incremental?.toString().includes(lowerSearch)
    );
  }, [leads, searchTerm])

  return {
    leads: filteredLeads,
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
  }
}
