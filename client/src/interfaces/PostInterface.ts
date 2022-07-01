export default interface PostInterface{
    content: "",
    author: {
        profilePicturePath:"",
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
            username:"",
            profilePicturePath:""
        },
        date:""
        likedBy:[]
    }]
}