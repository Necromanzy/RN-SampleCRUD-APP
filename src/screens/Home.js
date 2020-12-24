/**
 * @author Shanilka
 */
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";
import ProgressOverlay from "../components/ProgressOverlay";
import LocalDBService from "../services/LocalDBService";
import CustomerItem from "../components/CustomerItem";
import ComponentStyles from "../../constants/Component.styles";
import Fab from "../components/Fab";
import Modal from 'react-native-modal';
import InputText from '../components/InputText'
import ActionButton from "../components/ActionButton"
import DropdownAlert from "react-native-dropdownalert";

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spinner: false,
            data: [],

            userId: 0,
            isModalVisible: false,
            title: '',
            phone: ''
        }
    }

    componentDidMount() {
        //refreshing data
        this.props.navigation.addListener('focus', () => {
            this.getAllData();
        })
        this.getAllData();

    }

    getAllData() {
        this.setState({ spinner: true })
        LocalDBService.searchData('SELECT * FROM customer', [],
            (resp, err) => {
                this.setState({ data: resp, spinner: false })
                // console.log("ALL " + JSON.stringify(resp));
            });
    }

    onPressAddPhone(customerId) {
        const { title, phone } = this.state;
        if (title === '') {
            this.dropDownAlertRef.alertWithType('warn', 'Title Empty!', 'Please enter a title');
        } else if (phone === '') {
            this.dropDownAlertRef.alertWithType('warn', 'Contact Number Empty!', 'Please enter a contact Number');
        } else {
            LocalDBService.insertData([{
                table: 'contacts',
                columns: 'customerId, title, contact',
                values: '?,?,?',
                params: [customerId, title, phone]
            }],
                (resp, err) => {
                    this.setState({ isModalVisible: false, title: '', phone: '' })
                    this.dropDownAlertRef.alertWithType('success', 'New Contact Added Successfully!');
                });
        }
    }


    onUpdate(object) {
        this.props.navigation.navigate('AddCustomer', { customerData: object }) //passing data object in navigation
    }

    onDelete(object) {
        this.setState({ spinner: true })
        LocalDBService.deleteData([{
            table: 'customer',
            query: 'WHERE ID=?',
            params: [object.ID]
        }], (resp, err) => {
            this.dropDownAlertRef.alertWithType('success', 'Customer Removed Successfully!');
            this.getAllData();
            // console.log("DELETE " + resp);
        });
    }

    addNewContactModal() {
        return (
            <Modal backdropOpacity={0.3} isVisible={this.state.isModalVisible}>
                <View style={styles.alertBox}>
                    <Text style={styles.modalTitle}>Add New Contact</Text>
                    <InputText
                        is_name={true}
                        name={'Contact Title'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.title}
                        setState={(value) => this.setState({ title: value })}
                    />

                    <InputText
                        is_name={true}
                        name={'Contact Number'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.phone}
                        keyType={'number-pad'}
                        maxLength={10}
                        setState={(value) => this.setState({ phone: value })}
                    />

                    <ActionButton
                        customBtnStyle={{ marginBottom: 30 }}
                        title={'Submit'}
                        onPress={() => this.onPressAddPhone(this.state.userId)}
                    />
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View style={ComponentStyles.CONTAINER}>
                <ProgressOverlay visible={this.state.spinner} message={'Loading'} />
                <View style={{ backgroundColor: ComponentStyles.COLORS.BLUE, alignItems: 'center', padding: 10 }}>
                    <Text style={{ color: ComponentStyles.COLORS.WHITE, fontFamily: ComponentStyles.FONT_FAMILY.BOLD, fontSize: 20 }}>CRUD App</Text>
                </View>
                {this.addNewContactModal()}
                <FlatList
                    ListEmptyComponent={ //if data unavailable this component will render to the ui
                        <Image source={require('../images/image.png')} resizeMode={'stretch'}
                            style={styles.img} />
                    }
                    showsHorizontalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={({ item }) => {
                        return (
                            <CustomerItem
                                title={item.firstName + "\t" + item.lastName}
                                onPressAddPhone={() => this.setState({ isModalVisible: true, userId: item.ID })}
                                onPressUpdate={() => this.onUpdate(item)}
                                onPressDelete={() => this.onDelete(item)}
                            />
                        );
                    }}
                    keyExtractor={item => `id_${item.ID}`}
                />
                <Fab onPress={() => this.props.navigation.navigate('AddCustomer', { customerData: null })} />

                <DropdownAlert elevation={20}
                    ref={ref => this.dropDownAlertRef = ref}
                    titleNumOfLines={5} messageNumOfLines={5} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center',
        width: ComponentStyles.WIDTH,
        height: ComponentStyles.HEIGHT * 0.5
    },
    input: {
        height: 50,
        fontFamily: ComponentStyles.FONT_FAMILY.MEDIUM,
        fontSize: 14, paddingBottom: 0, color: ComponentStyles.COLORS.BLUE
    },
    alertBox: {
        width: ComponentStyles.WIDTH * 0.8,
        height: ComponentStyles.HEIGHT * 0.45,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: ComponentStyles.COLORS.WHITE,
        padding: 15,
        borderRadius: 10,
    },

    modalTitle: {
        fontSize: 16,
        color: ComponentStyles.COLORS.BLUE,
        fontFamily: ComponentStyles.FONT_FAMILY.BOLD,
        margin: 5, alignSelf: 'center'
    }
});