import React from 'react';
import StartGame from '../containers/StartGame';
import DrawBoard from '../containers/DrawBoard';
// import Score from '../containers/Score';
// import Board from '../components/Board';
import Score from '../components/Score';
// import Start from '../components/Start';

const Player = (name, turn) => ({
    name: name,
    turn: turn
});

const players = [Player('player1', 1), Player('player2', 2)];

const App = ({ title="게임 시작" }) => (
    <div>
        <StartGame title={title}/>
        {
            players.map(player => (
                <div key={player.turn} className="player">
                    <h2>{player.name}</h2>
                    <DrawBoard turn={player.turn} rows={5} cols={5}/>
                    <Score turn={player.turn} />
                </div>
            ))
        }
    </div>
)

export default App;
