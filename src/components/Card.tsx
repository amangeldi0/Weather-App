import {FC} from "react";
import {ICardProps} from '../@types'
export const Card: FC<ICardProps> = ({time, date, temp, data, description}) => {
    const timeString: string = `
    ${date.getHours() < 10 ? 0 : ''}
    ${date.getHours()}:
    ${date.getMinutes() < 10 ? 0 : ''}
    ${date.getMinutes()}`;

    return (
        <div className='card'>
            <p>
                {date.toDateString().split(' ')[0]} {time ? timeString : ''}{' '}
                {(date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth()) +
                    '/' +
                    date.getDate()}
            </p>
            <h3>{data}</h3>
            <i className={`${temp && temp}`}>{temp}</i>
            <p>{description && description}</p>
        </div>
    );
};
