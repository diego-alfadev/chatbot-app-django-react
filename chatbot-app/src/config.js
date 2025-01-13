const {
    REACT_APP_API_HOST = 'http://localhost:8000', // Default value
    REACT_APP_API_BASE = '/api/chat', // Default value
} = process.env;


export const ENV = {
    API_HOST: REACT_APP_API_HOST,
    API_BASE: REACT_APP_API_BASE
}
