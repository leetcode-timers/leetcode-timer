const outcomes = "SUCCESS|FAILURE";

export const solvesBody = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                duration: {type: 'number'},
                tackledAt: {type: 'number'},
                outcome: {type: 'string', pattern: outcomes}
            },
            required: ['duration', 'tackledAt', 'outcome']
        }
    }
}
