import { useFormikContext } from "formik";
import { coordenadaDTO } from "./coordenadas.model";
import Mapa from "./Mapa";

export default function MapaFormulario(props: mapaFormularioProps){

     const {values} = useFormikContext<any>();

     function actualizarCampos(coordendas: coordenadaDTO){
          values[props.campoLat] = coordendas.lat;
          values[props.campoLng] = coordendas.lng;     
     }     

     return (
          <Mapa
               coordenadas= {props.coordenadas}
               manejarClickMapa = {actualizarCampos}
          />
     )
}

interface mapaFormularioProps{
     coordenadas: coordenadaDTO[],
     campoLat: string,
     campoLng: string
}

MapaFormulario.defaultProps = {
     coordenadas: []
}