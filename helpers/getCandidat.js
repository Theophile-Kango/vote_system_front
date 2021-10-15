const getCandidat = (id, result) => {
    return result.find(user => user.id === id);
}


export { getCandidat };