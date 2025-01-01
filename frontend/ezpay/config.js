const backendUrl = process.env.NODE_ENV === 'production' 
    ? 'https://ezpay-splp.onrender.com' 
    : 'http://localhost:3000';

export default backendUrl;