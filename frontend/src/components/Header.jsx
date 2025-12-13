
function Header() {

    const headerStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        padding: '15px',
        textAlign: 'center'
    };

    return (
        <header style={headerStyle}>
            <h2>My React Appilication</h2>
            <nav>Home   |   About   |   Contact</nav>
        </header>
    );
}

export default Header;