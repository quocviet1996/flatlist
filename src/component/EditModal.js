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
import Swipeout from 'react-native-swipeout';
import Modal from 'react-native-modalbox';
import {updateFood} from '../network/sever';



export default class EditModal extends Component {

    showEditModal=(mang)=>{
        
      // console.log(Mangedit)
        this.setState({
            id:mang._id,
            name:mang.name,
            foodDescription:mang.foodDescription,
            
        })
        this.refs.modal.open();
        
    }
    constructor(props)
    {
        
        super(props);
        this.state = {
            id:null,
            name:"",
            foodDescription:"",
            flatlist:null,
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
    
             <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',marginTop:40}}> Chỉnh Sửa</Text>
             <TextInput onChangeText={(value)=>this.setState({name:value})} style={{height:40,borderBottomColor:'gray',margin:20,borderBottomWidth:1}} placeholder={'Sửa tiêu đề' } value={this.state.name}></TextInput>
             <TextInput onChangeText={(value)=>this.setState({foodDescription:value})} style={{height:40,borderBottomColor:'gray',margin:20,borderBottomWidth:1}} placeholder={'Sửa  nội dung'} value={this.state.foodDescription}></TextInput>
             <Text
              onPress={()=>{
                 
                  // console.log(this.state.key + item.key)
                  // var foundIndex = mang.findIndex(item =>this.state.key ==  item.key
                  //   );
                 // console.log(this.state.key)
                 // console.log(foundIndex)
                  
                    //   mang[foundIndex].title = this.state.title;
                    //  mang[foundIndex].noidung = this.state.noidung;
                      //this.refs.modal.close();
                
                  //this.state.mang.push(object);
                 // this.refs.modal.close();
                  //this.setState({title:"",noidung:""});
                 // this.refs.flatlist.scrollToEnd();
                 let param = {
                   food_id: this.state.id,
                   name: this.state.name,
                  // foodDescription:this.state.foodDescription,
                 };
                 //console.log(this.state.id + "\n" + this.state.name + "\n" + this.state.foodDescription);
                 updateFood(param).then((result) => {
                   if (result == "Ok"){
                    this.refs.modal.close();

                    this.props.parent.onRefresh();

                   }

                 })

                                   
                  }
             }
              style={{textAlign:'center',height:30,fontSize:16,color:'white',backgroundColor:'blue',borderRadius:6,marginLeft:100,marginRight:100,marginBottom:20}}>
             SAVE</Text>
            
         
    
     
 
         </Modal>
    
    )
  }
}
