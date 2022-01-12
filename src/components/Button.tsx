import { ButtonHTMLAttributes } from 'react'
//Esse ButtonHTMLAttributes  um helper do react que permite usar varias características do button
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {

    return (
        <button className="button" {...props} />
    )
}