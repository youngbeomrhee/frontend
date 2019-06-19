import React from 'react';
import Layout, {
    BasicAppBar,
    BasicFooter,
    BasicDrawer,
} from 'material-ui-layout';

// Defined here for link format reference
const links = [
    {
        href: 'https://material-ui.com/',
        label: 'Material-UI',
    },
    {
        href: 'https://github.com/OrigenStudio/material-ui-layout/tree/develop/src',
        label: 'GitHub',
    },
];

class AppLayout extends React.Component {
    render(){
        const {children} = this.props;
        return(
                <Layout
                        stickyFooter // default false
                        mainGrow={false} // default true
                        appBarPosition={"fixed"} //default value
                        appBarContent={<BasicAppBar /*{/!* ... appBarContentProps *!/}*/ />} // If no content it will render null
                        appBarProps={/* props to the AppBar wrapper component eg. color, className */}

                        footerContent={<BasicFooter /*{/!* footerContentProps *!/}*/ /> } // If no content it will render null
                        footerProps={/* props to the Footer wrapper component eg. color, className */}

                        leftDrawerUnder // default false
                        rightDrawerUnder // default false
                        leftDrawerContent={<BasicDrawer links={links} />} // If no content it will render null
                        leftDrawerType="permanent" // default temporary
                        rightDrawerContent={<BasicDrawer links={links} />} // If no content it will render null
                        rightDrawerType="permanent" // default temporary

                        // For state control the layout can either be controlled from the outside using e.g. Redux
                        // or internally managed. If it is not specified, then it will be self managed.
                        // If you want to control it externally you'll have to use this props.
                        // Check the docs for more details
                        leftDrawerOpen={/* Add here your left drawer state*/}
                        onLeftDrawerOpenChange={/* Add here you function to update the left drawer state*/}
                        rightDrawerOpen={/* Add here your right drawer state*/}
                        onRightDrawerOpenChange={/* Add here you function to update the right drawer state*/}
                >
                    // Inside the children you can have components that use the LayoutActions.Consumer to have access to
                    // layout state modifiers
                    {children}
                </Layout>
        )
    }
}

export default AppLayout;