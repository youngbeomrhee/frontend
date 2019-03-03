import React from "react"
import NavBar from "./NavBar"
import Divider from "./Divider"
import Content from "./Content"
// import Right from "./Right"
// import Footer from "./Footer"

class Layout extends React.Component {
    render() {
        return (
            <div className="container" >
                <NavBar/>
                <Divider/>
                <Content/>
                {/*
                <Right/>
                <Footer/>
                */}
            </div>
        )
    }
}

export default Layout