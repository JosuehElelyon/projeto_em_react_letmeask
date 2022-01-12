import { ButtonHTMLAttributes } from 'react'
//Esse ButtonHTMLAttributes  um helper do react que permite usar varias características do button
import '../styles/button.scss'

//Aqui eu to atribuindo ao ButtonProps, todas as propiedades do ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {

    return (
        //Aqui usando o {...props}, estou usando o expred operation , que quer dizer usar todas as propriedades do ButtonProps.
        <button className="button" {...props} />
    )
}