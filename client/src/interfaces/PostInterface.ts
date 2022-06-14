export default interface PostInterface{
    content: "",
    author: {
        name: "",
        username: ""
    },
    date: "",
    _id: "",
    likedBy:[]
    replies:[{
        _id:"",
        content:"",
        author:{
            name:"",
            username:""
        },
        date:""
        likedBy:[]
    }]
}