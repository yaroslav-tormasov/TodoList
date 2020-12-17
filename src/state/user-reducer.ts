type StateType = {
    name: string
    age: number
    childrenCount: number
}

 type ActionType = {
    type: string // "INCREMENT_AGE" or "INCREMENT_CHILDREN_COUNT"
    [key: string]: any
}

// 1. добавлять возраст
// 2. добавлять детей

export const userReducer = (user: StateType, action: ActionType) => {
    const copyUser = {...user}
    switch (action.type) {
        case "INCREMENT_AGE":
            return {...user, age: user.age + 1};
        case "INCREMENT_CHILDREN_COUNT":
            return {...user, childrenCount: user.childrenCount + 1};
        case "CHANGE_NAME":
            return {...user, name: action.name}
        default:
            throw new Error("I don't understand this type")
    }
}