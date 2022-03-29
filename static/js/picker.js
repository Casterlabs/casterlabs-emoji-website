
export default class {

    constructor(iframe, id = "emoji-picker") {
        this.iframe = iframe;
        this.id = id;

        this.iframe.width = 280;
        this.iframe.height = 365;

        const instance = this;

        this.onMessage = ({ data }) => {
            if (data.from == instance.id) {
                const type = data.type;

                delete data.type;
                delete data.from;

                instance.broadcast(type, data);
            }
        };

        window.addEventListener("message", this.onMessage);

        for (const [key, value] of Object.entries(new EventHandler())) {
            this[key] = value;
        }

        Object.freeze(this);

        this.on("set-size", (width, height) => {
            this.iframe.width = width;
            this.iframe.height = height;
        });

        this.on("closed", () => {
            this.iframe.remove();
        });
    }

    close() {
        // this.frame?.remove();
        window.removeEventListener("message", this.onMessage);
    }

}

function EventHandler() {
    let listeners = {};
    let callbackIdCounter = 0;

    return {
        on(type, callback) {
            const callbackId = callbackIdCounter++;

            type = type.toLowerCase();

            let callbacks = listeners[type] ?? {};

            callbacks[callbackId] = callback;

            listeners[type] = callbacks;

            return callbackId;
        },

        off(type, callbackId) {
            delete listeners[type][callbackId];
        },

        broadcast(type, data) {
            const callbacks = listeners[type.toLowerCase()];

            if (callbacks) {
                Object.values(callbacks).forEach((callback) => {
                    try {
                        callback(Object.assign({}, data));
                    } catch (e) {
                        console.error("A listener produced an exception: ");
                        console.error(e);
                    }
                });
            }
        }
    };
}

