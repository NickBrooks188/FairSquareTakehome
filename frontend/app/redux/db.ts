export const users = {
    1: {
        id: 1,
        email: "nicholas.brooks@aya.yale.edu"
    },
    2: {
        id: 2,
        email: "nicholasbrooks1@msn.com"
    },
    3: {
        id: 3,
        email: "nicholasbrook1@gmail.com"
    }
}

export const templates = {
    1: {
        id: 1,
        subject: "Hello",
        body: "Hello, World!",
        owner: 1
    },
    2: {
        id: 2,
        subject: "Goodbye",
        body: "Goodbye, World!",
        owner: 1
    },
    3: {
        id: 3,
        subject: "Greetings",
        body: "Greetings, World!",
        owner: 1
    }
}

export const emails = {
    1: {
        id: 1,
        template: 1,
        sender: 1,
        recipient: 2
    },
    2: {
        id: 2,
        template: 2,
        sender: 1,
        recipient: 2
    },
    3: {
        id: 3,
        template: 3,
        sender: 1,
        recipient: 2
    }
}