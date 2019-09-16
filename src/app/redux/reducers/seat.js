import { handleActions } from 'redux-actions';
import { FETCH_SEATS, INSERT_SEAT, UPDATE_SEAT, DELETE_SEAT } from '../actions/types';

export const seat = handleActions({
    [FETCH_SEATS]: (state, action) => ({ ...state, ...action.payload }),
    [INSERT_SEAT]: (state, action) => {
        const seatPayload = action.payload.data;
        const { identifier } = seatPayload;
        const seats = state.data;

        const newSeats = reducerSeat(seats, seatPayload, identifier);
        return { ...state, data: [...newSeats, seatPayload]};
    },
    [UPDATE_SEAT]: (state, action) =>{
        const seatPayload = action.payload.data;
        const { identifier } = seatPayload;
        const seats = state.data;

        const newSeats = reducerSeat(seats, seatPayload, identifier);

        return { ...state, data: newSeats };
    },
    [DELETE_SEAT]: (state, action) => {
        const payload = action.payload.data;
        const { identifier } = payload;
        const seats = state.data;
        const newData = seats.filter(c=>c.identifier !== identifier);
        return {...state, data: newData};
      },
}, {});

const reducerSeat = (seats, seatPayload, identifier) => {
    const initialValue = [];
    return seats.reduce( (reducer, seat) => {
        if (seat.identifier === identifier) {
            return [ ...reducer, seatPayload];
        } else {
            if (seatPayload.main === true) {
                return [ ...reducer, { ...seat, main: false} ];
            } else {
                return [ ...reducer, seat];
            }
        }
    }, initialValue);
}