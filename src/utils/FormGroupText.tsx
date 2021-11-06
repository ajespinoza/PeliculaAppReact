import { ErrorMessage, Field } from "formik";
import MostrarErrorCampo from "./MostrarErrorCampo";

export default function FormGroupText(props: formGroupTextProps){

     return (

          <div className="form-group">
               {props.label ? <label htmlFor={props.campo}>{props.label}</label> : null}
               <Field type={props.type} name={props.campo} className="form-control" placeholder={props.placeholder}></Field>
               <ErrorMessage name={props.campo}>{mensaje =>
                    <MostrarErrorCampo mensaje={mensaje}/>
               }</ErrorMessage>
          </div>
     )
}

interface formGroupTextProps{
     campo: string;
     label?: string;
     placeholder?: string;
     type: 'text' | 'password';
}

FormGroupText.defaultProps = {
     type: 'text'
}