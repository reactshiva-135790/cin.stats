import logo from "../../asset/image/logo.png";

const Navbar = () => {
    return (
        <>
            <nav className="navbar sticky-top bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} alt="CinScan Logo"  width="155" height="46" />
                    </a>
                </div>
            </nav>
        </>
    )
};

export default Navbar;