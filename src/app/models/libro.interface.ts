export interface Libro {
  id?: number;
  titulo: string;
  autor?: string;
  categoria?: string;
  isbn: string;
  editorial: string;
  categoriaId: number;
  autorId: number;
}

export interface LibroResponse {
  success: boolean;
  data?: Libro | Libro[];
  count?: number;
  message?: string;
  error?: string;
}

//? - para evitar errores cuando sale null
