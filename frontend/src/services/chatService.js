
//For chat sender ids
export const saveUserId = (userId) => {
    sessionStorage.setItem('userId', JSON.stringify(userId))
}

export const getUserId = () => {
    const userId = sessionStorage.getItem('');
    if (userId) {
        return JSON.parse(userId);
    }
    return userId;
}