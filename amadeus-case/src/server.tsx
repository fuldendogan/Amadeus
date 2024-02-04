import { createServer, Response } from "miragejs";
import flightsData from './data/flightsData.json';
import airportsData from './data/airportsData.json';

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,

        routes() {
            this.get("/api/airports", () => {
                return airportsData;
            });

            this.get("/api/flights", (schema, request) => {
                let { date, from, to } = request.queryParams;

                from = from.toUpperCase();
                to = to.toUpperCase();

                const filteredFlights = flightsData.filter(flight => {
                    return flight.date === date && flight.from === from && flight.to === to;
                });

                if (filteredFlights.length === 0) {
                    return new Response(404, {}, { errors: ['Uçuş bulunamadı.'] });
                }

                return filteredFlights;
            });
        },
    });

    return server;
}
