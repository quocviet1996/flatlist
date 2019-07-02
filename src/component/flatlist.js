import React, { Component } from 'react';
import {
    Text,
   FlatList,
   View,
   StyleSheet,
   Image,
   TouchableOpacity,
   TouchableHighlight,
   Alert,
   RefreshControl,
   ImageBackground
} from 'react-native';
//import mang from './flastlistData';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';
import {getData} from '../network/sever';
import {insertNewFood} from '../network/sever';
import {deleteFood} from '../network/sever';




//import flatListData from './flatListData';
//import { TextInput } from 'react-native-gesture-handler';
//import  Swipeout from 'react-native-swipeout';
//import Modal from 'react-native-modalbox';

// class FlatListItem  extends Component{
//     render(){
//     return(
//     // <View>
//     //     <Text> {this.props.item.key}
//     //     </Text>
//     //     </View>)
//     //      }
   
   

class FlatListItem extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            key:null,
            item:{},
        }
    }
    render(){
       // console.log(this.props.item.title)
       // console.log(this.props.parent.state.mang.title);
        const swipeSetting = {
            autoClose:true,
            onClose:(secId,rowId,direction)=>{
                
               this.setState({key:null})
            },
            onOpen:()=>{
               // console.log(this.props.state.mang.key);
               this.setState({key:this.props.item.key})
               //console.log(this.props.item.key)
               // console.log(  this.props.item.key);
              // console.log(this.props.parent.mang)


            },
            right:[
                {
                    onPress:()=>{   
                        Alert.alert(
                            "xóa món ăn",
                            "muốn delete ko",
                            [
                                {text:'No',},
                                {text:'Yes',onPress:()=>{
                                    // mang.splice(this.props.index,1);
                                    // this.props.parent.refresh(this.state.key);
                                  
                                //    this.props.parent.setState({
                                       //mang:this.props.parent.state.mang.filter((item)=>this.state.key !== item.key)
                                //    })
                                   //this.props.parent.mang.splice(this.props.index,1);
                                    
                                    //this.props.hamdelete(this.props.index)},
                                    const del = {
                                        food_id:this.props.item._id,
                                    }
                                    console.log(this.props.item._id);
                                    deleteFood(del).then((result) =>{
                                        if (result == "Ok"){
                                            this.props.parent.onRefresh();
                                  
                                        }
                                        

                                    })

                                }},
                            ],
                            {cancelable:true},

                        );
                        
                    },
                    text:"Delete",type:"delete"
                },
                {
                    onPress:()=>{

                       
                                //console.log(this.props.index),
                                //mang[this.props.index] = JSON.stringify(mang[this.props.index]),
                                //console.log(mang[this.props.index]),
                               //    this.props.parent.refs.editmodal.showEditModal(mang[this.props.index])
                                let selectedItem =  this.props.item;
                                this.props.parent.refs.editmodal.showEditModal(selectedItem);
                          
                          
                            
                    

                    },
                    text:"Edit",type:'primary'

                },
            ],
            //rowId:this.props.index,
            sectionId:1

        }
        return(
            <Swipeout {...swipeSetting}>
            <View  style={{flexDirection:'column'}}> 
            <View style={{flex:1 ,flexDirection:'row'}}>
            <Image source ={{uri: "http://192.168.1.4:3001" + this.props.item.imageUrl}}style={{width:100,height:70,margin:5}}>

            </Image>
         
            <View style={{flex:1,flexDirection:'column'}}>
            <Text> 
                    {this.props.item.name}
                </Text>
                <Text>
                    {this.props.item.foodDescription}
                </Text>
            </View>
              

            </View>
            <Text style={{height:1,backgroundColor:'black'}}></Text>
            </View>
            </Swipeout>
        )
    }
}
export default class flatlist extends Component {
    // componentDidMount(){
    //     getData().then((data)=>{
    //         this.setState({mang:data})
    //     }).catch((error)=>{
    //         console.log(error)
           

    //     });
    // }
    componentDidMount(){
        // const response = await  fetch("http://192.168.1.3.tutorialzine.com/misc/files/example.json");
        // const json = await response.json();
        // this.setState({ mang: json });
        // fetch("https://tutorialzine.com/misc/files/example.json")
        // .then((response) =>response.json())
        // .then((responseJson) => {
           
        //     this.setState({mang:responseJson});
        // })
        // console.log(this.state.mang)
       // .catch((error)=>{console.log(error)})
       this.setState({refresh:true});
       getData().then((data)=>{
           this.setState({mang:data});
           this.setState({refresh:false});
       }).catch((error)=>{
           console.log(error);
       })
      
    }
  
    onRefresh(){
        this.setState({refresh:true});
        getData().then((data)=>{
            this.setState({mang:data});
            this.setState({refresh:false});
        }).catch((error)=>{
            console.log(error);
            this.setState({refresh:false});
        })
    } 
    _onPress(){
        this.refs.addmodal.showAddModal();

    }
    refresh = (deleteKey)=>{
        this.setState({
            deleteKey:deleteKey,
        })
        this.refs.flatlist.scrollToEnd();

    }

    constructor(props)
    {
    
       // var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
        super(props);
        this.state = {
            deleteKey:null,
            title:"",
            noidung:"",
            mang : [],         
            refresh:false,
        }
    }
  
    render() {
        return(
            <View style ={{flex:1}}>
             <View style={{height:50,backgroundColor:'tomato'}}>
        <TouchableHighlight underlayColor='tomato' style={{alignItems:'flex-end'} } onPress={this._onPress.bind(this)}>
            <Image style ={{width:35,height:35}} source ={require('../img/drag.png')}></Image>
        </TouchableHighlight>

        </View>
          
            <FlatList
            ref = {'flatlist'}
            data = {this.state.mang}
            renderItem={({item,index})=>{
                return(
                    <FlatListItem parent ={this} item={item} index={index}>
                    
                    
                    </FlatListItem>
                )
            }}
            keyExtractor={(item) => item._id}
            refreshControl={

                <RefreshControl
                refreshing = {this.state.refresh}
                onRefresh={this.onRefresh.bind(this)}
                >
                </RefreshControl>
            }
            >
            </FlatList>
            <AddModal ref={'addmodal'} parent = {this}></AddModal>
            <EditModal ref={'editmodal'} parent = {this}></EditModal>
            </View>

        )

        
    }
 
}