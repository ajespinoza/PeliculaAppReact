import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Menu from './utils/Menu';
import rutas from './route-config';
import configurarValidaciones from './Validaciones';
import AutenticacionContext from './auth/AutenticacionContext';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.model';
import { obtenerClaims } from './auth/manejadorJWT';
import { configurarInterceptor } from './utils/Interceptores';

configurarValidaciones();
configurarInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims());
  },[])

  function actualizar(claims: claim[]){
    setClaims(claims);
  }

  function esAdmin(){
    return claims.findIndex(claim => claim.nombre === 'role' && claim.valor === 'admin') > -1;
  }
  
  return (
    <>
      <BrowserRouter>

        <AutenticacionContext.Provider value={{claims, actualizar}}>

          <Menu></Menu>

          <div className="container">      

            <Switch>

              { rutas.map( ruta => <Route key={ruta.path}
                                    path={ruta.path}
                                    exact={ruta.exact}>
                                      { ruta.esAdmin && ! esAdmin() ? <>
                                        No tiene permiso para acceder a este componente.
                                      </>
                                      : <ruta.componente></ruta.componente>}
                                    </Route>
                )}

            </Switch>

          </div>
        </AutenticacionContext.Provider>

      </BrowserRouter>
    </>
  );
}

export default App;
