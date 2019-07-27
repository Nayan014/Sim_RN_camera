import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, View, Dimensions, ScrollView, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Shutter_Icon from './../assets/camera/Shutter_Icon.png';
import flash_on from './../assets/camera/flash.png';
import flash_off from './../assets/camera/flash_off.png';
import flash_auto from './../assets/camera/flash_auto.png';
import camera_rotate from './../assets/camera/camera_rotate.png';

import retake from './../assets/camera/retake.png';
import image_conform from './../assets/camera/image_conform.png';

class Camera extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            capturedImg: null,
            screenWidth: Dimensions.get('window').width,
            screenHeight: Dimensions.get('window').height,
            autoFocus: 'on',
            flash: {
                icon: flash_on,
                mode: 'auto'
            },
            flashMode: [
                {
                    id: 0,
                    icon: flash_on,
                    mode: 'on'
                },
                {
                    id: 1,
                    icon: flash_off,
                    mode: 'off'
                },
                {
                    id: 2,
                    icon: flash_auto,
                    mode: 'auto'
                }
            ],
            cameraType: RNCamera.Constants.Type.back,
            showFocusPoint: false,
            autoFocusPoint: {
                normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
                drawRectPosition: {
                    x: Dimensions.get('window').width * 0.5 - 32,
                    y: Dimensions.get('window').height * 0.5 - 32,
                },
            },
            whiteBalance: 'auto',
            ratio: '16:3',
        };

        Dimensions.addEventListener("change", (e) => {
            this.setState({
                screenWidth: e.window.width,
                screenHeight: e.window.height,
            });
        });
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { base64: true, doNotSave: false, fixOrientation: true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({ capturedImg: data });
        }
    }

    retakePicture = () => {
        this.setState({ capturedImg: null, });
    }

    onConfirmPreview = () => {
        this.props.getImageData(this.state.capturedImg);
    }

    onCancelPreview = () => {
        this.setState({ capturedImg: null });
    }

    touchToFocus(event) {
        const { pageX, pageY } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const isPortrait = screenHeight > screenWidth;

        let x = pageX / screenWidth;
        let y = pageY / screenHeight;
        if (isPortrait) {
            x = pageY / screenHeight;
            y = -(pageX / screenWidth) + 1;
        }

        this.setState({
            autoFocusPoint: {
                normalized: { x, y },
                drawRectPosition: { x: pageX, y: pageY },
            },
            showFocusPoint: true
        }, () => this._renderManualFocusBox());

        setTimeout(() => {
            this.setState({
                showFocusPoint: false
            }, () => this._renderManualFocusBox());
        }, 2000);
    }

    changeFlashMode = () => {
        let index = this.state.flash.id;

        if (index < 2) {
            let newMode = this.state.flashMode[++index];
            this.setState({
                flash: newMode
            })
        }
        else {
            let newMode = this.state.flashMode[0];
            this.setState({
                flash: newMode
            })
        }
    }

    flipCamera = () => {
        if (this.state.cameraType == RNCamera.Constants.Type.back) {
            this.setState({
                cameraType: RNCamera.Constants.Type.front,
            })
        }
        else {
            this.setState({
                cameraType: RNCamera.Constants.Type.back,
            })
        }
    }

    _renderManualFocusBox = () => {

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };

        if (this.state.showFocusPoint) {
            return (
                <View style={StyleSheet.absoluteFill}>
                    <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
                    <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>
                </View>
            )
        }
        return (
            <View style={StyleSheet.absoluteFill}>
                <View />
                <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
            </View>
        );

    }

    renderCamera() {
        const { capturedImg } = this.state;
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={this.state.cameraType}
                    flashMode={this.state.flash.mode}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    //autoFocus={this.state.autoFocus}
                    autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                    //whiteBalance={this.state.whiteBalance}
                    //ratio={this.state.ratio}
                    focusDepth={1}
                    onFocusChanged={() => console.log('change focus')}
                    defaultOnFocusComponent={true}
                >
                    {this._renderManualFocusBox()}
                </RNCamera>

                <View style={{ flex: 0, flexDirection: 'row', bottom: 0, justifyContent: 'space-around', alignItems: 'center' }}>

                    <TouchableOpacity style={styles.shutter} onPress={this.changeFlashMode}>
                        <Image source={this.state.flash.icon} style={{ maxWidth: 30, height: 30 }} />
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.shutter} onPress={this.takePicture.bind(this)}>
                        <Image source={Shutter_Icon} style={{ maxWidth: 75, height: 75 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shutter} onPress={this.flipCamera}>
                        <Image source={camera_rotate} style={{ maxWidth: 30, height: 30 }} />
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    renderImage() {
        const { screenWidth, screenHeight } = this.state;
        return (
            <ScrollView style={[styles.container, { backgroundColor: 'white' }]}>
                <View style={{ alignSelf: 'center' }}>
                    <Image
                        source={{ uri: this.state.capturedImg.uri }}
                        style={{ width: screenWidth, height: 0.8 * screenHeight, resizeMode: 'contain' }}
                    />
                </View>

                <View style={{ flex: 0, flexDirection: 'row', bottom: 0, justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.previewIcon} onPress={this.retakePicture}>
                        <Image source={retake} style={{ maxWidth: 75, height: 75 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.previewIcon} onPress={this.onConfirmPreview}>
                        <Image source={image_conform} style={{ maxWidth: 75, height: 75 }} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    render() {
        const { capturedImg } = this.state;
        return (
            <View style={styles.container}>
                {capturedImg ? this.renderImage() : this.renderCamera()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    shutter: {
        //   flex: 0,
        backgroundColor: 'black',
        // borderRadius: 5,
        padding: 15,
        paddingVertical: 20,
        alignSelf: 'center',
        // margin: 20,
    },
    previewIcon: {
        //   flex: 0,
        backgroundColor: 'white',
        // borderRadius: 5,
        padding: 15,
        paddingVertical: 20,
        alignSelf: 'center',
        // margin: 20,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imagePreview: {
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    cancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 17,
    },
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 0.4,
    },
    inputFont: {
        fontSize: 16
    },
});

export default Camera;