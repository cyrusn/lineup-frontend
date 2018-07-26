import Floors from '../data/floor.json'

export default {
  floorClazzes: state => {
    return state.currentFloor !== '' ? Floors[state.currentFloor] : []
  }
}
