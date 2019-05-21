// import React from 'react'
import { connect } from 'react-redux'
import {restartGame, startGame} from '../actions'
import Start from '../components/Start'

const mapStateToProps = state => ({
    ...state,
    restart: state.bingos.restart
});

const mapDispatchToProps = dispatch => ({
    // startGame: isPlaying => dispatch(startGame(isPlaying)),
    restartGame: restart => dispatch(restartGame(restart))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Start);
