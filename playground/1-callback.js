// name = "gopal"

// const val = () => {
//       console.log(this.name)
// }


// val()

// const obj = {
//     name,
//     val : () => {
//         console.log(this.name)
//     },
//     header(){
//         console.log(this.name)
//     }
// }

// obj.header();

var Greeting = (function () {
    function Greeting() {
    }
    Greeting.prototype.greet = function () {
       console.log("Hello World!!!");
    };
     return Greeting;
 }());
 
 var obj = new Greeting();
 obj.greet()