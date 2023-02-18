import '../App.css'

function Board(props) {
  return (
    <div class='result'>
      <div class='round'>
        <p>Round {props.round}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>HP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>You</th>
            <th>1</th>
            <th>{parseInt(props.attack[7])}</th>
          </tr>
          <tr>
            <th>Dragon</th>
            <th>4</th>
            <th>{parseInt(props.attack[8])}</th>
          </tr>
        </tbody>
      </table>
      {/* critical/good success X cutting damage.  failure   */}
      <div class='desc'>
        <p>
          <span class='hero'>You</span> attack{' '}
          <span class='monster'>Dragon</span>,{' '}
          {parseInt(props.attack[11]) === 1 ? (
            <span>
              {parseInt(props.attack[11]) === 20
                ? 'critical success'
                : 'good success'}{' '}
              <span class='damage'>
                {parseInt(props.attack[11]) === 20
                  ? parseInt(props.attack[9]) * 10
                  : parseInt(props.attack[9]) * 5}
              </span>{' '}
              cutting damage
            </span>
          ) : (
            <span>bad failure </span>
          )}
        </p>
        {props.defend && (
          <p>
            <span class='monster'>Dragon</span> attacks{' '}
            <span class='hero'>You</span>,{' '}
            {parseInt(props.defend[11]) === 1 ? (
              <span>
                {parseInt(props.defend[11]) === 20
                  ? 'critical success'
                  : 'good success'}{' '}
                <span class='damage'>
                  {parseInt(props.defend[11]) === 20
                    ? parseInt(props.defend[9]) * 10
                    : parseInt(props.defend[9]) * 5}
                </span>{' '}
                cutting damage
              </span>
            ) : (
              <span>bad failure </span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}

export default Board
