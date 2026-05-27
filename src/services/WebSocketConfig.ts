import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient: any = null;

export const connectWebSocket = (submissionId: string, onMessageReceived: (message: any) => void) => {

    const socket = new SockJS('http://localhost:8082/ws');

    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: (str) => {
            console.log(str);
        },
        onConnect: () => {
            console.log('Connected to websocket');

            stompClient.subscribe(
                `/topic/submission/${submissionId}`,
                (message: any) => {
                    const body = JSON.parse(message.body);
                    onMessageReceived(body);
                }
            );
        },
        onStompError: (frame) => {
            console.error('Broker error:', frame);
        }
    });

    stompClient.activate();
};

export const disconnectWebSocket = () => {

    if (stompClient) {
        stompClient.deactivate();
    }
};