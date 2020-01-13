import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

export default class MyLoader extends Component {
    render() {
        return(
            <Loader
                type="TailSpin"
                color="#007bff"
                height={100}
                width={100}
                className="mx-auto mt-5"
            />
        );
    }
 }