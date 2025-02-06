import { useEffect } from 'react';
import { TypeCell } from '@/globals';
import { getMatches } from '@/utils';
import VisuallyHidden from '../VisuallyHidden';
import styles from './Cell.module.css';

type CellProps = {
  id: string;
  isActive: boolean;
  updateCellsState: (id: string, matches?: string[]) => void;
  pieces: string[];
  previous: TypeCell | undefined;
};

function Cell({ id, isActive, updateCellsState, pieces, previous }: CellProps) {
  // console.log('RENDER: Cell Component');

  useEffect(() => {
    // watch pieces - if length is reduced, show message
    // show message by injecting text, not w/ state
    // setShowMessage(true);
    // const timerId = setTimeout(() => {
    //   setShowMessage(false);
    // }, 2500);
    // return () => {
    //   clearTimeout(timerId);
    //   setShowMessage(false);
    // };
  }, []);

  function handleClick() {
    // do nothing if same cell is clicked twice
    if (isActive) {
      return;
    }

    // only one cell has been clicked, comparison can't be run
    if (!previous) {
      updateCellsState(id);
      return;
    }

    const matches = getMatches(previous.pieces, pieces);
    // console.log(
    //   `COMPARING: Previous (${previous.pieces.join(', ')}) and Active (${pieces.join(', ')})`,
    // );
    // console.log(`Matches: ${matches.join(', ')}`);

    if (matches.length === 0) {
      // TODO: trigger "no match" message
    }

    updateCellsState(id, matches);
  }

  return (
    <div
      id={id}
      className={styles.cell}
      data-status={isActive ? 'active' : 'default'}
      data-pieces={pieces.length}
    >
      <div className={styles.message}>{/* <p>no match</p> */}</div>
      <button className={styles.btn} onClick={handleClick}>
        <VisuallyHidden>
          {`Select cell with pieces ${pieces.join(', ')}`}
        </VisuallyHidden>
      </button>
      <div className={styles.pieces}>
        {pieces.map((item) => (
          <div key={item} id={item} data-piece={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cell;
