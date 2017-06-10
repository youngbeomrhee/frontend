/**
 *
 * @param passenger
 * @param flight
 * @returns {{passengerInfo: *, flightInfo: *}}
 */
function createReservation(passenger, flight) {
  return {
    passengerInfo: passenger,
    flightInfo: flight
  };
}