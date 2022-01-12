import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.scss';


export function NewRoom() {
    //Aqui eu to pegando as informaço do user logado, atravez da funço que criei  la no App.
    const { user } = useAuth();
    const history = useHistory();

    //Aqui eu to criando um estado para o input do codigo da sala.
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        //Aqui eu to setando la no firebase o a coluna room, pra armazenar as informaçes da sala.
        const roomRef = database.ref('rooms');

        //Aqui eu to pegando os dados do user logado, e tojogando dentro da sala, ja que ele é o dono da sala.
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
            authorName: user?.name,
        })

        setNewRoom('');

        //Aqui eu to redireciono o user para a sala criada, usando o id dela.
        history.push(`/rooms/${firebaseRoom.key}`);

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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            //Aqui eu o atualizando o valor do estado.
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}