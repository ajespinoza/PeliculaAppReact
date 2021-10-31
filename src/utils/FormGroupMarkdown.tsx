import { Field, useFormikContext } from "formik";
import ReactMarkdown from 'react-markdown';
import './FormGroupMarkdown.css';

export default function FormGroupMarkdown(props: formGroupMarkdownProps){

     const {values} = useFormikContext<any>();

     return (
          <div className="form-group form-markdown">
               <div>
                    <label htmlFor={props.campo}>{props.label}</label>
                    <div>
                         <Field name={props.campo} className="form-textarea" as="textarea"></Field>
                    </div>
               </div>
               <div>
                    <label>{props.label} (preview):</label>
                    <div className="markdown-container">
                         <ReactMarkdown>{values[props.campo]}</ReactMarkdown>
                    </div>
               </div>
          </div>
     )
}

interface formGroupMarkdownProps{
     campo: string,
     label: string
}