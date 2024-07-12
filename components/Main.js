import React, { Component, useEffect, useState} from 'react'
import { Platform, SafeAreaView, View, ScrollView } from 'react-native';
import { color, font } from '../global/styles';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchUser } from '../redux/actions/index';

import MainUGContainer from '../screens/UGdetails/mainContainer';
import Home from '../screens/MainAppScreens/Home';
import Courses from '../screens/MainAppScreens/Courses';
import Profile from '../screens/MainAppScreens/Profile';
import Assignments from '../screens/MainAppScreens/Assignments';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// import { auth, db } from './firebase';
import { auth, db } from '../firebase';

export function Main() {
  
  
  // componentDidMount(){
    //   this.props.fetchUser();
    // }
    
    // render() {
    const [currentUser, setCurrentUser] = useState('')
    // const [name, setName] = useState('')
    // const {currentUser} = this.props
    // const currentUser = {
    //   "name" : "Adu",
    //   "Programme" : "Kofi",
    // }
  //   const getNews = async ()  =>{
  //     const getNewsData = [];

  //     const querySnapshot = await getDocs(collection(db, "news"));
      
  //     querySnapshot.forEach((doc) => {
  //     getNewsData.push({
  //         ...doc.data(),
  //         key: doc.id,
  //     });
  // //    return () => querySnapshot(); 
  // });
  // setNews(getNewsData);
  // }
  // const fetchUser = async () => {

    // return((dispatch)=>{
      useEffect(() => {
        // const getUserData = []
        db
        .collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists){
                console.log(snapshot.data())
                // getUserData.push({...snapshot.data(), key: snapshot.id,})
                setCurrentUser(snapshot.data())
                // dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else{
                console.log('does not exist')
            }
        })
        // setCurrentUser(getUserData);
        // console.log(currentUser)
    // })
}, [])
    // useEffect(()=>{
    //   fetchUser();
    // }, [])

    // if(currentUser == undefined){
    //   return(
    //     <View></View>
    //   )
    // }
    
    
    if(currentUser.Programme !== undefined){

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();
    const Home1 = () => {
      return <Home currentUser={currentUser}/>
    }
    const Profile1 = () =>{
      return <Profile currentUser={currentUser}/>
    }
    const Course1 = () =>{
      return <Courses currentUser={currentUser}/>
    }
    const MainHome = () => {
      return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#FFF"}}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: color.primary,
            headerShown:false,
            tabBarStyle: {
              position: 'absolute',
              // height: Platform.OS === "android" ? 64 : 88,
              height: 64,
              paddingTop: 6,
              // paddingBottom: Platform.OS === "android" ? 8 : 32 ,
              paddingBottom: 4,
              // marginBottom: -10,
              borderWidth: 0,
              borderBottomWidth: 0,
              borderTopColor: "#ffffff",
              borderTopWidth: 0.1,
            },
            tabBarLabelStyle: {
              fontFamily: font.medium,
              fontSize: 12,
            },
            tabBarHideOnKeyboard:true
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home1}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="home-variant" color={focused? color.primary: "#999999"} size={34} />
              ),
              tabBarActiveTintColor: color.primary,
              // tabBarActiveBackgroundColor: color.primary,
            }}
          />
          <Tab.Screen
            name="Courses"
            component={Course1}
            options={{
              tabBarLabel: 'Courses',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="human-male-board" color={focused? color.primary: "#999999"} size={32} />
              ),
            }}
          />
          <Tab.Screen
            name="Assignments"
            component={Assignments}
            options={{
              tabBarLabel: 'Assignments',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="file-document-edit" color={focused? color.primary: "#999999"} size={32}/>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile1}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="account" color={focused? color.primary: "#999999"} size = {32} />
              ),
            }}
            />
        </Tab.Navigator>
        </SafeAreaView>
      )
    }
    
    const Notification = () =>{
      return(
        <View style={{flex: 1, backgroundColor: color.background,}}>
          <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1,marginTop: 16,marginBottom: 50,}}></View>
          </ScrollView>
          <StatusBar style="auto" translucent={false} />
          </SafeAreaView>
        </View>
      )
    }
    return(
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="MainHome" component={MainHome} options={{headerShown:false}}/>
          <Stack.Screen name="Notification" component={Notification} options={{headerTitle: 'Your Notifications', headerShadowVisible:false,
            headerTintColor: color.primary,
            headerStyle: { backgroundColor: color.background },
            headerTitleStyle: {fontFamily: font.semiBold,},
            headerBackTitleVisible: false,
            }}/>
        </Stack.Navigator>
        <StatusBar style="auto" translucent={false} />
      </NavigationContainer>
    // <View>
    //     <Text>User loggedIn</Text>
    // </View>
    )

      // <Home currentUser={currentUser}/>
    // }
    
  }
  else {
    return(
      <MainUGContainer/>
    )
}
}
// }
// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser
// })

// const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

// export default connect(mapStateToProps, mapDispatchProps)(Main)
// export default connect(null, mapDispatchProps)(Main)
export default Main