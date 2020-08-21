import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import {Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/basedUrl';
import { postFavorite } from '../redux/ActionCreators';



  const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
function RenderDish(props){
    const dish=props.dish;

    if(dish != null)
    {
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri : baseUrl + dish.image }}
            >
                <Text
                    style={{margin: 10}}
                >
                    {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
            </Card>
        );
    }
    else{
        return(<View></View>)
        
    }
}

class Dishdetail extends Component{
    constructor(props){
    super(props);
    this.state={
    
        favorites: []

    }    
}
 markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
static navigationOptions = {
    title: 'Dish Details',
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        color: "#fff"            
    }
};
render(){
    const dishId = this.props.navigation.getParam('dishId','');
    return(
        <View>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
            />
            <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
        </View>
        )
}
}
    

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);