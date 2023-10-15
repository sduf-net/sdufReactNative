import { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { initSocketConnection } from '../socket/connection';
import { setSocket } from '../redux/socket';

export default function useSocket() {
    const socketConn = initSocketConnection();

    useEffect(() => {
    }, []);

    return socketConn;
}