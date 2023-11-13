// Interface da Dica
export interface TipModel {
    UUID: string;
    title: string;
    description: string;
    authorUUID: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}