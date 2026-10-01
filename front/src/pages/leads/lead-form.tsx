import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { leadService } from "@/services/leadService"

interface Program {
  _id: string
  name: string
  description?: string
}

export interface LeadFormProps {
  lead?: any // si estamos editando
  programs: Program[]
  onSuccess: () => void
  onCancel: () => void
}

export function LeadForm({ lead, programs, onSuccess, onCancel }: LeadFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const initialData = {
    _id: lead?._id || "",
    first_name: lead?.first_name || "",
    last_name: lead?.last_name || "",
    email: lead?.email || "",
    mobile_phone: lead?.mobile_phone || "",
    interestProgram: lead?.interestProgram || ""
  }

  const [formData, setFormData] = useState(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleProgramChange = (val: string) => {
    setFormData({ ...formData, interestProgram: val })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.interestProgram) {
      setError("Por favor seleccione un Programa de Interés.")
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // Limpiamos el _id si está vacío para que MongoDB no falle al crear (CastError)
      const payload = { ...formData }
      if (!payload._id) {
        delete payload._id
      }

      const response = await leadService.upsert(payload)
      if (response && !response.error) {
        onSuccess()
      } else {
        setError(response.error || "Ocurrió un error al guardar el lead.")
      }
    } catch (err: any) {
      // Axios error objects hide the server response in err.response.data
      const serverError = err?.response?.data?.error || err?.response?.data?.message || err?.message;
      setError(serverError || "Error de conexión al servidor");
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">Nombre</Label>
          <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required minLength={2} placeholder="Juan" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Apellido</Label>
          <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required minLength={2} placeholder="Pérez" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="juan@ejemplo.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile_phone">Teléfono Móvil</Label>
        <Input id="mobile_phone" name="mobile_phone" type="tel" value={formData.mobile_phone} onChange={handleChange} required placeholder="300 123 4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interestProgram">Programa de Interés</Label>
        <Select value={formData.interestProgram} onValueChange={handleProgramChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un programa" />
          </SelectTrigger>
          <SelectContent>
            {programs.map((prog) => (
              <SelectItem key={prog._id} value={prog._id}>{prog.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
          {loading ? "Guardando..." : "Guardar Prospecto"}
        </Button>
      </div>
    </form>
  )
}
