import { useRef, useState, type DragEvent, type ChangeEvent } from "react"
import { ImagePlus, Loader2, X } from "lucide-react"
import { storageService } from "@/lib/api/storage.service"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"
import type { UploadPreset } from "@/lib/api/types"
import { getErrorMessage } from "@/lib/api/errors"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ImageDropzoneProps = {
  value?: string | null
  onUploaded: (url: string) => void
  onClear?: () => void
  uploadPreset: UploadPreset
  publicId: string
  displayName?: string
  disabled?: boolean
  className?: string
  variant?: "rect" | "avatar"
}

export function ImageDropzone({
  value,
  onUploaded,
  onClear,
  uploadPreset,
  publicId,
  displayName,
  disabled = false,
  className,
  variant = "rect",
}: ImageDropzoneProps) {
  const isAvatar = variant === "avatar"
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File | undefined) {
    if (!file || disabled || loading) return
    if (!file.type.startsWith("image/")) {
      setError("Envie apenas imagens")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const signature = await storageService.getCloudinarySignature({
        id: publicId,
        uploadPreset,
        displayName,
      })
      const result = await uploadToCloudinary(file, signature)
      onUploaded(result.secure_url)
    } catch (err) {
      setError(getErrorMessage(err, "Não foi possível enviar a imagem"))
    } finally {
      setLoading(false)
    }
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(false)
    void handleFile(event.dataTransfer.files?.[0])
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    void handleFile(event.target.files?.[0])
    event.target.value = ""
  }

  return (
    <div className={cn(isAvatar ? "flex flex-col items-start gap-3" : "space-y-2", className)}>
      <div
        role="button"
        tabIndex={0}
        aria-label={isAvatar ? "Alterar avatar" : "Enviar imagem"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
        }}
        onClick={() => !disabled && !loading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden border border-dashed border-border bg-muted/40 text-center transition-colors",
          isAvatar
            ? "size-28 rounded-full sm:size-32"
            : "min-h-40 flex-col rounded-[var(--cmr-radius)] px-4 py-6",
          dragging && "border-primary bg-accent/40",
          (disabled || loading) && "pointer-events-none opacity-60",
        )}
      >
        {value ? (
          <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : isAvatar ? (
          <ImagePlus className="size-8 text-muted-foreground" />
        ) : (
          <>
            <ImagePlus className="mb-2 size-8 text-muted-foreground" />
            <p className="text-sm font-medium">Arraste uma imagem ou clique para enviar</p>
            <p className="text-xs text-muted-foreground">PNG, JPG ou WEBP</p>
          </>
        )}

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : null}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
          disabled={disabled || loading}
        />
      </div>

      {value && onClear ? (
        <Button type="button" variant="outline" size="sm" onClick={onClear} disabled={disabled || loading}>
          <X className="size-4" />
          {isAvatar ? "Remover avatar" : "Remover imagem"}
        </Button>
      ) : null}

      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
