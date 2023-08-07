import './Circle.scss';

interface Props {
  number: string,
}

export function Circle({number}: Props) {

  return (
    <span className="circle"> 
      {number}
    </span>
  )
}