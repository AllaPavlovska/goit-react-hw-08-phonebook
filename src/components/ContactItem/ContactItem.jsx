import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLocation } from '../../redux/contacts/selectors';

import css from 'components/ContactItem/ContactItem.module.css';

export const ContactItem = ({
  contact: { id, name ,number  },
  onClickDelBtn,
}) => {
  const location = useSelector(selectLocation);

  return (
    <li className={css.item}>
      <Link to={`/${id}`} state={{ from: location }}>
        <span className={css.name}> {`${name} `}</span>
      </Link>
      <span className={css.phone}> {`☎ ${number}`}</span>
      <button className={css.button} type="button" onClick={onClickDelBtn}>
        ❌
      </button>
    </li>
  );
};
