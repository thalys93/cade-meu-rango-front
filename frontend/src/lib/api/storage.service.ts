import { api } from "@/lib/api/client"
import type { CloudinarySignature, UploadPreset } from "@/lib/api/types"

export type SignatureParams = {
  id: string
  uploadPreset: UploadPreset
  displayName?: string
}

export const storageService = {
  async getCloudinarySignature(
    params: SignatureParams,
  ): Promise<CloudinarySignature> {
    const { data } = await api.get<CloudinarySignature>(
      "/storage/cloudinary-signature",
      {
        params: {
          id: params.id,
          uploadPreset: params.uploadPreset,
          displayName: params.displayName,
        },
      },
    )
    return data
  },
}
