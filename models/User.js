'use strict'

// create class  to represent users of information
class User {
    constructor(firstName,lastName,username,password)
    {
        this.firstName =firstName;
        this.lastName =lastName;
        this.username =username;
        this.password =password;
    }
}
// create class  to represent infomation task of user
class todoTasks {
    constructor(task,owner,isDone){
        this.task=task;
        this.owner =owner;
        this.isDone = isDone;
    }
}