

const NeedsRegistration = () => {
    let user = sessionStorage.getItem("username");
    return user !== undefined; 
}

export default NeedsRegistration;