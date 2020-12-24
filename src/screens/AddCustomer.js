/**
 * @author Shanilka
 */
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Keyboard
} from "react-native";
import Modal from 'react-native-modal';
import ActionButton from "../components/ActionButton"
import DatePicker from 'react-native-date-picker'
import ComponentStyles from '../../constants/Component.styles';
import Moment from 'moment'
import InputText from '../components/InputText'
import SubHeader from '../components/SubHeader'
import DropdownAlert from "react-native-dropdownalert";
import LocalDBService from "../services/LocalDBService";
import { StackActions } from '@react-navigation/native';
import ContactItem from "../components/ContactItem";

export default class AddCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            dob: new Date(),
            newDate: '',

            fName: '',
            lName: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            mobile: '',

            is_phone_validated: false,
            is_email_validated: false,

            contactDetails: []

        }
    }

    componentDidMount() {
        this.loadUserData();
    }

    loadUserData() {

        const { customerData } = this.props.route.params
        //setting Input Text values from navigation param data
        if (customerData != null) {
            this.setState({
                fName: customerData.firstName,
                lName: customerData.lastName,
                email: customerData.email,
                address: customerData.address,
                city: customerData.city,
                state: customerData.state,
                zip: customerData.zip,
                phone: customerData.phone,
                mobile: customerData.mobile,
                newDate: customerData.dob
            })

            //get contact details by customerId
            LocalDBService.searchData('SELECT * from contacts WHERE customerId=' + customerData.ID, [],
                (resp, err) => {
                    this.setState({ contactDetails: resp })
                });
        }
    }

    validateInput(key, value, count) {
        switch (key) {
            case "phone":
                value = value.replace(/\./g, '');
                value = value.replace(/\,/g, '');
                value = value.replace(/\-/g, '');
                value = value.replace(/([^0-9+])/ig, '');

                if (value.length >= count) { //if length exeeds the charactor count keyboard will dismiss
                    Keyboard.dismiss();
                    value = value.substring(0, count);
                }

                var number = value;

                if (value.length == 9 && !value.startsWith('0') && !value.startsWith('+')) { // 771234567 => +94771234567 
                    number = `+94${value}`;
                    value = `0${value}`;
                } else if (value.length == 10 && value.startsWith('0')) { // 0771234567 => +94771234567
                    number = `+94${value.slice(1, value.length)}`;
                }
                this.setState({ phone: number }); //+94771234567

                ((value.length == count && value.startsWith('+94') && value.substring(3, 4) != '0')
                    || (value.length == 9 && !value.startsWith('0') && !value.startsWith('+'))
                    || (value.length == 10 && value.startsWith('0')))
                    ? this.setState({ is_phone_validated: true })
                    : this.setState({ is_phone_validated: false });
                break;

            case "email":
                value = value.replace(/\\/g, '');
                value = value.replace(/[^A-Za-z-0-9_\\-\\.@]/ig, '');
                this.setState({ email: value });
                var reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
                reg.test(value) ? this.setState({ is_email_validated: true }) : this.setState({ is_email_validated: false });
                break;

            default:
                break;
        }
    }


    async onPressUpdate() {
        const { customerData } = this.props.route.params
        const { fName, lName, email, address, city, state, zip, phone, mobile, newDate, is_email_validated, is_phone_validated } = this.state;

        if (customerData != null) {
            LocalDBService.updateData([{
                table: 'customer',
                query: 'firstName=?, lastName=?, email=?, address=?, city=?, state=?, zip=?, phone=?, mobile=?, dob=? WHERE ID=?',
                params: [fName, lName, email, address, city, state, zip, phone, mobile, newDate, customerData.ID]
            }], (resp, err) => {
                // console.log("UPDATE " + JSON.stringify(resp));
                // this.props.navigation.replace('Home');
                this.dropDownAlertRef.alertWithType('success', 'Customer Updated Successfully!');
                setTimeout(() => {
                    this.props.navigation.dispatch(StackActions.pop(1))
                }, 800);
            });

        } else {
            if (fName === '') {
                this.dropDownAlertRef.alertWithType('warn', 'First Name Empty!', 'Please enter your first name');
            } else if (lName === '') {
                this.dropDownAlertRef.alertWithType('warn', 'Last Name Empty!', 'Please enter your last name');
            } else if (!is_email_validated) {
                this.dropDownAlertRef.alertWithType('warn', 'Invalid Email!', 'Please enter a valid email');
            } else if (!is_phone_validated) {
                this.dropDownAlertRef.alertWithType('warn', 'Invalid Contact Number!', 'Please enter a valid contact number');
            } else {
                LocalDBService.insertData([{
                    table: 'customer',
                    columns: 'firstName, lastName, email, address, city, state, zip, phone, mobile, dob',
                    values: '?,?,?,?,?,?,?,?,?,?',
                    params: [fName, lName, email, address, city, state, zip, phone, mobile, newDate]
                }],
                    (resp, err) => {
                        this.dropDownAlertRef.alertWithType('success', 'New Customer Added Successfully!');
                        setTimeout(() => {
                            this.props.navigation.dispatch(StackActions.pop(1))
                        }, 800);
                        // this.props.navigation.replace('Home');
                        // console.log("INSERT " + resp);
                    });
            }
        }

    }

    render() {
        return (
            <View style={ComponentStyles.CONTAINER}>
                {/* Header will update with navigation data availability */}
                <SubHeader title={this.props.route.params.customerData != null ? 'Update Customer' : 'Add New Customer'} navigation={() => this.props.navigation.goBack()} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={ComponentStyles.CONTENT}>

                    {this.renderDatePickerModal()}

                    <View style={{ padding: 10 }} />
                    <InputText
                        is_name={true}
                        name={'First Name'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.fName}
                        setState={(value) => this.setState({ fName: value })}
                    />

                    <InputText
                        is_name={true}
                        name={'Last Name'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.lName}
                        setState={(value) => this.setState({ lName: value })}
                    />

                    <TouchableOpacity onPress={() => this.showDatePicker()}>
                        <InputText
                            is_name={true}
                            name={'Date of Birth'}
                            editable={false}
                            stateValue={this.state.newDate != null ? this.state.newDate.toString() : Moment(this.state.dob).format('YYYY-MM-DD').toString()}
                            style={styles.input}
                            placeholder='Click to Add a Date' />
                    </TouchableOpacity>

                    <InputText
                        is_name={true}
                        name={'Email'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.email}
                        keyType={'email-address'}
                        setState={(value) => this.validateInput('email', value)}
                    />

                    <InputText
                        is_name={true}
                        name={'Address'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.address}
                        setState={(value) => this.setState({ address: value })}
                    />

                    <InputText
                        is_name={true}
                        name={'City'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.city}
                        setState={(value) => this.setState({ city: value })}
                    />

                    <InputText
                        is_name={true}
                        name={'State'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.state}
                        setState={(value) => this.setState({ state: value })}
                    />

                    <InputText
                        is_name={true}
                        name={'Zip'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.zip}
                        setState={(value) => this.setState({ zip: value })}
                    />

                    <InputText
                        is_name={true}
                        name={'Phone Number'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.phone}
                        keyType={'number-pad'}
                        maxLength={12}
                        setState={(value) => this.validateInput('phone', value, 12)}
                    />

                    <InputText
                        is_name={true}
                        name={'Mobile Number'}
                        style={styles.input}
                        placeholderColor={ComponentStyles.COLORS.DARKER_GRAY}
                        stateValue={this.state.mobile}
                        keyType={'number-pad'}
                        maxLength={10}
                        setState={(value) => this.setState({ mobile: value })}
                    />

                    {this.props.route.params.customerData != null ?
                        <Text style={{ fontFamily: ComponentStyles.FONT_FAMILY.MEDIUM }}>{'Additional Contact Details : '}</Text>
                        : null}

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={this.state.contactDetails}
                        renderItem={({ item }) => {
                            return (
                                <ContactItem
                                    title={item.title}
                                    contact={item.contact}
                                />
                            );
                        }}
                        keyExtractor={item => `id_${item.ID}`}
                    />

                </ScrollView>

                <ActionButton
                    customBtnStyle={{ marginBottom: 30 }}
                    title={'Submit'}
                    onPress={() => this.onPressUpdate()}
                />

                <DropdownAlert elevation={20}
                    ref={ref => this.dropDownAlertRef = ref}
                    titleNumOfLines={5} messageNumOfLines={5} />
            </View>
        );
    }

    showDatePicker = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            newDate: Moment(this.state.dob).format('YYYY-MM-DD').toString()
        });
    };

    renderDatePickerModal() {
        return (
            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.alertBox}>
                    <DatePicker
                        mode={'date'}
                        style={{ bottom: 20 }}
                        date={this.state.dob}
                        maximumDate={new Date()}
                        onDateChange={date => {
                            if (!date || !Moment(date) || !Moment(date).isValid()) {
                                this.setState({ dob: null });
                                return;
                            }
                            this.setState({ dob: date });
                        }}
                    />

                    <ActionButton customBtnStyle={{
                        position: 'absolute', alignSelf: 'center', paddingLeft: 80, paddingRight: 80,
                        marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0,
                    }} title={'Done'} onPress={this.showDatePicker} />
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 50,
        fontFamily: ComponentStyles.FONT_FAMILY.MEDIUM,
        fontSize: 14, paddingBottom: 0, color: ComponentStyles.COLORS.BLUE
    },

    alertBox: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: ComponentStyles.COLORS.WHITE,
        padding: 15,
        borderRadius: 10,
    },

});