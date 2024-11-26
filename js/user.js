export class User{
    constructor(name = "", age = 18, url = ""){
        this.userName = name;
        this.userAge = age;
        this.userUrl = url;
    }

    addUserName(name){
        this.userName = name;
    }

    addUserAge(age){
        this.userAge = age;
    }

    addUserUrl(url){
        this.userUrl = url;
    }

    userName(){
        return this.userName;
    }

    userAge(){
        return this.userAge;
    }

    userUrl(){
        return this.userUrl;
    }
}