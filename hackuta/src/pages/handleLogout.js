const handleLogout = async () => {
    try {
        await firebase.auth().signOut();
        // Redirect to home page or login page
    } catch (error) {
        console.error('Error logging out:', error);
    }
};

export default handleLogout
