import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { urlCines } from "../utils/endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import { cineCreacionDTO } from "./cines.model";
import FormularioCines from "./FormularioCines";

export default function CrearCines(){

     const history = useHistory();
     const [errores, setErrores] = useState<string[]>([]);

     async function crear(cine: cineCreacionDTO){
          try{
               await axios.post(urlCines, cine);
               history.push("/cines");
          }catch(error: any){
               setErrores(error.response.data);
          }
     }

     return (
          <>
               <h3>Crear Cine</h3>
               <MostrarErrores errores={errores}></MostrarErrores>
               <FormularioCines
                    modelo={{nombre: ''}}
                    onSubmit={async (valores) => await crear(valores)}
               ></FormularioCines>
          </>
     )
}