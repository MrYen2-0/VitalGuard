// WebSocketManager.js
export const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}`);

const eventHandlers = new Map();

export function setWS() {
    ws.onopen = (event) => {
        console.info(`Conectado a WebSocket. ${event}`);
    };

    ws.onmessage = (event) => {
        try {
            /**
             * @type {{ Event: string, valor: number }}
             */
            const data = JSON.parse(event.data);
            console.log(data.toString());

            // Llama a los manejadores registrados para el evento específico
            const handlers = eventHandlers.get(data.Event);
            if (handlers) {
                handlers.forEach((handler) => handler(data.valor));
            } else {
                console.warn(`No hay manejadores registrados para el evento: ${data.Event}`);
            }
        } catch (err) {
            console.error("Error procesando mensaje WebSocket:", err);
        }
    };

    ws.onclose = () => {
        console.warn("Conexión a WebSocket cerrada. Intentando reconectar...");
        setTimeout(setWS, 5000); // Reintentar conexión después de 5 segundos
    };

    ws.onerror = (event) => {
        console.error("Error en WebSocket:", event);
    };
}

export function addEventListener(eventType, handler) {
    if (!eventHandlers.has(eventType)) {
        eventHandlers.set(eventType, []);
    }
    eventHandlers.get(eventType).push(handler);
}

export function removeEventListener(eventType, handler) {
    const handlers = eventHandlers.get(eventType);
    if (handlers) {
        eventHandlers.set(
            eventType,
            handlers.filter((h) => h !== handler)
        );
    }
}
