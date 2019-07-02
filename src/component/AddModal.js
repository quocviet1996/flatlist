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
   TextInput
   
} from 'react-native';

import Modal from 'react-native-modalbox';
import {insertNewFood} from '../network/sever';

export default class AddModal extends Component {
    showAddModal=()=>{
        this.refs.modal.open();
    }
    constructor(props)
    {
        var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
        super(props);
        this.state = {
            key:RandomNumber,
            name:"",
            foodDescription:"",
        }
    }
  render() {
      
    return (
        <Modal 
        // transparent={true}
             position= 'center'
             backdrop={true}
             ref = {"modal"}
            
             //visible={this.state.isVisible}
             //isOpen={this.state.isVisible}
             style={{justifyContent:'center',height:250,backgroundColor:'white',borderRadius:30}}
            
     >
     
             <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',marginTop:40}}> nhà báo có tâm</Text>
             <TextInput onChangeText={(value)=>this.setState({name:value})} style={{height:40,borderBottomColor:'gray',margin:20,borderBottomWidth:1}} placeholder={'Nhập tiêu đề'}></TextInput>
             <TextInput onChangeText={(value)=>this.setState({foodDescription:value})} style={{height:40,borderBottomColor:'gray',margin:20,borderBottomWidth:1}} placeholder={'Nhập nội dung'}></TextInput>
             <Text
              onPress={()=>{
                  if (this.state.name == 0 || this.state.foodDescription == 0)
                  {
                      alert("trống");
                      return;
                  }
                  else{
                        const newFood= {                    
                          name:this.state.name,
                          foodDescription:this.state.foodDescription,

                      }
                      insertNewFood(newFood).then((result) =>{
                          if (result == 'Ok'){
                              this.props.parent.onRefresh();
                          }
                          
                      })
                      this.refs.modal.close();
                
                  //this.state.mang.push(object);
                 // this.refs.modal.close();
                  //this.setState({title:"",noidung:""});
                 // this.refs.flatlist.scrollToEnd();
                  }                   
                  }
             }
              style={{textAlign:'center',height:30,fontSize:16,color:'white',backgroundColor:'blue',borderRadius:6,marginLeft:100,marginRight:100,marginBottom:20}}>
             SAVE</Text>
            
         
    
     
 
         </Modal>
    
    )
  }
}
