import './Button.scss';

interface Props {
  name: string,
  handlerClick: () => void,
  type: string | undefined
}

export function Button({name, handlerClick, type}: Props) {

  return (
    <button className={type}
    aria-label={name}
    onClick={handlerClick}>
    {name}
  </button>
  )
}