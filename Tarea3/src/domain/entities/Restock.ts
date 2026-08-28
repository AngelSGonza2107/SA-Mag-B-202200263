export interface RestockItem {
  productoId: string;
  cantidad: number;
  existenciasAnteriores: number;
  existenciasNuevas: number;
}

export interface Restock {
  id: string;
  items: RestockItem[];
  fecha: string;
}
