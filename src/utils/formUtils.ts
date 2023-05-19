export function getErrorMessage(error: any): string | null {
    //Error can be nested so we need to check if it has a message property on any level
    if (error.message) {
        return error.message
    }
    //If not, we need to loop through the object and find the first message
    for (const key in error) {
        if (error.hasOwnProperty(key)) {
            const message = getErrorMessage(error[key])
            if (message) {
                return message
            }
        }
    }
    return null
}