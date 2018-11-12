import React from 'react';
import { render } from 'react-dom';


import { BasicTree } from './BasicTree';
import { FileExplorerTree } from './FileExplorerTree';
import { CustomSelectedTree } from './CustomSelectedTree';

class App extends React.Component {
    render() {
        return (
            <div>

                <div style={{width: '300px', marginTop: '20px'}}>
                    <h5 style={{textAlign: 'center', marginBottom: 0}}>Custom Selected Example</h5>
                    <br />
                    <CustomSelectedTree />
                </div>

                <div style={{width: '300px', marginTop: '20px'}}>
                    <h5 style={{textAlign: 'center', marginBottom: 0}}>Standard Example</h5>
                    <br />
                    <BasicTree />
                </div>

                <div style={{width: '300px', marginTop: '20px'}}>
                    <h5 style={{textAlign: 'center', marginBottom: 0}}>File Explorer Example</h5>
                    <br />
                    <FileExplorerTree />
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));