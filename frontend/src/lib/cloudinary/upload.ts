import type { CloudinarySignature } from "@/lib/api/types"

type CloudinaryUploadResult = {
  secure_url: string
  public_id: string
}

export async function uploadToCloudinary(
  file: File,
  signature: CloudinarySignature,
): Promise<CloudinaryUploadResult> {
  const form = new FormData()
  form.append("file", file)
  form.append("api_key", signature.api_key)
  form.append("timestamp", String(signature.timestamp))
  form.append("signature", signature.signature)
  form.append("public_id", signature.public_id)
  form.append("upload_preset", signature.upload_preset)
  if (signature.display_name) {
    form.append("display_name", signature.display_name)
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signature.cloud_name}/image/upload`,
    { method: "POST", body: form },
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || "Falha no upload para o Cloudinary")
  }

  return response.json() as Promise<CloudinaryUploadResult>
}
