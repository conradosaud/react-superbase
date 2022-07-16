import React, { useState, useEffect } from 'react';

import { supabase } from './Supabase';

const Exemplo2 = () => {

    
    /* 
    
        EXEMPLO 2:
        Este exemplo mostra uma forma mais simples de trabalhar com formulários.
        Ele também torna o código mais curto e limpo.
        O maior problema desse exemplo, é que ele não aproveita as funcionalidades
        que o React tem a oferecer. Além disso, essa forma pode ser mais trabalhosa
        de se utilizar para formulários maiores.

        Ao ser submetido um formulário, a função Insere irá criar um objeto com todas
        as informações que existem para serem inseridas no banco. Para criar esse
        objeto é necessário buscar cada um dos valores do input, para fazer isso
        pode ser usado os comando document.querySelector
    
    */

    // Guarda todos os usuários que serão trazidos do banco
    const [ usuarios, alteraUsuarios ] = useState([])
    
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

    const insere = async ( usuario ) => {

        const { data, error } = await supabase
        .from('usuarios')
        .insert( usuario )

        busca();

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

    // Manipula o envio do formulário
    const enviaFormulario = ( e ) => {
        e.preventDefault();

        const usuario = {
            nome: document.querySelector("input[name='inputNome']").value
        }

        insere( usuario );
    }

    return ( 
        <div>
      
            <h1> React Superbase</h1>

            <h2> Cadastro de usuários </h2>
            
            <form onSubmit={ e => enviaFormulario(e) } >

                <label>
                    <input 
                        name="inputNome"
                        type="text"
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
 
export default Exemplo2;