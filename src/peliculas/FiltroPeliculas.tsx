import axios, { AxiosResponse } from "axios"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router"
import { generoDTO } from "../generos/generos.model"
import Button from "../utils/Button"
import { urlGeneros, urlPeliculas } from "../utils/endpoints"
import Paginacion from "../utils/Paginacion"
import ListadoPeliculas from "./ListadoPeliculas"
import { peliculaDTO } from "./peliculas.model"

export default function FiltroPeliculas(){

     const valorInicial: filtroPeliculasForm = {
          titulo: '',
          generoId: 0,
          proximosEstrenos: false,
          enCines: false,
          pagina: 1,
          recordsPorPagina: 1,
     }
     const [generos, setGeneros] = useState<generoDTO[]>([]);
     const [peliculas, setPeliculas] = useState<peliculaDTO[]>([]);
     const [totalDePaginas, setTotalDePaginas] = useState(0);
     const history = useHistory();
     const query = new URLSearchParams(useLocation().search);

     useEffect(() => {
          axios.get(`${urlGeneros}/todos`)
               .then((respuesta: AxiosResponse<generoDTO[]>) => {
                    setGeneros(respuesta.data);
               })
     },[]);

     useEffect(() => {
          if(query.get('titulo')){
               valorInicial.titulo = query.get('titulo')!;
          }
          if(query.get('generoId')){
               valorInicial.generoId = parseInt(query.get('generoId')!,10);
          }
          if(query.get('proximosEstrenos')){
               valorInicial.proximosEstrenos = true;
          }
          if(query.get('enCines')){
               valorInicial.enCines = true;
          }
          if(query.get('pagina')){
               valorInicial.pagina = parseInt(query.get('pagina')!, 10);
          }

          buscarPeliculas(valorInicial);
     },[])

     function buscarPeliculas(valores: filtroPeliculasForm){
          modificarURL(valores);
          axios.get(`${urlPeliculas}/filtrar`, {params: valores})
               .then((respuesta: AxiosResponse<peliculaDTO[]>) => {
                    const totalDeRegistros = parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                    setTotalDePaginas(Math.ceil(totalDeRegistros/valorInicial.recordsPorPagina));
                    setPeliculas(respuesta.data);
               });
     }

     function modificarURL(valores: filtroPeliculasForm){
          const queryStrings: string[] = [];
          if(valores.titulo){
               queryStrings.push(`titulo=${valores.titulo}`);
          }
          if(valores.generoId !== 0){
               queryStrings.push(`generoId=${valores.generoId}`);
          }
          if(valores.proximosEstrenos){
               queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`);
          }
          if(valores.enCines){
               queryStrings.push(`enCines=${valores.enCines}`);
          }
          queryStrings.push(`pagina=${valores.pagina}`);
          history.push(`/peliculas/filtrar?${queryStrings.join('&')}`);
     }

     return (
          <>
               <h3>Filtro peliculas</h3>

               <Formik initialValues={valorInicial}
                       onSubmit={valores => {
                            valores.pagina = 1;
                            buscarPeliculas(valores);
                         }}
               >
                    {(formikProps) => (
                         <>
                              <Form>
                                   <div className="form-inline">
                                        <div className="form group mb-2">
                                             <label htmlFor="titulo" className="sr-only">Titulo</label>
                                             <input type="text"
                                                  className="form-control" id="titulo"
                                                  placeholder="Titulo de la pelicula"
                                                  {...formikProps.getFieldProps('titulo')}
                                             ></input>
                                        </div>    
                                        <div className="form-group mx-sm-3 mb-2">
                                             <select className="form-control"
                                                  {...formikProps.getFieldProps('generoId')}
                                             >
                                                  <option value="0">--Seleccione una genero--</option>
                                                  {generos.map(genero => <option key={genero.id} value={genero.id}>{genero.nombre}</option>)}
                                             </select>
                                        </div>
                                        <div className="form-group mx-sm-3 mb-2">
                                             <Field className="form-check-input" id="proximosEstrenos"
                                             name="proximosEstrenos" type="checkbox"></Field>
                                             <label className="form-check-label" htmlFor="proximosEstrenos">Próximos estrenos</label>
                                        </div>
                                        <div className="form-group mx-sm-3 mb-2">
                                             <Field className="form-check-input" id="enCines"
                                             name="enCines" type="checkbox"></Field>
                                             <label className="form-check-label" htmlFor="enCines">En cines</label>
                                        </div>

                                        <Button
                                             className="btn btn-primary mb-2 mx-sm-3"
                                             onClick={() => formikProps.submitForm()}
                                        >
                                             Filtrar
                                        </Button>

                                        <Button
                                             className="btn btn-danger mb-2"
                                             onClick={() => {
                                                  formikProps.setValues(valorInicial)
                                                  buscarPeliculas(valorInicial);
                                             }}
                                        >Limpiar</Button>
                                   </div> 
                              </Form>

                              <ListadoPeliculas peliculas = {peliculas}></ListadoPeliculas>
                              <Paginacion cantidadTotalDePaginas={totalDePaginas}
                                   paginaActual={formikProps.values.pagina} onChange={nuevaPagina => {
                                        formikProps.values.pagina = nuevaPagina;
                                        buscarPeliculas(formikProps.values)
                                   }}></Paginacion>
                         </>
                    )}
               </Formik>
               
          </>
     )
}

interface filtroPeliculasForm{
     titulo: string;
     generoId: number;
     proximosEstrenos: boolean;
     enCines: boolean;
     pagina: number;
     recordsPorPagina: number;
}