import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

const CONFIG = {

    apiKey: "AIUM6kLrK30dsGK1VFX973DWO6Apy1pW",
    nodes: [
        {
            host: "h6p0c3s75mo4vibjp-1.a1.typesense.net",
            port: "443",
            protocol: "https"
        }
    ],
    connectionTimeoutSeconds: 2,
    numRetries: 8
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
    server: CONFIG,
    additionalSearchParameters: {
        query_by: "name, address",
        query_by_weights: "6, 2",
        num_typos: 3,
        typo_tokens_threshold: 1
    }
});

export const searchClient = typesenseAdapter.searchClient;