import { createContext, ReactNode, useEffect, useState } from 'react'
import { auth, firebase } from '../services/firebase';

//Aqui eu to fazendo a tipagem do user.
type User = {
    id: string;
    name: string;
    avatar: string;
}

//Aqui eu to fazendo a tipagem do AuthContextType.
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProvaiderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProvaiderProps) {

    const [user, setUser] = useState<User>();


    //Aqui eu uso o useEffect, pra ficar verifiando se o user ja tinha feito o login, e pra quando ele der o F5 no perder a referencia dele.
    useEffect(() => {
        //Aqui eu um eventlist do React.
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;
                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.');
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        //Aqui e uma boa pratica que acompanha o eventlist, pois e uma obrigaçao sai dele, pra nao ficar em luppinf infinito.
        return () => {
            unsubscribe();
        }

    }, [])

    async function signInWithGoogle() {
        //Função de login  com o Google e navegação, estou fazendo aqui na App, pois assim, todas as paginas vai pedir ou verificar se o user esta logado(Melhor que ser em cada pagina)
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider)

        //Aqui eu faço uma verificaçao dentro do retorno da api do google.
        if (result.user) {
            //Aqui eu to pegando os tres atributos que a api me retorna (displayName, photoURL, uid), e jogo dentro de uma variavel.
            const { displayName, photoURL, uid } = result.user;
            //Aqui eu verifico de o user tem o displayName e o photoURL, porque caso no tiver eu dou um error.
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );

}