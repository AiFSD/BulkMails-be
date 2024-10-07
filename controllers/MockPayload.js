// controllers / MockPayload.js 
const createMockPayload = () => {
    return {
        event: "delivered",
        recipient: "example@example.com",
        timestamp: Math.floor(Date.now() / 1000), // Current timestamp
        "message-id": "20130503182626.18666.16540@samples.mailgun.org",
        signature: {
            timestamp: Math.floor(Date.now() / 1000).toString(),
            token: "123abc456def789ghi",
            signature: "d1b9b956fb63b84e276f0c3f6269dcb654f6a034d3c63a276c9c8143bb-"
        },
        "delivery-status": {
            message: "Message has been delivered",
            code: 250,
            description: "OK"
        }
    };
};


module.exports = {
    createMockPayload
   };