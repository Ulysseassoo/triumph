import apiEntities from ".";
import { Piece } from "@/interfaces/PieceInterface";

export const getPieces = async () => {
  const response = await apiEntities.get<Piece[]>("/pieces");
  return response.data;
};

export const createPiece = async (data: Omit<Piece, "id">) => {
  const response = await apiEntities.post<Piece>("/pieces", data);
  return response.data;
};

export const deletePiece = async (id: string) => {
  await apiEntities.delete(`/pieces/${id}`);
};
