import { View, Text, Image, Pressable, TextInput, TouchableOpacity,Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import axios from "axios";

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState(0);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [responseText, setResponseText] = useState("");
    const handleFacebookLink = () => {
        Linking.openURL("https://www.facebook.com");
    };
    
    const handleGoogleLink = () => {
        Linking.openURL("https://www.google.com");
    };
    useEffect(() => {
        const authenticate = async() =>{
          /*

          axios.post("http://192.168.43.87:80/api/insert.php",
          JSON.stringify({
            number : number,
            email: email,
            password: password,
          })
          )*/axios.post("http://192.168.43.87:80/api/insert.php", {
            number: number,
            email: email,
            password: password,
            }).then((response)=>{
            console.log(response.data);
            setIsSubmit(false);
            setResponseText(response.data);
            //alert(response.data);
            if(response.data == "Enregistrement des informations réussi"){
           // navigation.navigate("Login");
           // setResponseText("");}
            // navigate
            setTimeout(() => {
                navigation.navigate("Login");
                setResponseText("");
              }, 2000);}
          }).catch((err)=>{
            console.log(err);
            alert(err);
          });
        };
        if(isSubmit) authenticate();
    },[isSubmit]);
    const numberHandler = (text) => {
        setNumber(text);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Create Account
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Connect with your map today!</Text>
                </View>
                <View style={{ marginHorizontal: 0 }}>
                {responseText !== "" && (
                    responseText === "Enregistrement des informations réussi" ? (
                    <Text style={{ color: "black", backgroundColor: "green", padding: 10 }}>{responseText}</Text>
                    ) : (
                    <Text style={{ color: "black", backgroundColor: "red", padding: 10 }}>{responseText}</Text>
                    )
                )}

                {/* Reste du code */}
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>


                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 11,
                        
                    }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                       <Image
                            source={require('../assets/maroc.jpeg')}
                            style={{ width: 24, height: 24, marginRight:3 }}
                        />
                        <TextInput
                            placeholder="+212"
                            placeholderTextColor={COLORS.black}
                            keyboardType="numeric"
                            style={{
                                width:37,
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: '100%',
                              
                                
                            }}
                        />
                    </View>
                      

                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            onChangeText={numberHandler}
                            style={{
                                width: "80%",
                                paddingLeft: 11
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={(text) => setPassword(text)}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    onPress = {() => setIsSubmit(true)}
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        //onPress={() => console.log("Pressed")}
                        onPress={handleFacebookLink}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        //onPress={() => console.log("Pressed")}
                        onPress={handleGoogleLink}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup