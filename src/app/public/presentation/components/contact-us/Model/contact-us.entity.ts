export class ContactUs {
  id?: number;
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
  archivos?: string[];

  constructor(data: {
    id?: number,
    nombre: string,
    correo: string,
    asunto: string,
    mensaje: string,
    archivos?: string[]
  }) {
    this.id = data.id;
    this.nombre = data.nombre;
    this.correo = data.correo;
    this.asunto = data.asunto;
    this.mensaje = data.mensaje;
    this.archivos = data.archivos || [];
  }
}