import React, { useState, useEffect } from 'react';

import { supabase } from './Supabase';

const Exemplo1 = () => {

    /* 
    
        EXEMPLO 1:
        Este exemplo mostra como enviar dados do formulário utilizando o useState do React.
        Segundo a documentação do React, esta é a forma mais prática de se manipular
        formulários usando o próprio React.

        No input existe o onChange que irá alterar o useState de formUsuario toda vez
        que uma tecla for digitada. Dessa forma não é preciso criar um objeto de um
        usuário usando o document.querySelector, pois os dados já estão sendo inseridos
        de forma automática dentro do próprio useState. Basta passá-lo no comando
        de inseração e os dados já estão prontos.
    
    */

    // Guarda todos os usuários que serão trazidos do banco
    const [ usuarios, alteraUsuarios ] = useState([])
    
    /*
        Dados de manipulação do formulário 
    */
    // Cria uma base de usuário para que ele possa ter um padrão
    const usuarioBase = {
        nome: ""
    }
    // Cria o useState dos dados que serão inseridos no formulário
    const [ formUsuario, alteraFormUsuario ] = useState(usuarioBase);
    // Desmembra os dados do useState para não precisa escrever formUsuario.nome
    const { nome } = formUsuario;

     // Manipula o envio do formulário
     const enviaFormulario = ( e ) => {
        e.preventDefault();
        insere();
    }

    /* 
        Operações básicas da SUPERBASE: 
        busca, inserção e remoção
        https://supabase.com/docs/reference/javascript/select
    */
    const busca = async () => {

        const { data, error } = await supabase
        .from('usuarios')
        .select();

        alteraUsuarios(data);

    }

    const insere = async () => {

        const { data, error } = await supabase
        .from('usuarios')
        .insert( formUsuario )

        busca();
        alteraFormUsuario(usuarioBase);

    }
    
    const deleta = async ( id ) => {

        const { data, error } = await supabase
        .from('usuarios')
        .delete()
        .match({ id: id })

        busca();

    }

    // Busca todos os usuários cadastrados assim que inicia a aplicação
    useEffect( ()=> {
        busca();
    }, []);

    return ( 
        <div>
      
            <h1> React Superbase</h1>

            <h2> Cadastro de usuários </h2>
            
            <form onSubmit={ e => enviaFormulario(e) } >

                <label>
                    <input 
                        name="inputNome"
                        type="text"
                        value={ nome }
                        onChange={ e => alteraFormUsuario( {...formUsuario, nome: e.target.value} )}
                    />
                </label>

                <button type="submit" > Enviar </button>

            </form>

            <hr/>

            <h2> Usuários cadastrados </h2>
            {
                usuarios == 0 ? <p> Aguardando... </p>
                :
                <ul>
                    {
                        usuarios.map( u => 
                            <li> 
                                {u.nome} 
                                <button onClick={ ()=> deleta(u.id) } > Excluir </button> 
                            </li>
                        )
                    }
                </ul>
            }


        </div>
    );
}
 
export default Exemplo1;