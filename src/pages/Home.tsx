import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [rooCode, setRoomCode] = useState('');

    //Função de login  com o Google e navegação.
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        //Aqui eu verifico se esta vazio.
        if (rooCode.trim() === '') {
            return;
        }

        //Aqui estou verificando se a sala que ele quer entrar existe
        const rooRef = await database.ref(`rooms/${rooCode}`).get();
        //Aqui estou verificando se a sala que ele quer entrar existe
        if (!rooRef.exists()) {
            alert('Sala não encontrada');
            return;
        }

        //Caso ela exista.
        history.push(`/rooms/${rooCode}`);
    }


    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Criar sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={rooCode}
                        />
                        <Button type="submit">
                            Entrar
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}