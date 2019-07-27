import React, { Component } from 'react';
import { Text, View, Button, Alert, Image, TouchableWithoutFeedback } from 'react-native';

// Components
import Camera from './components/Camera';

export default class Home extends Component {

    state = {
        isCapturing: false,
        isImagePriview: false,
        imageArray: []
    }

    getImageData = (data) => {

        let image = [...this.state.imageArray];

        image.push(data);

        this.setState({
            imageArray: image,
            isCapturing: false
        });
    }

    _renderCamera = () => {
        if (this.state.isCapturing) {
            return (<Camera getImageData={this.getImageData} />)
        }
        return null;
    }


    _renderImageView = () => {

        return null;
    }

    _renderImages = () => {
        if (this.state.imageArray.length) {
            return this.state.imageArray.map((v, index) => {
                return (
                    <TouchableWithoutFeedback  key={index} onPress={() => this.setState({ isImagePriview: true, isImagePriviewIndex: index })}>
                        <View style={{ padding: 5 }}>
                            <Image source={v} style={{ maxWidth: 75, height: 75 }} />
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        }
    }

    _rendercontent = () => {
        if (!this.state.isCapturing) {
            return (
                <View style={{ padding: 10 }}>
                    <View style={{ paddingTop: 20 }}>
                        <Button
                            onPress={() => this.setState({ isCapturing: true })}
                            title="Capture"
                            color="red"
                        />

                        <View style={{ paddingTop: 10, flexDirection: 'row' }}>
                            {this._renderImages()}
                        </View>

                    </View>
                </View>
            )
        }
        return null;
    }

    render() {
        return (
            <>
                {this._rendercontent()}
                {this._renderCamera()}
                {this._renderImageView()}
            </>
        )
    }
}
