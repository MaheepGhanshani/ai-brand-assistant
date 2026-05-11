const SYSTEM_PROMPT = `
You are an expert AI branding assistant.
Help users create brand names, taglines, target audience and brand identity.
Always use previous conversation context.
`;

function buildPrompt(messages, currentMessage) {

    const formattedMessages = [
        {
            role: "system",
            content: SYSTEM_PROMPT
        }
    ];

    // previous chat history add karna
    messages.forEach((msg) => {
        formattedMessages.push({
            role: msg.role,
            content: msg.content
        });
    });

    // latest user message add karna
    formattedMessages.push({
        role: "user",
        content: currentMessage
    });

    return formattedMessages;
}

module.exports = buildPrompt;